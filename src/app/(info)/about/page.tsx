import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-8">About KilbysDyes</h1>
      
      <div className="prose prose-lg prose-pink max-w-none">
        <p className="text-xl leading-relaxed text-gray-700 font-medium mb-8">
          Welcome to KilbysDyes! We create fun, colourful, one-of-a-kind handmade tie-dye clothing designed to make you stand out and feel great.
        </p>
        
        <h2 className="text-2xl font-bold mt-12 mb-4">Our Story</h2>
        <p className="mb-6">
          KilbysDyes started as a passion project in a small backyard. What began with a few buckets of dye and a love for vibrant colours quickly grew into a full-fledged small business. We realized that in a world of fast fashion, people crave clothing that is unique, expressive, and made with care.
        </p>
        
        <h2 className="text-2xl font-bold mt-12 mb-4">Handmade Quality</h2>
        <p className="mb-6">
          Every single shirt, hoodie, and accessory at KilbysDyes is uniquely crafted by hand. We use high-quality, professional-grade dyes that won't fade after the first wash, and premium cotton garments that are incredibly soft and comfortable.
        </p>
        <p className="mb-6">
          Because each item is handmade, no two pieces are exactly alike. When you wear KilbysDyes, you're wearing a one-of-a-kind piece of wearable art.
        </p>
        
        <h2 className="text-2xl font-bold mt-12 mb-4">Custom Creations</h2>
        <p className="mb-6">
          We love bringing your vision to life! Our <Link href="/customize" className="text-pink-500 font-bold hover:underline">custom order tool</Link> allows you to choose your favorite colors and patterns, and we'll create a custom piece just for you.
        </p>
        
        <div className="bg-pink-50 rounded-3xl p-8 mt-12 text-center border border-pink-100">
          <h3 className="text-2xl font-black text-pink-600 mb-4">Wear Your Colour.</h3>
          <p className="mb-6 text-pink-900">Thank you for supporting our small business and choosing to live life vividly.</p>
          <Link href="/shop" className="inline-block px-8 py-3 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition-colors">
            Shop the Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
