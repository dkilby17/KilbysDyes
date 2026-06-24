import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-gray-900 text-white p-6 shrink-0">
        <div className="mb-10">
          <Link href="/" className="text-2xl font-black tracking-tight text-white hover:text-pink-400">
            KilbysDyes
          </Link>
          <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Admin Panel</div>
        </div>
        
        <nav className="space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/products" className="block px-4 py-2 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            Products
          </Link>
          <Link href="/admin/orders" className="block px-4 py-2 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            Orders (Coming Soon)
          </Link>
        </nav>
      </aside>
      
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
