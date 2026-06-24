import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text mb-4 inline-block">
              KilbysDyes
            </Link>
            <p className="text-gray-600 max-w-sm">
              Handmade tie-dye clothing. Fun, colourful, one-of-a-kind pieces. Wear your colour with KilbysDyes.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/shop" className="hover:text-pink-500">Shop All</Link></li>
              <li><Link href="/new-drops" className="hover:text-pink-500">New Drops</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Customer Care</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/faq" className="hover:text-pink-500">FAQ</Link></li>
              <li><Link href="/care" className="hover:text-pink-500">Care Instructions</Link></li>
              <li><Link href="/contact" className="hover:text-pink-500">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} KilbysDyes. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
