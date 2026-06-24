'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CustomizePage() {
  const [productType, setProductType] = useState('T-Shirt');
  const [size, setSize] = useState('M');
  const [pattern, setPattern] = useState('Spiral');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const colors = [
    { name: 'Red', hex: '#ef4444' },
    { name: 'Orange', hex: '#f97316' },
    { name: 'Yellow', hex: '#eab308' },
    { name: 'Green', hex: '#22c55e' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Purple', hex: '#a855f7' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'Black', hex: '#000000' },
  ];

  const patterns = ['Spiral', 'Crumple', 'Bullseye', 'Ice Dye', 'Stripes', 'V-Shape'];

  const toggleColor = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter(c => c !== colorName));
    } else {
      if (selectedColors.length < 4) {
        setSelectedColors([...selectedColors, colorName]);
      } else {
        alert('You can select up to 4 colours.');
      }
    }
  };

  const handleAiSuggest = () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    // Simulate AI suggestion delay
    setTimeout(() => {
      if (aiPrompt.toLowerCase().includes('dark') || aiPrompt.toLowerCase().includes('night') || aiPrompt.toLowerCase().includes('galaxy')) {
        setSelectedColors(['Black', 'Purple', 'Blue']);
        setPattern('Spiral');
      } else if (aiPrompt.toLowerCase().includes('sunset') || aiPrompt.toLowerCase().includes('warm')) {
        setSelectedColors(['Red', 'Orange', 'Yellow', 'Pink']);
        setPattern('Crumple');
      } else {
        // Random suggestion
        const randomColors = [...colors].sort(() => 0.5 - Math.random()).slice(0, 3).map(c => c.name);
        setSelectedColors(randomColors);
        setPattern(patterns[Math.floor(Math.random() * patterns.length)]);
      }
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Customize Your Own</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Design your perfect tie-dye piece. Choose your style, colours, and pattern, and we'll hand-make it just for you.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form Controls */}
        <div className="w-full lg:w-3/5 space-y-10">
          
          {/* AI Helper */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-3xl border border-pink-100">
            <h3 className="font-bold flex items-center gap-2 mb-2 text-purple-900">
              <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              AI Design Helper
            </h3>
            <p className="text-sm text-gray-600 mb-4">Not sure what to pick? Describe your vibe and let our AI suggest a combination!</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="e.g. 'A dark galaxy with bright pink stars'" 
                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
              />
              <button 
                onClick={handleAiSuggest}
                disabled={isGenerating || !aiPrompt}
                className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                {isGenerating ? 'Thinking...' : 'Suggest'}
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">1. Choose Product</h3>
            <div className="grid grid-cols-2 gap-4">
              {['T-Shirt', 'Hoodie'].map(type => (
                <button
                  key={type}
                  onClick={() => setProductType(type)}
                  className={`p-4 rounded-2xl border-2 font-bold transition-all ${productType === type ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-md' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 flex justify-between items-center">
              2. Choose Size
              <Link href="/faq" className="text-sm font-normal text-pink-500 hover:underline">Size Guide</Link>
            </h3>
            <div className="flex flex-wrap gap-3">
              {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-14 h-14 rounded-full font-bold border-2 transition-all ${size === s ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">
              3. Choose Colours (Max 4)
            </h3>
            <div className="flex flex-wrap gap-4">
              {colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => toggleColor(color.name)}
                  className={`group flex flex-col items-center gap-2 transition-transform ${selectedColors.includes(color.name) ? 'scale-110' : 'hover:scale-105'}`}
                >
                  <div 
                    className={`w-16 h-16 rounded-full shadow-inner relative overflow-hidden transition-all ${selectedColors.includes(color.name) ? 'ring-4 ring-offset-2 ring-pink-500' : 'ring-1 ring-gray-200'}`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColors.includes(color.name) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${selectedColors.includes(color.name) ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">4. Choose Pattern</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {patterns.map(p => (
                <button
                  key={p}
                  onClick={() => setPattern(p)}
                  className={`p-3 rounded-2xl border-2 font-bold text-center transition-all ${pattern === p ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">5. Additional Notes (Optional)</h3>
            <textarea 
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any specific requests? e.g. 'More blue than pink', 'Leave some white space'"
              className="w-full p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px]"
            ></textarea>
          </div>

        </div>

        {/* Live Preview / Sticky Sidebar */}
        <div className="w-full lg:w-2/5">
          <div className="sticky top-24 bg-white rounded-3xl border border-gray-200 p-6 shadow-xl">
            <h2 className="text-2xl font-black mb-6 border-b pb-4">Your Custom Design</h2>
            
            <div className="aspect-square bg-gray-100 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
              {/* Simulated Mockup Container */}
              <div className="text-center z-10 px-4 py-8 bg-white/80 backdrop-blur-sm rounded-xl m-4 shadow-sm border border-gray-100">
                 <p className="text-gray-500 font-medium mb-2">Simulated Preview</p>
                 <div className="flex gap-2 justify-center mb-4">
                   {selectedColors.length > 0 ? selectedColors.map(c => {
                     const col = colors.find(color => color.name === c);
                     return <div key={c} className="w-8 h-8 rounded-full shadow-sm" style={{ backgroundColor: col?.hex }}></div>
                   }) : (
                     <div className="text-sm text-gray-400">No colours selected</div>
                   )}
                 </div>
                 <p className="font-bold text-lg">{pattern} {productType}</p>
              </div>
              
              {/* Abstract decorative background based on colors */}
              <div 
                className="absolute inset-0 opacity-40 mix-blend-multiply transition-all duration-1000"
                style={{
                  background: selectedColors.length > 0 
                    ? `linear-gradient(135deg, ${selectedColors.map(c => colors.find(color => color.name === c)?.hex).join(', ')})`
                    : 'transparent'
                }}
              ></div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price</span>
                <span className="font-bold">${productType === 'Hoodie' ? '75.00' : '45.00'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customization Fee</span>
                <span className="font-bold">$10.00</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-black text-2xl text-purple-600">${productType === 'Hoodie' ? '85.00' : '55.00'}</span>
              </div>
            </div>

            <button 
              disabled={selectedColors.length === 0}
              className="w-full py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Add Custom Order to Cart
            </button>

            <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
              <p className="text-xs text-yellow-800 leading-relaxed">
                <strong>Disclaimer:</strong> Custom items are handmade and may not look exactly like the preview. Each piece is one of a kind. Custom orders are final sale and cannot be returned unless damaged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
