'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(formData: FormData) {
  const id = formData.get('id') as string;
  
  if (id) {
    await prisma.product.delete({
      where: { id }
    });
    revalidatePath('/admin/products');
    revalidatePath('/shop');
    revalidatePath('/');
    revalidatePath('/new-drops');
  }
}

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const type = formData.get('type') as string;
  const price = parseFloat(formData.get('price') as string);
  const description = formData.get('description') as string;
  const patternName = formData.get('patternName') as string;
  const colorFamily = formData.get('colorFamily') as string;
  const colorsUsed = formData.get('colorsUsed') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const isNewDrop = formData.get('isNewDrop') === 'true';

  await prisma.product.create({
    data: {
      name,
      type,
      price,
      description,
      patternName,
      colorFamily,
      colorsUsed,
      isNewDrop,
      careInstructions: 'Wash separately first time. Wash cold. Hang dry.',
      images: {
        create: [{
          url: imageUrl,
          isFront: true,
          altText: name
        }]
      },
      variants: {
        create: [
          { size: 'S', quantity: 5 },
          { size: 'M', quantity: 5 },
          { size: 'L', quantity: 5 }
        ]
      }
    }
  });

  revalidatePath('/admin/products');
  revalidatePath('/shop');
  revalidatePath('/');
  revalidatePath('/new-drops');
}
