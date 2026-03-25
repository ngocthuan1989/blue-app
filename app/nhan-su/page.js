import { readExcel } from "@/lib/excel-db";
import PersonnelClientPage from "./PersonnelClientPage";

export default async function PersonnelPage() {
  const personnel = await readExcel("nhan-su");
  return <PersonnelClientPage initialPersonnel={personnel} />;
}
