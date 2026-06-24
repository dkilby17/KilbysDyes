'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-2xl">
        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-4xl font-black mb-4">Order Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your order from KilbysDyes. We've sent a confirmation email with your order details.
        </p>
        <p className="bg-purple-50 text-purple-800 p-4 rounded-xl mb-8 font-medium">
          Your order number is: #KILBY-{Math.floor(100000 + Math.random() * 900000)}
        </p>
        <Link href="/" className="inline-block px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-black tracking-tight mb-8">Secure Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleCheckout} className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="you@example.com" />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="marketing" className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500" />
                  <label htmlFor="marketing" className="ml-2 block text-sm text-gray-700">
                    Keep me updated on new drops and exclusive offers via email/SMS.
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
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apartment, suite, etc. (optional)</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Payment</h2>
              <p className="text-sm text-gray-500 mb-4">All transactions are secure and encrypted. (Simulated for now)</p>
              
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
                  <input type="radio" id="cc" name="payment" defaultChecked className="w-4 h-4 text-pink-600" />
                  <label htmlFor="cc" className="font-medium">Credit card</label>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <input type="text" placeholder="Card number" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Expiration date (MM / YY)" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                    <input type="text" placeholder="Security code" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                  </div>
                  <input type="text" placeholder="Name on card" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full py-4 bg-black text-white font-black text-lg rounded-full hover:bg-gray-800 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Processing...
                </>
              ) : 'Pay $128.50'}
            </button>
            <p className="text-xs text-center text-gray-500 mt-4">
              By placing your order, you agree to KilbysDyes's Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
        
        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0 relative">
                  <Image src="https://images.unsplash.com/photo-1574314227361-b75c88939c0d?w=100&q=80" alt="T-Shirt" fill className="object-cover" />
                  <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold z-10">1</span>
                </div>
                <div className="text-sm">
                  <p className="font-bold">Rainbow Spiral T-Shirt</p>
                  <p className="text-gray-500">M</p>
                  <p className="font-bold mt-1">$35.00</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg shrink-0 flex items-center justify-center relative">
                  <span className="text-xs font-bold text-pink-500">Custom</span>
                  <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold z-10">1</span>
                </div>
                <div className="text-sm flex-1">
                  <p className="font-bold line-clamp-1">Custom Tie-Dye Hoodie</p>
                  <p className="text-gray-500">L</p>
                  <p className="font-bold mt-1">$85.00</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm pt-4 border-t border-gray-200 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold">$120.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-bold">$8.50</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="font-bold text-lg">Total</span>
              <div className="text-right">
                <span className="text-xs text-gray-500 mr-1">USD</span>
                <span className="font-black text-2xl text-purple-600">$128.50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
