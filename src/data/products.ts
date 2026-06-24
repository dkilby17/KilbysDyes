export type ProductVariant = {
  id: string;
  size: string;
  quantity: number;
};

export type ProductImage = {
  id: string;
  url: string;
  isFront: boolean;
  altText: string;
};

export type Product = {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  patternName: string;
  colorFamily: string;
  colorsUsed: string;
  isNewDrop: boolean;
  careInstructions: string;
  status: string;
  createdAt: string;
  images: ProductImage[];
  variants: ProductVariant[];
};

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Rainbow Spiral T-Shirt',
    type: 'T-Shirt',
    description: 'A vibrant classic rainbow spiral tie-dye t-shirt. Handmade with love.',
    price: 35.00,
    patternName: 'Spiral',
    colorFamily: 'Multicolor',
    colorsUsed: 'Red, Orange, Yellow, Green, Blue, Purple',
    isNewDrop: true,
    careInstructions: 'Wash separately first time. Wash cold. Hang dry.',
    status: 'Active',
    createdAt: new Date().toISOString(),
    images: [
      { id: 'img_1', url: 'https://images.unsplash.com/photo-1574314227361-b75c88939c0d?w=800&q=80', isFront: true, altText: 'Rainbow Spiral Front' }
    ],
    variants: [
      { id: 'var_1', size: 'S', quantity: 10 },
      { id: 'var_2', size: 'M', quantity: 15 },
      { id: 'var_3', size: 'L', quantity: 12 },
      { id: 'var_4', size: 'XL', quantity: 5 },
    ]
  },
  {
    id: 'prod_2',
    name: 'Pastel Crumple Hoodie',
    type: 'Hoodie',
    description: 'Soft pastel colors in a fun crumple pattern. Super cozy!',
    price: 65.00,
    patternName: 'Crumple',
    colorFamily: 'Pastel',
    colorsUsed: 'Light Blue, Pink, Lavender',
    isNewDrop: false,
    careInstructions: 'Wash separately first time. Wash cold. Tumble dry low.',
    status: 'Active',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    images: [
      { id: 'img_2', url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', isFront: true, altText: 'Pastel Crumple Hoodie Front' }
    ],
    variants: [
      { id: 'var_5', size: 'S', quantity: 5 },
      { id: 'var_6', size: 'M', quantity: 8 },
      { id: 'var_7', size: 'L', quantity: 4 },
    ]
  },
  {
    id: 'prod_3',
    name: 'Midnight Bullseye T-Shirt',
    type: 'T-Shirt',
    description: 'Dark and mysterious midnight blue bullseye pattern.',
    price: 35.00,
    patternName: 'Bullseye',
    colorFamily: 'Dark',
    colorsUsed: 'Navy, Black, Deep Purple',
    isNewDrop: false,
    careInstructions: 'Wash separately first time. Wash cold. Hang dry.',
    status: 'Active',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    images: [
      { id: 'img_3', url: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80', isFront: true, altText: 'Midnight Bullseye Front' }
    ],
    variants: [
      { id: 'var_8', size: 'M', quantity: 3 },
      { id: 'var_9', size: 'L', quantity: 6 },
      { id: 'var_10', size: 'XXL', quantity: 2 },
    ]
  }
];

export async function getProducts() {
  // Simulate network delay
  return new Promise<Product[]>((resolve) => {
    setTimeout(() => resolve(products), 10);
  });
}

export async function getProductById(id: string) {
  return new Promise<Product | undefined>((resolve) => {
    setTimeout(() => {
      resolve(products.find(p => p.id === id));
    }, 10);
  });
}
