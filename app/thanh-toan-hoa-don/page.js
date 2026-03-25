import { readExcel } from "@/lib/excel-db";
import PaymentClientPage from "./PaymentClientPage";

export default async function PaymentsPage() {
  const payments = await readExcel("thanh-toan-hoa-don");
  const projects = await readExcel("du-an");
  return <PaymentClientPage initialPayments={payments} projects={projects} />;
}
