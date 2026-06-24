export default function FAQPage() {
  const faqs = [
    {
      q: "Are all items handmade?",
      a: "Yes! Every single item at KilbysDyes is hand-tied and hand-dyed. No two pieces are exactly alike, which means you are getting a truly unique piece of clothing."
    },
    {
      q: "Will my item look exactly like the photo?",
      a: "Because each item is made by hand, there will be slight variations in colour placement and pattern shape. The photos represent the style, colours, and pattern technique used, but your item will be uniquely yours."

    },
    {
      q: "Do items shrink?",
      a: "Our garments are 100% cotton (or a high-cotton blend for hoodies). While they are pre-washed during the dyeing process, some minor additional shrinkage may occur if washed or dried on high heat. We recommend washing in cold water and hanging to dry."
    },
    {
      q: "How do I wash tie-dye clothing?",
      a: "For the first wash, wash the item separately in cold water to prevent any residual dye from bleeding onto other clothes. After that, wash in cold water with mild detergent, inside out, and tumble dry low or hang dry."

    },
    {
      q: "How do new drops work?",
      a: "We regularly release 'New Drops' which are limited edition designs or experimental colourways. These are available in small quantities and often sell out quickly. Joining our mailing list is the best way to get early access."
    },
    {
      q: "What payment methods are accepted?",
      a: "We securely process payments through Stripe. We accept all major credit cards, debit cards, and Apple Pay/Google Pay where supported."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600">Got questions? We've got answers.</p>
      </div>
      
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-3 text-gray-900">{faq.q}</h3>
            <p className="text-gray-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center bg-purple-50 rounded-3xl p-10 border border-purple-100">
        <h2 className="text-2xl font-bold mb-4 text-purple-900">Still have a question?</h2>
        <p className="text-purple-700 mb-6">If you couldn't find the answer you were looking for, reach out to us directly!</p>
        <a href="/contact" className="inline-block px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-colors">
          Contact Us
        </a>
      </div>
    </div>
  );
}
