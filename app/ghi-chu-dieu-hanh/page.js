import { readExcel } from "@/lib/excel-db";
import NoteClientPage from "./NoteClientPage";

export default async function NotesPage() {
  const notes = await readExcel("ghi-chu-dieu-hanh");
  const projects = await readExcel("du-an");
  const personnel = await readExcel("nhan-su");
  return <NoteClientPage initialNotes={notes} projects={projects} personnel={personnel} />;
}
