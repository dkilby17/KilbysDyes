import prisma from '@/lib/prisma';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

async function updateOrderStatus(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const status = formData.get('status') as string;
  
  if (id && status) {
    await prisma.order.update({
      where: { id },
      data: { status }
    });
    revalidatePath('/admin/orders');
  }
}

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black">Manage Orders</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No orders have been placed yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {orders.map(order => (
              <div key={order.id} className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-xl font-black">{order.orderNumber}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'Paid' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-6">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Customer</h3>
                      <p>{order.firstName} {order.lastName}</p>
                      <p className="text-pink-600 font-medium"><a href={`mailto:${order.email}`}>{order.email}</a></p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Shipping Address</h3>
                      <p>{order.address} {order.apartment}</p>
                      <p>{order.city}, {order.state} {order.zip}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <h3 className="font-bold mb-3 text-sm">Order Items</h3>
                    <div className="space-y-3">
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <div className="flex flex-col">
                            <div>
                              <span className="font-medium">{item.quantity}x</span> {item.name} <span className="text-gray-500">(Size: {item.size})</span>
                              {item.isCustom && <span className="text-[10px] bg-fuchsia-100 text-fuchsia-700 px-2 py-0.5 rounded ml-2 align-middle">Custom Design</span>}
                            </div>
                            {item.customDetails && <div className="text-xs text-gray-500 mt-1 leading-relaxed max-w-sm">{item.customDetails}</div>}
                          </div>
                          <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between font-bold text-base">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-48 shrink-0">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm">Update Status</h3>
                  <form action={updateOrderStatus} className="flex flex-col gap-2">
                    <input type="hidden" name="id" value={order.id} />
                    <select name="status" defaultValue={order.status} className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-gray-50">
                      <option value="Pending">Pending (Unpaid)</option>
                      <option value="Paid">Paid</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button type="submit" className="w-full py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                      Save Status
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 mt-4">
                    Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
