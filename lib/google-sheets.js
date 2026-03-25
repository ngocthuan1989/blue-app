import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

const serviceAccountAuth = new JWT({
  email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function getDoc() {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  return doc;
}

export async function readExcel(sheetName) {
  try {
    console.log(`[GoogleSheets] Reading sheet: ${sheetName}`);
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle[sheetName];
    if (!sheet) return [];
    const rows = await sheet.getRows();
    const data = rows.map(row => row.toObject());
    console.log(`[GoogleSheets] Read ${data.length} rows from ${sheetName}`);
    return data;
  } catch (error) {
    console.error(`[GoogleSheets] Error reading sheet ${sheetName}:`, error);
    return [];
  }
}

export async function getAllData() {
  try {
    console.log(`[GoogleSheets] Getting all data...`);
    const doc = await getDoc();
    const result = {};
    const sheetTitles = doc.sheetsByIndex.map(s => s.title);
    for (const sheetName of sheetTitles) {
        const sheet = doc.sheetsByTitle[sheetName];
        const rows = await sheet.getRows();
        result[sheetName] = rows.map(row => row.toObject());
    }
    console.log(`[GoogleSheets] Loaded all data from ${sheetTitles.length} sheets`);
    return result;
  } catch (error) {
    console.error("[GoogleSheets] Error reading all sheets:", error);
    return {};
  }
}

export async function updateRow(sheetName, rowKey, rowValue, payload) {
  try {
    console.log(`[GoogleSheets] Updating row in ${sheetName} where ${rowKey}=${rowValue}`, payload);
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle[sheetName];
    if (!sheet) return false;
    const rows = await sheet.getRows();
    const row = rows.find(r => String(r.toObject()[rowKey]) === String(rowValue));
    if (row) {
      Object.assign(row, payload);
      await row.save();
      console.log(`[GoogleSheets] Row updated successfully in ${sheetName}`);
      return true;
    }
    console.warn(`[GoogleSheets] Row not found in ${sheetName} for ${rowKey}=${rowValue}`);
    return false;
  } catch (error) {
    console.error(`[GoogleSheets] Error updating row in ${sheetName}:`, error);
    return false;
  }
}

export async function deleteRow(sheetName, rowKey, rowValue) {
  try {
    console.log(`[GoogleSheets] Deleting row in ${sheetName} where ${rowKey}=${rowValue}`);
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle[sheetName];
    if (!sheet) return;
    const rows = await sheet.getRows();
    const row = rows.find(r => String(r.toObject()[rowKey]) === String(rowValue));
    if (row) {
      await row.delete();
      console.log(`[GoogleSheets] Row deleted successfully in ${sheetName}`);
    } else {
      console.warn(`[GoogleSheets] Row not found for deletion in ${sheetName}`);
    }
  } catch (error) {
    console.error(`[GoogleSheets] Error deleting row in ${sheetName}:`, error);
  }
}

export async function createRow(sheetName, payload) {
  try {
    console.log(`[GoogleSheets] Creating row in ${sheetName}`, payload);
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle[sheetName];
    if (!sheet) {
        console.error(`[GoogleSheets] Sheet ${sheetName} not found`);
        return;
    }
    await sheet.addRow(payload);
    console.log(`[GoogleSheets] Row created successfully in ${sheetName}`);
  } catch (error) {
    console.error(`[GoogleSheets] Error creating row in ${sheetName}:`, error);
  }
}

export async function getProjectDetail(projectId) {
  console.log(`[GoogleSheets] Getting detail for project: ${projectId}`);
  const data = await getAllData();
  const project = data["du-an"]?.find(p => String(p.project_id) === String(projectId));
  if (!project) return null;

  return {
    project,
    spaces: data["hang-muc-khong-gian"]?.filter(s => String(s.project_id) === String(projectId)) || [],
    stages: data["tien-do-giai-doan"]?.filter(s => String(s.project_id) === String(projectId)) || [],
    tasks: data["cong-viec"]?.filter(t => String(t.project_id) === String(projectId)) || [],
    materials: data["vat-tu-mua-hang"]?.filter(m => String(m.project_id) === String(projectId)) || [],
    payments: data["thanh-toan-hoa-don"]?.filter(p => String(p.project_id) === String(projectId)) || [],
    notes: data["ghi-chu-dieu-hanh"]?.filter(n => String(n.project_id) === String(projectId)) || [],
    costs: data["chi-phi"]?.filter(c => String(c.project_id) === String(projectId)) || [],
  };
}
