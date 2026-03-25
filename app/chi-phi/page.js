import { readExcel } from "@/lib/excel-db";
import CostClientPage from "./CostClientPage";

export default async function CostsPage() {
  const costs = await readExcel("chi-phi");
  const projects = await readExcel("du-an");
  return <CostClientPage initialCosts={costs} projects={projects} />;
}
