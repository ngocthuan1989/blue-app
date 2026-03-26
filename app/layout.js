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
      <body className="flex h-screen overflow-hidden">
        <Toaster position="top-right" richColors />
        <CommandPalette projects={projects} />
        <Sidebar projects={projects} />
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden">
          <div className="flex-1 overflow-auto p-4 md:p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
