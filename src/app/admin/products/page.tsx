import prisma from '@/lib/prisma';
import { deleteProduct, createProduct } from '../actions';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black">Manage Products</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-bold text-gray-600">Name</th>
                  <th className="p-4 font-bold text-gray-600">Type</th>
                  <th className="p-4 font-bold text-gray-600">Price</th>
                  <th className="p-4 font-bold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">No products found.</td>
                  </tr>
                )}
                {products.map(product => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4 text-gray-500">{product.type}</td>
                    <td className="p-4 font-bold">${product.price.toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <button type="submit" className="text-red-500 font-bold hover:underline">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Product Form */}
        <div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form action={createProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                <input type="text" name="name" required className="w-full p-2 border border-gray-200 rounded-lg" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                  <select name="type" className="w-full p-2 border border-gray-200 rounded-lg">
                    <option value="T-Shirt">T-Shirt</option>
                    <option value="Hoodie">Hoodie</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Price ($)</label>
                  <input type="number" name="price" step="0.01" required className="w-full p-2 border border-gray-200 rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea name="description" rows={3} required className="w-full p-2 border border-gray-200 rounded-lg"></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Pattern Name</label>
                <input type="text" name="patternName" required className="w-full p-2 border border-gray-200 rounded-lg" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Color Family</label>
                  <input type="text" name="colorFamily" required className="w-full p-2 border border-gray-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Colors Used</label>
                  <input type="text" name="colorsUsed" required className="w-full p-2 border border-gray-200 rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Available Sizes</label>
                <div className="flex gap-4">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <label key={size} className="flex items-center gap-2">
                      <input type="checkbox" name="sizes" value={size} defaultChecked={['S', 'M', 'L'].includes(size)} className="w-4 h-4" />
                      <span className="text-sm font-bold">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Front Image</label>
                  <input type="file" name="imageFront" accept="image/*" required className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Back/Alt Image</label>
                  <input type="file" name="imageBack" accept="image/*" required className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-sm" />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" name="isNewDrop" id="isNewDrop" value="true" className="w-4 h-4" />
                <label htmlFor="isNewDrop" className="text-sm font-bold text-gray-700">Mark as New Drop</label>
              </div>

              <button type="submit" className="w-full py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 transition-colors mt-6">
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
