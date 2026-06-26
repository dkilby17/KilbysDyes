'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';

interface Variant {
  id: string;
  size: string;
  quantity: number;
}

interface AddToCartFormProps {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  variants: Variant[];
}

export function AddToCartForm({ productId, name, price, imageUrl, variants }: AddToCartFormProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    addItem({
      productId,
      name,
      price,
      size: selectedSize,
      quantity,
      imageUrl
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const selectedVariant = variants.find(v => v.size === selectedSize);
  const isOutOfStock = selectedVariant && selectedVariant.quantity < quantity;

  return (
    <div>
      <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 relative">
        <h3 className="font-bold text-gray-900 mb-4">Select Size</h3>
        <div className="flex flex-wrap gap-3 mb-2">
          {variants.map(variant => (
            <button 
              key={variant.id}
              onClick={() => setSelectedSize(variant.size)}
              disabled={variant.quantity === 0}
              className={`
                w-14 h-14 rounded-full font-bold flex items-center justify-center border-2 transition-all
                ${selectedSize === variant.size ? 'border-pink-500 bg-pink-50 text-pink-600' : ''}
                ${variant.quantity > 0 && selectedSize !== variant.size
                  ? 'border-gray-200 hover:border-purple-500 hover:text-purple-600 bg-white' 
                  : ''}
                ${variant.quantity === 0 ? 'border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed' : ''}
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
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:text-pink-500"
          >&minus;</button>
          <span className="w-10 text-center font-bold">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:text-pink-500"
          >+</button>
        </div>
        
        <button 
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isOutOfStock ? 'Not Enough Stock' : 'Add to Cart'}
        </button>
      </div>

      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-4 rounded-full shadow-2xl font-bold flex items-center gap-3 z-50 animate-bounce">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          Added to cart!
        </div>
      )}
    </div>
  );
}
