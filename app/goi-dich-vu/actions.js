"use server";

import { revalidatePath } from "next/cache";
import { createRow, updateRow, deleteRow } from "@/lib/excel-db";

export async function addService(formData) {
  const payload = Object.fromEntries(formData.entries());
  createRow("goi-dich-vu", payload);
  revalidatePath("/goi-dich-vu");
}

export async function editService(serviceId, formData) {
  const payload = Object.fromEntries(formData.entries());
  updateRow("goi-dich-vu", "service_id", serviceId, payload);
  revalidatePath("/goi-dich-vu");
}

export async function removeService(serviceId) {
  deleteRow("goi-dich-vu", "service_id", serviceId);
  revalidatePath("/goi-dich-vu");
}
