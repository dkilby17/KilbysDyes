'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

const GARMENT_TYPES = [
  { id: 'tshirt', name: 'T-Shirt', price: 30 },
  { id: 'hoodie', name: 'Hoodie', price: 60 },
  { id: 'longsleeve', name: 'Long Sleeve', price: 40 },
];

const PATTERNS = [
  'Spiral', 'Crumple', 'Bullseye', 'Ice Dye', 'Stripes', 'Geode'
];

const COLORS = [
  { name: 'Red', hex: '#ef4444' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Yellow', hex: '#eab308' },
  { name: 'Green', hex: '#22c55e' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Purple', hex: '#a855f7' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Teal', hex: '#14b8a6' },
  { name: 'Black', hex: '#1f2937' },
  { name: 'Brown', hex: '#78350f' },
];

const SIZES = ['S', 'M', 'L', 'XL', '2XL'];

export default function CustomPage() {
  const router = useRouter();
  const addItem = useCartStore(state => state.addItem);

  const [garment, setGarment] = useState(GARMENT_TYPES[0]);
  const [pattern, setPattern] = useState(PATTERNS[0]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [size, setSize] = useState('M');
  const [isAdding, setIsAdding] = useState(false);

  const toggleColor = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter(c => c !== colorName));
    } else {
      if (selectedColors.length < 3) {
        setSelectedColors([...selectedColors, colorName]);
      }
    }
  };

  const handleAddToCart = () => {
    if (selectedColors.length === 0) return;
    
    setIsAdding(true);
    const customDetails = `Pattern: ${pattern} | Colors: ${selectedColors.join(', ')}`;
    
    setTimeout(() => {
      addItem({
        productId: `custom-${garment.id}-${Date.now()}`, // Unique ID so it stacks properly if different combos
        name: `Custom ${garment.name}`,
        price: garment.price,
        size: size,
        quantity: 1,
        imageUrl: '', // We don't have a specific image
        isCustom: true,
        customDetails
      });
      router.push('/cart');
    }, 600);
  };

  // Generate CSS background for the preview based on pattern and colors
  const getPreviewStyle = () => {
    if (selectedColors.length === 0) return { background: '#f3f4f6' };
    
    const hexes = selectedColors.map(c => COLORS.find(x => x.name === c)?.hex || '#000');
    
    if (hexes.length === 1) {
      return { background: hexes[0] };
    }
    
    if (pattern === 'Spiral') {
      return { background: `conic-gradient(from 0deg, ${hexes.join(', ')}, ${hexes[0]})` };
    }
    if (pattern === 'Stripes') {
      return { background: `repeating-linear-gradient(45deg, ${hexes.join(', ')})` };
    }
    if (pattern === 'Bullseye') {
      return { background: `radial-gradient(circle, ${hexes.join(', ')}, ${hexes[0]})` };
    }
    
    // Default gradient fallback for Crumple, Ice Dye, etc.
    return { background: `linear-gradient(135deg, ${hexes.join(', ')})` };
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-[70vh]">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Design Your Own</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Pick your garment, pattern, and up to 3 colors. We will hand-dye your unique piece!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Preview Area */}
        <div className="w-full lg:w-5/12 shrink-0 flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-4">
            
            {/* The Gradient Background Layer (Masked exactly to the shirt shape) */}
            <div 
              className="absolute inset-4 transition-all duration-700"
              style={{
                ...getPreviewStyle(),
                WebkitMaskImage: `url(/blank_${garment.id}.png)`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url(/blank_${garment.id}.png)`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center'
              }}
            />
            
            {/* The Realistic Mockup Layer (Multiply Blending for Texture/Shadows) */}
            <div className="absolute inset-4 z-10 pointer-events-none mix-blend-multiply opacity-90">
              <img 
                src={`/blank_${garment.id}.png`} 
                alt={`${garment.name} Mockup`}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
            
            <div className="absolute bottom-4 left-0 w-full text-center z-30">
              <span className="bg-white/90 backdrop-blur text-sm font-bold px-4 py-2 rounded-full shadow-sm text-gray-800">
                Live Preview
              </span>
            </div>
          </div>
        </div>

        {/* Configuration Options */}
        <div className="w-full lg:w-7/12 flex flex-col gap-10">
          
          {/* Garment Type */}
          <div>
            <h3 className="font-bold text-xl mb-4">1. Select Garment</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {GARMENT_TYPES.map(g => (
                <button
                  key={g.id}
                  onClick={() => setGarment(g)}
                  className={`p-4 rounded-2xl border-2 text-center transition-all ${
                    garment.id === g.id 
                      ? 'border-sky-500 bg-sky-50 shadow-md transform -translate-y-1' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-bold text-lg text-gray-900">{g.name}</p>
                  <p className="text-sky-600 font-bold">${g.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <h3 className="font-bold text-xl mb-4">2. Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-14 h-14 rounded-full font-bold flex items-center justify-center border-2 transition-all ${
                    size === s
                      ? 'border-fuchsia-500 bg-fuchsia-50 text-fuchsia-600'
                      : 'border-gray-200 hover:border-fuchsia-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Pattern */}
          <div>
            <h3 className="font-bold text-xl mb-4">3. Select Pattern</h3>
            <div className="flex flex-wrap gap-3">
              {PATTERNS.map(p => (
                <button
                  key={p}
                  onClick={() => setPattern(p)}
                  className={`px-6 py-3 rounded-full font-bold border-2 transition-all ${
                    pattern === p
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <h3 className="font-bold text-xl">4. Choose Colors <span className="text-gray-500 text-sm font-normal ml-2">(Max 3)</span></h3>
              <span className="text-sm font-bold text-sky-600">{selectedColors.length} / 3 Selected</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {COLORS.map(c => {
                const isSelected = selectedColors.includes(c.name);
                const isDisabled = !isSelected && selectedColors.length >= 3;
                
                return (
                  <button
                    key={c.name}
                    onClick={() => toggleColor(c.name)}
                    disabled={isDisabled}
                    className={`group relative w-16 h-16 rounded-full border-2 transition-all overflow-hidden ${
                      isSelected ? 'border-sky-500 ring-2 ring-sky-200 scale-110 shadow-md' : 'border-gray-200'
                    } ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105'}`}
                    title={c.name}
                  >
                    <div className="absolute inset-0" style={{ backgroundColor: c.hex }} />
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 mt-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold">Total Custom Price</span>
              <span className="text-4xl font-black text-sky-600">${garment.price.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={selectedColors.length === 0 || isAdding}
              className="w-full bg-gradient-to-r from-sky-400 via-blue-500 to-fuchsia-500 text-white font-black text-xl rounded-full shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all py-5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              {isAdding ? 'Adding to Cart...' : selectedColors.length === 0 ? 'Select Colors to Continue' : 'Add Custom Design to Cart'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
