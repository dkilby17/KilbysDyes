'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-32 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="shrink-0 relative w-96 h-28">
            <Image src="/logo.png" alt="Kilby's Dyes Logo" fill className="object-contain" priority />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
            <Link href="/shop" className="hover:text-sky-500 transition-colors">Shop</Link>
            <Link href="/custom" className="hover:text-blue-500 transition-colors">Design Your Own</Link>
            <Link href="/new-drops" className="hover:text-fuchsia-500 transition-colors">New Drops</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            {mounted && totalItems > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-sky-500 text-[10px] font-bold text-white flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-700 hover:text-sky-500 transition-colors">
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white absolute w-full left-0 shadow-lg pb-4 pt-2">
          <nav className="flex flex-col container mx-auto px-4 gap-4 text-lg font-bold">
            <Link 
              href="/shop" 
              onClick={() => setIsMenuOpen(false)}
              className="py-2 hover:text-sky-500 transition-colors border-b border-gray-100"
            >
              Shop
            </Link>
            <Link 
              href="/custom" 
              onClick={() => setIsMenuOpen(false)}
              className="py-2 hover:text-blue-500 transition-colors border-b border-gray-100"
            >
              Design Your Own
            </Link>
            <Link 
              href="/new-drops" 
              onClick={() => setIsMenuOpen(false)}
              className="py-2 hover:text-fuchsia-500 transition-colors border-b border-gray-100"
            >
              New Drops
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
