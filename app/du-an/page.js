import { readExcel } from "@/lib/excel-db";
import ProjectClientPage from "./ProjectClientPage";

export default async function ProjectsPage() {
  const projects = await readExcel("du-an");
  return <ProjectClientPage initialProjects={projects} />;
}
