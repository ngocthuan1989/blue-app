import { readExcel } from "@/lib/excel-db";
import MaterialClientPage from "./MaterialClientPage";

export default async function MaterialsPage() {
  const items = await readExcel("vat-tu-mua-hang");
  const projects = await readExcel("du-an");
  return <MaterialClientPage initialItems={items} projects={projects} />;
}
