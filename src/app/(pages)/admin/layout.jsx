import AdminSidebar from "@/components/admin/sidebar";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CINEMAX Admin Panel",
  description: "Admin panel for CINEMAX cinema website",
};

export default function AdminLayout({ children }) {
  return (
    <div className={`min-h-screen bg-black ${inter.className}`}>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto md:p-4 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
