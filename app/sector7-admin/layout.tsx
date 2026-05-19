// app/sector7-admin/layout.tsx
import Sidebar from "@/app/components/sidebar"; 

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex bg-[#0f0f0f] min-h-screen text-gray-200">
      {/* Sidebar tetap fixed */}
      <Sidebar />
      
      {/* pl-64: Memberi ruang di kiri selebar sidebar
        pt-10: Memberi ruang di atas agar tidak tumpuk
        p-8: Memberi napas di sekeliling konten 
      */}
      <main className="flex-1 pl-74 pt-23 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}