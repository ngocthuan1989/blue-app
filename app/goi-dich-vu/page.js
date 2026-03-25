import { readExcel } from "@/lib/excel-db";
import ServiceClientPage from "./ServiceClientPage";

export default async function ServicesPage() {
  const services = await readExcel("goi-dich-vu");
  return <ServiceClientPage initialServices={services} />;
}
