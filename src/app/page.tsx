import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';

export default async function Home() {
  const allProducts = await prisma.product.findMany({
    include: { images: true },
    orderBy: { createdAt: 'desc' },
    take: 3
  });
  const featuredProducts = allProducts;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-400 via-blue-500 to-fuchsia-600 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?w=1600&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 drop-shadow-lg">
            Wear Your Colour.<br/>Made by Kilby's Dyes.
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl font-medium drop-shadow-md">
            Handmade, one-of-a-kind tie-dye clothing designed to make you stand out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop" className="px-8 py-4 bg-gradient-to-r from-sky-400 via-blue-500 to-fuchsia-500 text-white font-black text-lg rounded-full shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 transition-all hover:scale-105">
              Shop New Drops
            </Link>

            <Link href="/shop" className="px-8 py-4 bg-transparent underline-offset-4 hover:underline text-white font-bold rounded-full transition-all">
              Browse Patterns
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Drops / Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Featured Products</h2>
              <p className="text-gray-600">Fresh from the dye bath.</p>
            </div>
            <Link href="/shop" className="hidden md:inline-flex text-blue-600 font-bold hover:text-fuchsia-500 transition-colors">
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col bg-gray-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
                    <div className="absolute top-4 left-4 bg-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                      New Drop
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-900">{product.name}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-black text-2xl text-blue-600">${product.price.toFixed(2)}</span>
                    <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                      {product.type}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/shop" className="inline-flex text-blue-600 font-bold hover:text-fuchsia-500 transition-colors">
              View All Products &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Pattern */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-12 text-center">Shop by Pattern</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Spiral', 'Crumple', 'Bullseye', 'Ice Dye', 'Stripes', 'Pastel'].map(pattern => (
              <Link 
                key={pattern} 
                href={`/shop?pattern=${pattern}`}
                className="px-6 py-3 bg-white rounded-full font-bold shadow-sm border border-gray-100 hover:border-sky-300 hover:shadow-md hover:text-sky-500 transition-all"
              >
                {pattern}
              </Link>
            ))}
          </div>
        </div>
      </section>



      {/* About */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Handmade with Love.</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Every piece at Kilby's Dyes is uniquely crafted by hand. No two items are exactly alike, meaning the shirt or hoodie you receive is a one-of-a-kind piece of wearable art.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We use high-quality dyes and premium cotton garments to ensure your colours stay bright wash after wash.
          </p>
        </div>
      </section>
    </div>
  );
}
