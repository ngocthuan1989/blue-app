import { readExcel } from "@/lib/excel-db";
import TaskClientPage from "./TaskClientPage";

export default async function TasksPage() {
  const tasks = await readExcel("cong-viec");
  const projects = await readExcel("du-an");
  const personnel = await readExcel("nhan-su");
  return <TaskClientPage initialTasks={tasks} projects={projects} personnel={personnel} />;
}
