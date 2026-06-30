'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/data/products';

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

const INSPIRATION_PRODUCTS = products.map(product => ({
  id: product.id,
  name: product.name,
  type: product.type,
  patternName: product.patternName,
  colorsUsed: product.colorsUsed,
  imageUrl: product.images.find(image => image.isFront)?.url || product.images[0]?.url || '',
}));

export default function CustomPage() {
  const router = useRouter();
  const addItem = useCartStore(state => state.addItem);

  const [garment, setGarment] = useState(GARMENT_TYPES[0]);
  const [pattern, setPattern] = useState(PATTERNS[0]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [size, setSize] = useState('M');
  const [inspirationId, setInspirationId] = useState<string>(INSPIRATION_PRODUCTS[0]?.id || '');
  const [customNotes, setCustomNotes] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const selectedInspiration = INSPIRATION_PRODUCTS.find(item => item.id === inspirationId) || INSPIRATION_PRODUCTS[0];
  const garmentMatches = INSPIRATION_PRODUCTS.filter(item => item.type.toLowerCase().includes(garment.name.toLowerCase().split(' ')[0]));
  const shownInspirations = garmentMatches.length > 0 ? garmentMatches : INSPIRATION_PRODUCTS;
  const selectedHexes = selectedColors.map(c => COLORS.find(x => x.name === c)?.hex || '#ffffff');
  const aiPalette = selectedColors.length > 0 ? selectedColors.join(' + ') : 'choose up to 3 colors';

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
    const noteDetails = customNotes.trim() ? ` | Notes: ${customNotes.trim()}` : '';
    const inspirationDetails = selectedInspiration ? ` | Inspiration: ${selectedInspiration.name}` : '';
    const customDetails = `Pattern: ${pattern} | Colors: ${selectedColors.join(', ')}${inspirationDetails}${noteDetails}`;

    setTimeout(() => {
      addItem({
        productId: `custom-${garment.id}-${Date.now()}`,
        name: `Custom ${garment.name}`,
        price: garment.price,
        size: size,
        quantity: 1,
        imageUrl: selectedInspiration?.imageUrl || `/blank_${garment.id}.png`,
        isCustom: true,
        customDetails
      });
      router.push('/cart');
    }, 600);
  };

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

    return { background: `linear-gradient(135deg, ${hexes.join(', ')})` };
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-[70vh]">
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-sky-500 mb-3">AI-assisted preview studio</p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Design Your Own</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Pick your garment, pattern, and up to 3 colors. Then choose a real Kilby&apos;s product as inspiration so we can preview the custom dye with a more realistic handmade reference.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-5/12 shrink-0 flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-950 border border-gray-100 flex items-center justify-center p-4 shadow-xl">
            {selectedInspiration?.imageUrl && (
              <Image
                src={selectedInspiration.imageUrl}
                alt={`${selectedInspiration.name} inspiration`}
                fill
                className="object-cover opacity-35 blur-[1px] scale-105"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/45 to-white/75" />
            <svg width="0" height="0" className="absolute">
              <filter id="tie-dye-filter">
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="warp" />
                <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="40" in="SourceGraphic" in2="warp" />
              </filter>
            </svg>

            <div
              className="absolute inset-4 transition-all duration-700"
              style={{
                ...getPreviewStyle(),
                filter: 'url(#tie-dye-filter)',
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
            <div className="absolute inset-4 z-10 pointer-events-none mix-blend-multiply opacity-95">
              <Image
                src={`/blank_${garment.id}.png`}
                alt={`${garment.name} Mockup`}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="absolute inset-x-5 top-5 z-30 flex items-center justify-between gap-3">
              <span className="bg-white/90 backdrop-blur text-xs font-black px-4 py-2 rounded-full shadow-sm text-gray-800">AI-assisted mockup</span>
              <div className="flex -space-x-2">
                {selectedHexes.map((hex, index) => (
                  <span key={`${hex}-${index}`} className="h-8 w-8 rounded-full border-2 border-white shadow" style={{ backgroundColor: hex }} />
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-30 rounded-2xl bg-white/90 backdrop-blur p-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">Preview recipe</p>
              <p className="text-sm font-bold text-gray-900">{pattern} on {garment.name} · {aiPalette}</p>
              {selectedInspiration && <p className="text-xs text-gray-600 mt-1">Inspired by: {selectedInspiration.name}</p>}
            </div>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Handmade preview note:</strong> This mockup blends your chosen colors with a real Kilby&apos;s inspiration product. Final dye placement and blending will be unique.
          </div>
        </div>

        <div className="w-full lg:w-7/12 flex flex-col gap-10">
          <div>
            <h3 className="font-bold text-xl mb-4">1. Select Garment</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {GARMENT_TYPES.map(g => (
                <button
                  key={g.id}
                  onClick={() => setGarment(g)}
                  className={`p-4 rounded-2xl border-2 text-center transition-all ${garment.id === g.id ? 'border-sky-500 bg-sky-50 shadow-md transform -translate-y-1' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <p className="font-bold text-lg text-gray-900">{g.name}</p>
                  <p className="text-sky-600 font-bold">${g.price}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4">2. Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-14 h-14 rounded-full font-bold flex items-center justify-center border-2 transition-all ${size === s ? 'border-fuchsia-500 bg-fuchsia-50 text-fuchsia-600' : 'border-gray-200 hover:border-fuchsia-300'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4">3. Select Pattern</h3>
            <div className="flex flex-wrap gap-3">
              {PATTERNS.map(p => (
                <button
                  key={p}
                  onClick={() => setPattern(p)}
                  className={`px-6 py-3 rounded-full font-bold border-2 transition-all ${pattern === p ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

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
                    className={`group relative w-16 h-16 rounded-full border-2 transition-all overflow-hidden ${isSelected ? 'border-sky-500 ring-2 ring-sky-200 scale-110 shadow-md' : 'border-gray-200'} ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105'}`}
                    title={c.name}
                    aria-label={`${isSelected ? 'Remove' : 'Add'} ${c.name}`}
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

          <div>
            <h3 className="font-bold text-xl mb-4">5. Pick a real Kilby&apos;s inspiration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {shownInspirations.map(item => (
                <button
                  key={item.id}
                  onClick={() => setInspirationId(item.id)}
                  className={`overflow-hidden rounded-3xl border-2 text-left transition-all ${inspirationId === item.id ? 'border-sky-500 bg-sky-50 shadow-md' : 'border-gray-200 hover:border-sky-300'}`}
                >
                  <div className="relative aspect-square bg-gray-100">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="(min-width: 768px) 16vw, 100vw" />
                    ) : (
                      <div className="h-full w-full bg-gray-100" />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-black text-gray-900 leading-tight">{item.name}</p>
                    <p className="text-xs font-bold text-sky-600 mt-2">{item.patternName}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.colorsUsed}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4">6. Add maker notes <span className="text-gray-500 text-sm font-normal ml-2">(optional)</span></h3>
            <textarea
              value={customNotes}
              onChange={(event) => setCustomNotes(event.target.value)}
              maxLength={220}
              rows={4}
              className="w-full rounded-3xl border-2 border-gray-200 p-5 text-gray-900 outline-none transition-colors focus:border-sky-500"
              placeholder="Example: Mostly blue with a little pink, keep some white space, make it similar to the inspiration photo."
            />
            <p className="text-right text-xs font-bold text-gray-400 mt-2">{customNotes.length} / 220</p>
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
