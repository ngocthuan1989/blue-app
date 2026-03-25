import { readExcel } from "@/lib/excel-db";
import SpaceClientPage from "./SpaceClientPage";

export default async function SpacesPage() {
  const spaces = await readExcel("hang-muc-khong-gian");
  const projects = await readExcel("du-an");
  return <SpaceClientPage initialSpaces={spaces} projects={projects} />;
}
