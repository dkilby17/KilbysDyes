import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="relative w-80 h-28 inline-block mb-4">
              <Image src="/logo.png" alt="Kilby's Dyes Logo" fill className="object-contain object-left" />
            </Link>
            <p className="text-gray-600 max-w-sm">
              Handmade tie-dye clothing. Fun, colourful, one-of-a-kind pieces. Wear your colour with Kilby's Dyes.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/shop" className="hover:text-sky-500 transition-colors">Shop All</Link></li>
              <li><Link href="/new-drops" className="hover:text-sky-500 transition-colors">New Drops</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Customer Care</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/faq" className="hover:text-fuchsia-500 transition-colors">FAQ</Link></li>
              <li><Link href="/care" className="hover:text-fuchsia-500 transition-colors">Care Instructions</Link></li>
              <li><Link href="/contact" className="hover:text-fuchsia-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Kilby's Dyes. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
