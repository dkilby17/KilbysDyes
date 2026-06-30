'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import { createOrder } from './actions';

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [error, setError] = useState('');

  const cartItems = useCartStore(state => state.items);
  const getSubtotal = useCartStore(state => state.getSubtotal);
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (cartItems.length === 0 && !orderNumber) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-2xl">
        <h1 className="text-3xl font-black mb-4">Your cart is empty</h1>
        <Link href="/shop" className="inline-block px-8 py-4 bg-black text-white font-bold rounded-full">
          Return to Shop
        </Link>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const shippingCost = 8.50; // Flat rate for now
  const total = subtotal + shippingCost;

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      address: formData.get('address') as string,
      apartment: formData.get('apartment') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zip: formData.get('zip') as string,
      subtotal,
      shippingCost,
      total,
      items: cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        isCustom: item.isCustom,
        customDetails: item.customDetails
      }))
    };

    try {
      const result = await createOrder(data);
      if (result.success) {
        setOrderNumber(result.orderNumber);
        clearCart();
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderNumber) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-2xl min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-4xl font-black mb-4">Order Received!</h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Thank you for choosing Kilby's Dyes! Your order has been placed in our system. Since we are using manual payments for now, we will contact you at your email address to arrange payment and shipping!
        </p>
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 p-6 rounded-2xl mb-8 font-medium w-full max-w-sm mx-auto shadow-sm">
          <span className="block text-sm text-gray-500 uppercase tracking-widest mb-1">Order Number</span>
          <span className="text-2xl font-black text-gray-900">{orderNumber}</span>
        </div>
        <Link href="/" className="inline-block px-8 py-4 bg-black text-white font-black rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-8">Secure Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-8 border border-red-100 font-medium">
              {error}
            </div>
          )}
          <form onSubmit={handleCheckout} className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="you@example.com" />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="marketing" className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
                  <label htmlFor="marketing" className="ml-2 block text-sm text-gray-700">
                    Keep me updated on new drops and exclusive offers via email.
                  </label>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" name="firstName" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" name="lastName" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" name="address" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apartment, suite, etc. (optional)</label>
                  <input type="text" name="apartment" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" name="city" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                  <input type="text" name="state" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                  <input type="text" name="zip" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
              </div>
            </div>

            {/* Payment Info - Manual for MVP */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-bl-lg">No Card Needed</div>
              <h2 className="text-xl font-bold mb-2">Payment</h2>
              <p className="text-gray-600 mb-4">We are currently accepting manual payments (Venmo, CashApp, Zelle). We will email you with payment instructions once you submit your order!</p>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full py-5 bg-gradient-to-r from-sky-400 via-blue-500 to-fuchsia-500 text-white font-black text-xl rounded-full hover:shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-3 hover:scale-[1.01] transform shadow-md"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></span>
                  Placing Order...
                </>
              ) : `Complete Order • $${total.toFixed(2)}`}
            </button>
            <p className="text-xs text-center text-gray-500 mt-4">
              By placing your order, you agree to Kilby's Dyes's Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
        
        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 sticky top-24">
            <h2 className="text-lg font-black mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {cartItems.map(item => (
                <div key={`${item.productId}-${item.size}-${item.customDetails || ''}`} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden shrink-0 relative">
                    {item.imageUrl && <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />}
                    <span className="absolute -top-2 -right-2 bg-gray-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-10">{item.quantity}</span>
                  </div>
                  <div className="text-sm flex-1">
                    <p className="font-bold line-clamp-1">{item.name} {item.isCustom && <span className="text-[10px] bg-fuchsia-100 text-fuchsia-700 px-1 py-0.5 rounded ml-1">Custom</span>}</p>
                    <p className="text-gray-500">Size: {item.size}</p>
                    {item.customDetails && <p className="text-gray-500 text-xs mt-1 leading-snug">{item.customDetails}</p>}
                    <p className="font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm pt-4 border-t border-gray-200 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-bold">${shippingCost.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="font-black text-xl">Total</span>
              <div className="text-right">
                <span className="text-xs text-gray-500 mr-1">USD</span>
                <span className="font-black text-3xl text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
