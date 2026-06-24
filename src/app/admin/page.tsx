import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const productCount = await prisma.product.count();

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-bold mb-2">Total Products</h3>
          <p className="text-4xl font-black text-purple-600">{productCount}</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-bold mb-2">Pending Orders</h3>
          <p className="text-4xl font-black text-pink-500">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-bold mb-2">Total Revenue</h3>
          <p className="text-4xl font-black text-green-500">$0.00</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link href="/admin/products" className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors">
            Manage Products
          </Link>
        </div>
      </div>
    </div>
  );
}
