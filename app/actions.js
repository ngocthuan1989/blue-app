"use server";

import { revalidatePath } from "next/cache";
import { createRow, updateRow, deleteRow, readExcel } from "@/lib/excel-db";

export async function addProject(formData) {
  const payload = Object.fromEntries(formData.entries());
  // Basic validation or ID generation could go here
  await createRow("du-an", payload);
  revalidatePath("/du-an");
  revalidatePath("/");
}

export async function editProject(projectId, formData) {
  const payload = Object.fromEntries(formData.entries());
  await updateRow("du-an", "project_id", projectId, payload);
  revalidatePath("/du-an");
  revalidatePath("/");
}

export async function removeProject(projectId) {
  await deleteRow("du-an", "project_id", projectId);
  revalidatePath("/du-an");
  revalidatePath("/");
}

export async function addMaterial(formData) {
  const payload = Object.fromEntries(formData.entries());
  await createRow("vat-tu-mua-hang", payload);
  revalidatePath("/vat-tu-mua-hang");
}

export async function editMaterial(itemId, formData) {
  const payload = Object.fromEntries(formData.entries());
  await updateRow("vat-tu-mua-hang", "item_id", itemId, payload);
  revalidatePath("/vat-tu-mua-hang");
}

export async function removeMaterial(itemId) {
  await deleteRow("vat-tu-mua-hang", "item_id", itemId);
  revalidatePath("/vat-tu-mua-hang");
}

export async function addPersonnel(formData) {
  const payload = Object.fromEntries(formData.entries());
  await createRow("nhan-su", payload);
  revalidatePath("/nhan-su");
}

export async function editPersonnel(userId, formData) {
  const payload = Object.fromEntries(formData.entries());
  await updateRow("nhan-su", "user_id", userId, payload);
  revalidatePath("/nhan-su");
}

export async function removePersonnel(userId) {
  await deleteRow("nhan-su", "user_id", userId);
  revalidatePath("/nhan-su");
}

export async function addPayment(formData) {
  const payload = Object.fromEntries(formData.entries());
  await createRow("thanh-toan-hoa-don", payload);
  revalidatePath("/thanh-toan-hoa-don");
  revalidatePath("/");
}

export async function editPayment(paymentId, formData) {
  const payload = Object.fromEntries(formData.entries());
  await updateRow("thanh-toan-hoa-don", "payment_id", paymentId, payload);
  revalidatePath("/thanh-toan-hoa-don");
  revalidatePath("/");
}

export async function removePayment(paymentId) {
  await deleteRow("thanh-toan-hoa-don", "payment_id", paymentId);
  revalidatePath("/thanh-toan-hoa-don");
  revalidatePath("/");
}

export async function addAcceptance(formData) {
  const payload = Object.fromEntries(formData.entries());
  await createRow("nghiem-thu-ban-giao", payload);
  revalidatePath("/nghiem-thu-ban-giao");
}

export async function editAcceptance(acceptanceId, formData) {
  const payload = Object.fromEntries(formData.entries());
  await updateRow("nghiem-thu-ban-giao", "acceptance_id", acceptanceId, payload);
  revalidatePath("/nghiem-thu-ban-giao");
}

export async function removeAcceptance(acceptanceId) {
  await deleteRow("nghiem-thu-ban-giao", "acceptance_id", acceptanceId);
  revalidatePath("/nghiem-thu-ban-giao");
}

export async function addNote(formData) {
  const payload = Object.fromEntries(formData.entries());
  await createRow("ghi-chu-dieu-hanh", payload);
  revalidatePath("/ghi-chu-dieu-hanh");
  revalidatePath("/");
}

export async function editNote(noteId, formData) {
  const payload = Object.fromEntries(formData.entries());
  await updateRow("ghi-chu-dieu-hanh", "note_id", noteId, payload);
  revalidatePath("/ghi-chu-dieu-hanh");
  revalidatePath("/");
}

export async function removeNote(noteId) {
  await deleteRow("ghi-chu-dieu-hanh", "note_id", noteId);
  revalidatePath("/ghi-chu-dieu-hanh");
  revalidatePath("/");
}

export async function addClient(formData) {
  const payload = Object.fromEntries(formData.entries());
  await createRow("khach-hang", payload);
  revalidatePath("/khach-hang");
}

export async function editClient(clientId, formData) {
  const payload = Object.fromEntries(formData.entries());
  await updateRow("khach-hang", "client_id", clientId, payload);
  revalidatePath("/khach-hang");
}

export async function removeClient(clientId) {
  await deleteRow("khach-hang", "client_id", clientId);
  revalidatePath("/khach-hang");
}

export async function addSpace(formData) {
  const payload = Object.fromEntries(formData.entries());
  await createRow("hang-muc-khong-gian", payload);
  revalidatePath("/hang-muc-khong-gian");
}

export async function editSpace(roomId, formData) {
  const payload = Object.fromEntries(formData.entries());
  await updateRow("hang-muc-khong-gian", "room_id", roomId, payload);
  revalidatePath("/hang-muc-khong-gian");
}

export async function removeSpace(roomId) {
  await deleteRow("hang-muc-khong-gian", "room_id", roomId);
  revalidatePath("/hang-muc-khong-gian");
}

export async function addStage(formData) {
  const payload = Object.fromEntries(formData.entries());
  await createRow("tien-do-giai-doan", payload);
  revalidatePath("/tien-do-giai-doan");
}

export async function editStage(stageId, formData) {
  const payload = Object.fromEntries(formData.entries());
  await updateRow("tien-do-giai-doan", "stage_id", stageId, payload);
  revalidatePath("/tien-do-giai-doan");
}

export async function removeStage(stageId) {
  await deleteRow("tien-do-giai-doan", "stage_id", stageId);
  revalidatePath("/tien-do-giai-doan");
}

export async function addTask(formData) {
  const payload = Object.fromEntries(formData.entries());
  await createRow("cong-viec", payload);
  revalidatePath("/cong-viec");
}

export async function editTask(taskId, formData) {
  const payload = Object.fromEntries(formData.entries());
  await updateRow("cong-viec", "task_id", taskId, payload);
  revalidatePath("/cong-viec");
}

export async function removeTask(taskId) {
  await deleteRow("cong-viec", "task_id", taskId);
  revalidatePath("/cong-viec");
}

export async function addCost(formData) {
  const payload = Object.fromEntries(formData.entries());
  await createRow("chi-phi", payload);
  revalidatePath("/chi-phi");
}

export async function editCost(costId, formData) {
  const payload = Object.fromEntries(formData.entries());
  await updateRow("chi-phi", "cost_id", costId, payload);
  revalidatePath("/chi-phi");
}

export async function removeCost(costId) {
  await deleteRow("chi-phi", "cost_id", costId);
  revalidatePath("/chi-phi");
}
