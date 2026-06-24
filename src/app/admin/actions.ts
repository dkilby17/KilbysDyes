'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function fileToBase64(file: File | null) {
  if (!file || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

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
  const isNewDrop = formData.get('isNewDrop') === 'true';

  // Handle files
  const imageFrontFile = formData.get('imageFront') as File | null;
  const imageBackFile = formData.get('imageBack') as File | null;
  
  const imageFrontBase64 = await fileToBase64(imageFrontFile);
  const imageBackBase64 = await fileToBase64(imageBackFile);

  const imagesToCreate = [];
  if (imageFrontBase64) {
    imagesToCreate.push({ url: imageFrontBase64, isFront: true, altText: `${name} - Front View` });
  }
  if (imageBackBase64) {
    imagesToCreate.push({ url: imageBackBase64, isFront: false, altText: `${name} - Back View` });
  }

  // Handle sizes
  const selectedSizes = formData.getAll('sizes') as string[];
  const variantsToCreate = selectedSizes.map(size => ({
    size,
    quantity: 5 // Default quantity for now
  }));

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
        create: imagesToCreate
      },
      variants: {
        create: variantsToCreate
      }
    }
  });

  revalidatePath('/admin/products');
  revalidatePath('/shop');
  revalidatePath('/');
  revalidatePath('/new-drops');
}
