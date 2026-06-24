import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const patternFilter = typeof params.pattern === 'string' ? params.pattern : undefined;
  const typeFilter = typeof params.type === 'string' ? params.type : undefined;
  const sort = typeof params.sort === 'string' ? params.sort : 'newest';
  
  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'price_asc') {
    orderBy = { price: 'asc' };
  } else if (sort === 'price_desc') {
    orderBy = { price: 'desc' };
  }

  const products = await prisma.product.findMany({
    where: {
      ...(patternFilter ? { patternName: patternFilter } : {}),
      ...(typeFilter ? { type: typeFilter } : {}),
      status: 'Active'
    },
    include: { images: true },
    orderBy
  });

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0">
        <h2 className="text-xl font-bold mb-6">Filters</h2>
        
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Product Type</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/shop" className={`hover:text-pink-500 ${!typeFilter ? 'font-bold text-pink-500' : ''}`}>
                All
              </Link>
            </li>
            <li>
              <Link href="/shop?type=T-Shirt" className={`hover:text-pink-500 ${typeFilter === 'T-Shirt' ? 'font-bold text-pink-500' : ''}`}>
                T-Shirts
              </Link>
            </li>
            <li>
              <Link href="/shop?type=Hoodie" className={`hover:text-pink-500 ${typeFilter === 'Hoodie' ? 'font-bold text-pink-500' : ''}`}>
                Hoodies
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Pattern</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {['Spiral', 'Crumple', 'Bullseye', 'Ice Dye'].map(p => (
              <li key={p}>
                <Link 
                  href={`/shop?pattern=${p}${typeFilter ? `&type=${typeFilter}` : ''}`} 
                  className={`hover:text-pink-500 ${patternFilter === p ? 'font-bold text-pink-500' : ''}`}
                >
                  {p}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="?sort=newest" className={`hover:text-pink-500 ${sort === 'newest' ? 'font-bold text-pink-500' : ''}`}>Newest</Link>
            <Link href="?sort=price_asc" className={`hover:text-pink-500 ${sort === 'price_asc' ? 'font-bold text-pink-500' : ''}`}>Price: Low to High</Link>
            <Link href="?sort=price_desc" className={`hover:text-pink-500 ${sort === 'price_desc' ? 'font-bold text-pink-500' : ''}`}>Price: High to Low</Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black tracking-tight">Shop All</h1>
          <span className="text-gray-500 text-sm font-medium">{products.length} products</span>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center text-gray-500 bg-gray-50 rounded-2xl">
            <p className="text-lg">No products found matching your filters.</p>
            <Link href="/shop" className="text-pink-500 font-bold hover:underline mt-4 inline-block">Clear Filters</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col bg-gray-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-gray-200">
                  {product.images[0]?.url ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  {product.isNewDrop && (
                    <div className="absolute top-4 left-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                      New Drop
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-900">{product.name}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-black text-2xl text-purple-600">${product.price.toFixed(2)}</span>
                    <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                      {product.type}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
