export default function CarePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Care Instructions</h1>
        <p className="text-xl text-gray-600">Keep your tie-dye looking bright and vibrant for years to come.</p>
      </div>
      
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-12">
        <div className="flex justify-center gap-8 mb-10 text-pink-500">
          <div className="flex flex-col items-center gap-2">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Wash Cold</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
            <span className="text-sm font-bold uppercase tracking-wider text-gray-500">No Bleach</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Hang Dry</span>
          </div>
        </div>

        <ul className="space-y-6 text-gray-700">
          <li className="flex gap-4">
            <span className="flex shrink-0 w-8 h-8 bg-pink-100 text-pink-600 rounded-full items-center justify-center font-bold">1</span>
            <div>
              <strong className="block text-gray-900 text-lg mb-1">First Wash: Wash Separately</strong>
              <p>For the very first wash, it is crucial to wash your tie-dye item completely separate from other clothing in cold water. This prevents any loose dye from staining your other clothes.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex shrink-0 w-8 h-8 bg-pink-100 text-pink-600 rounded-full items-center justify-center font-bold">2</span>
            <div>
              <strong className="block text-gray-900 text-lg mb-1">Wash in Cold Water</strong>
              <p>Always wash your tie-dye items in cold water to prevent the colours from fading over time.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex shrink-0 w-8 h-8 bg-pink-100 text-pink-600 rounded-full items-center justify-center font-bold">3</span>
            <div>
              <strong className="block text-gray-900 text-lg mb-1">Turn Inside Out</strong>
              <p>Turn your garments inside out before washing to protect the fabric surface and the vibrancy of the dye.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex shrink-0 w-8 h-8 bg-pink-100 text-pink-600 rounded-full items-center justify-center font-bold">4</span>
            <div>
              <strong className="block text-gray-900 text-lg mb-1">Use Mild Detergent</strong>
              <p>Use a gentle, color-safe detergent. Never use bleach or detergents containing bleach alternatives, as this will destroy the colours.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex shrink-0 w-8 h-8 bg-pink-100 text-pink-600 rounded-full items-center justify-center font-bold">5</span>
            <div>
              <strong className="block text-gray-900 text-lg mb-1">Dry on Low Heat or Hang Dry</strong>
              <p>To minimize shrinkage and preserve the lifespan of the garment, hang drying is best. If using a dryer, use a low heat tumble setting.</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100">
        <h3 className="text-yellow-800 font-bold mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          Important Note on Shrinkage
        </h3>
        <p className="text-sm text-yellow-800">
          Our shirts and hoodies are primarily made of cotton. Even though they go through washing and drying cycles during the dyeing process, cotton naturally shrinks when exposed to heat. Following the cold wash and hang dry instructions will significantly reduce any further shrinkage.
        </p>
      </div>
    </div>
  );
}
