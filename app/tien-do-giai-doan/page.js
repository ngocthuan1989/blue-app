import { readExcel } from "@/lib/excel-db";
import StageClientPage from "./StageClientPage";

export default async function StagesPage() {
  const stages = await readExcel("tien-do-giai-doan");
  const projects = await readExcel("du-an");
  const personnel = await readExcel("nhan-su");
  return <StageClientPage initialStages={stages} projects={projects} personnel={personnel} />;
}
