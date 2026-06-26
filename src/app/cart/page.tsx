'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore(state => state.items);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeItem = useCartStore(state => state.removeItem);
  const getSubtotal = useCartStore(state => state.getSubtotal);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="container mx-auto px-4 py-12 min-h-[60vh] flex items-center justify-center">Loading cart...</div>;

  const subtotal = getSubtotal();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-[70vh]">
      <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3">
          {cartItems.length > 0 ? (
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={`${item.productId}-${item.size}`} className="flex gap-6 pb-6 border-b border-gray-200">
                  <Link href={`/product/${item.productId}`} className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-2xl overflow-hidden shrink-0 relative group">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                    )}
                  </Link>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <Link href={`/product/${item.productId}`} className="font-bold text-lg md:text-xl hover:text-pink-500 transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-gray-500 mt-1">Size: <span className="font-bold text-gray-900">{item.size}</span></p>
                      </div>
                      <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center border border-gray-200 rounded-full bg-white px-2">
                        <button 
                          onClick={() => {
                            if (item.quantity === 1) removeItem(item.productId, item.size);
                            else updateQuantity(item.productId, item.size, item.quantity - 1);
                          }}
                          className="w-8 h-8 flex items-center justify-center font-bold text-xl hover:text-pink-500"
                        >&minus;</button>
                        <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center font-bold text-xl hover:text-pink-500"
                        >+</button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.productId, item.size)}
                        className="text-sm font-bold text-gray-400 hover:text-red-500 underline decoration-2 underline-offset-4 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              </div>
              <h2 className="text-2xl font-black mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link href="/shop" className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black rounded-full hover:shadow-lg transition-all hover:scale-105">
                Start Shopping
              </Link>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-black mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-gray-600 border-b border-gray-200 pb-6 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-gray-900">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-lg">Estimated Total</span>
                <span className="font-black text-3xl text-purple-600">${subtotal.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className="w-full flex items-center justify-center py-4 bg-black text-white font-black text-lg rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl hover:scale-[1.02] transform">
                Proceed to Checkout
              </Link>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                Secure Checkout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
