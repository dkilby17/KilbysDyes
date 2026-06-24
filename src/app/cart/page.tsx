import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  // Simulated cart items
  const cartItems = [
    {
      id: '1',
      name: 'Rainbow Spiral T-Shirt',
      size: 'M',
      price: 35.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1574314227361-b75c88939c0d?w=200&q=80',
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 8.50;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3">
          {cartItems.length > 0 ? (
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-3xl bg-white shadow-sm">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-2xl overflow-hidden relative shrink-0">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-xs text-gray-500 bg-gradient-to-br from-pink-100 to-purple-100 p-2 text-center">
                        <span className="font-bold text-pink-600 mb-1">Custom Design</span>
                        Preview unavailable
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <span className="font-black">${item.price.toFixed(2)}</span>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-2">Size: {item.size}</p>
                    
                    {item.isCustom && (
                      <p className="text-xs text-purple-600 bg-purple-50 p-2 rounded-lg mb-2 line-clamp-2">
                        {item.customDetails}
                      </p>
                    )}
                    
                    <div className="mt-auto flex justify-between items-end">
                      <div className="flex items-center border border-gray-200 rounded-full px-2">
                        <button className="w-8 h-8 flex items-center justify-center font-bold hover:text-pink-500">&minus;</button>
                        <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                        <button className="w-8 h-8 flex items-center justify-center font-bold hover:text-pink-500">+</button>
                      </div>
                      <button className="text-sm font-bold text-gray-400 hover:text-red-500 underline">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
              <p className="text-gray-500 mb-4">Your cart is empty.</p>
              <Link href="/shop" className="text-pink-500 font-bold hover:underline">Continue Shopping</Link>
            </div>
          )}
        </div>
        
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Shipping</span>
                <span className="font-bold">${shipping.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-black text-2xl text-purple-600">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="promo" className="sr-only">Promo Code</label>
              <div className="flex gap-2">
                <input type="text" id="promo" placeholder="Promo code" className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-sm" />
                <button className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 text-sm">Apply</button>
              </div>
            </div>

            <Link href="/checkout" className="block w-full text-center py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black rounded-full hover:shadow-lg transition-all hover:scale-[1.02]">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
