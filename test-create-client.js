const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
require('dotenv').config({ path: '.env.local' });

async function testCreateClient() {
  const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
  const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  const serviceAccountAuth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['khach-hang'];
    if (!sheet) {
      console.error('❌ Không tìm thấy sheet "khach-hang"');
      return;
    }

    // Lấy tiêu đề cột hiện có
    await sheet.loadHeaderRow();
    console.log('Tiêu đề hiện tại:', sheet.headerValues);

    const testPayload = {
      client_id: 'TEST_' + Date.now(),
      ten_khach_hang: 'Khách hàng Thử nghiệm',
      so_dien_thoai: '0900000000',
      email: 'test@example.com',
      dia_chi: 'Địa chỉ thử nghiệm'
    };

    console.log('Đang thử thêm hàng:', testPayload);
    await sheet.addRow(testPayload);
    console.log('✅ Thêm thành công!');
  } catch (e) {
    console.error('❌ Lỗi chi tiết:', e.message);
    if (e.response && e.response.data) {
        console.error('Data từ API:', JSON.stringify(e.response.data, null, 2));
    }
  }
}

testCreateClient();
