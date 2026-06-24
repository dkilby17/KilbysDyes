import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '@/data/products';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/shop" className="text-pink-500 font-bold hover:underline">
          &larr; Back to Shop
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Image Gallery */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
            {product.images[0]?.url ? (
              <Image 
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Available</div>
            )}
            {product.isNewDrop && (
              <div className="absolute top-4 left-4 bg-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md uppercase tracking-wide">
                New Drop
              </div>
            )}
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map(image => (
              <button key={image.id} className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden border-2 border-transparent hover:border-pink-500 transition-colors focus:outline-none focus:border-pink-500">
                <Image src={image.url} alt="Thumbnail" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">{product.name}</h1>
          <p className="text-3xl font-black text-purple-600 mb-6">${product.price.toFixed(2)}</p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Select Size</h3>
            <div className="flex flex-wrap gap-3 mb-2">
              {product.variants.map(variant => (
                <button 
                  key={variant.id}
                  disabled={variant.quantity === 0}
                  className={`
                    w-14 h-14 rounded-full font-bold flex items-center justify-center border-2 transition-all
                    ${variant.quantity > 0 
                      ? 'border-gray-200 hover:border-purple-500 hover:text-purple-600 bg-white' 
                      : 'border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed'}
                  `}
                >
                  {variant.size}
                </button>
              ))}
            </div>
            <Link href="/faq" className="text-sm text-purple-600 hover:underline">Size Guide</Link>
          </div>

          <div className="flex gap-4 mb-8">
            <div className="flex items-center border-2 border-gray-200 rounded-full bg-white px-2">
              <button className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:text-pink-500">&minus;</button>
              <span className="w-10 text-center font-bold">1</span>
              <button className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:text-pink-500">+</button>
            </div>
            
            <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all py-4">
              Add to Cart
            </button>
          </div>

          {/* Details Accordion (Simulated with simple lists for now) */}
          <div className="space-y-6 border-t border-gray-200 pt-8 mt-4">
            <div>
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                Design Details
              </h4>
              <ul className="text-gray-600 text-sm space-y-1 ml-7">
                <li><span className="font-medium">Pattern:</span> {product.patternName}</li>
                <li><span className="font-medium">Colors:</span> {product.colorsUsed}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                Important Disclaimers
              </h4>
              <ul className="text-gray-600 text-sm space-y-2 ml-7 list-disc pl-4">
                <li><strong>Handmade:</strong> Each item is uniquely crafted. Colors and patterns will vary slightly from the photos.</li>
                <li><strong>Shrinkage:</strong> Cotton garments may shrink slightly after washing. Please refer to care instructions.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                Care Instructions
              </h4>
              <p className="text-gray-600 text-sm ml-7">{product.careInstructions || 'Wash separately for the first wash. Wash cold. Turn garment inside out.'}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
