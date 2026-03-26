import Sidebar from "@/components/Sidebar";
import CommandPalette from "@/components/CommandPalette";
import { Toaster } from "sonner";
import { readExcel } from "@/lib/excel-db";
import "./globals.css";

export const metadata = {
  title: "Progress Management Blue",
  description: "Enterprise Progress Management System",
};

export default async function RootLayout({ children }) {
  const projects = await readExcel("du-an");

  return (
    <html lang="vi">
      <body className="flex h-screen overflow-hidden w-full max-w-none bg-slate-50">
        <Toaster position="top-right" richColors />
        <CommandPalette projects={projects} />
        <Sidebar projects={projects} />
        <main className="flex-1 flex flex-col min-w-0 w-full overflow-hidden bg-slate-50">
          <div className="flex-1 overflow-auto p-4 md:p-10 w-full max-w-none">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
