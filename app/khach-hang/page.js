import { readExcel } from "@/lib/excel-db";
import ClientClientPage from "./ClientClientPage";

export default async function ClientsPage() {
  const clients = await readExcel("khach-hang");
  return <ClientClientPage initialClients={clients} />;
}
