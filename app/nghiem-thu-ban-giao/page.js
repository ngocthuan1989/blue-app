import { readExcel } from "@/lib/excel-db";
import AcceptanceClientPage from "./AcceptanceClientPage";

export default async function AcceptancePage() {
  const acceptances = await readExcel("nghiem-thu-ban-giao");
  const projects = await readExcel("du-an");
  return <AcceptanceClientPage initialAcceptances={acceptances} projects={projects} />;
}
