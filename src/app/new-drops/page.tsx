import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';

export default async function NewDropsPage() {
  const newDrops = await prisma.product.findMany({
    where: { isNewDrop: true, status: 'Active' },
    include: { images: true, variants: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-24">
      {/* Hero Banner */}
      <div className="relative pt-24 pb-32 overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 via-blue-700 to-sky-900 opacity-90 z-0"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob z-0"></div>
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 z-0"></div>
        <div className="absolute -bottom-32 left-1/2 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000 z-0"></div>

        <div className="relative z-10 px-4">
          <span className="inline-block py-1 px-3 rounded-full bg-black/30 border border-white/20 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            Limited Edition Release
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-fuchsia-200">
            The Midnight Collection
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-2xl mx-auto mb-10 font-medium">
            Dark base colors with vibrant bursts. Extremely limited quantities. Once they're gone, they're gone.
          </p>
          
          {/* Simulated Countdown */}
          <div className="flex justify-center gap-4 text-center">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[80px]">
              <div className="text-3xl font-black font-mono">00</div>
              <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Days</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[80px]">
              <div className="text-3xl font-black font-mono">14</div>
              <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Hours</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[80px]">
              <div className="text-3xl font-black font-mono">42</div>
              <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Mins</div>
            </div>
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[80px]">
              <div className="text-3xl font-black font-mono text-sky-400">09</div>
              <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Secs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Drops Grid */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newDrops.map(product => {
            const totalInventory = product.variants.reduce((acc, v) => acc + v.quantity, 0);
            const isSoldOut = totalInventory === 0;

            return (
              <div key={product.id} className="bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl group flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-gray-900">
                  {product.images[0]?.url ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      className={`object-cover transition-transform duration-700 ${isSoldOut ? 'grayscale opacity-50' : 'group-hover:scale-105'}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                  )}
                  
                  {isSoldOut ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                      <span className="text-white text-3xl font-black uppercase tracking-widest border-4 border-white px-6 py-2 rounded-xl transform -rotate-12">
                        Sold Out
                      </span>
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                      Only {totalInventory} left
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-bold text-2xl mb-2 text-white">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">{product.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-black text-3xl text-sky-400">${product.price.toFixed(2)}</span>
                      <span className="text-sm font-bold text-gray-300 bg-gray-700 px-4 py-2 rounded-full">
                        {product.type}
                      </span>
                    </div>
                    
                    {isSoldOut ? (
                      <button disabled className="w-full py-4 rounded-full bg-gray-700 text-gray-400 font-bold cursor-not-allowed">
                        Out of Stock
                      </button>
                    ) : (
                      <Link href={`/product/${product.id}`} className="block w-full text-center py-4 rounded-full bg-white text-black font-black hover:bg-sky-500 hover:text-white transition-colors">
                        View Product
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Email Signup */}
      <div className="container mx-auto px-4 mt-32 max-w-4xl">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-10 md:p-16 border border-gray-700 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-600 rounded-full mix-blend-screen filter blur-3xl opacity-30"></div>
          
          <h2 className="text-3xl md:text-4xl font-black mb-4 relative z-10">Don't miss the next drop.</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto relative z-10">
            Join the Kilby's Dyes VIP list to get early access to limited edition drops before they sell out. We promise not to spam.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-6 py-4 rounded-full bg-gray-950 border border-gray-700 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              required
            />
            <button type="button" className="px-8 py-4 rounded-full bg-fuchsia-600 text-white font-bold hover:bg-fuchsia-500 transition-colors whitespace-nowrap">
              Get Early Access
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
