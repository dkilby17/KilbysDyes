'use server';

import prisma from '@/lib/prisma';

export async function createOrder(data: {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  items: {
    productId: string;
    name: string;
    size: string;
    quantity: number;
    price: number;
    isCustom?: boolean;
    customDetails?: string;
  }[];
}) {
  const orderNumber = `KILBY-${Math.floor(100000 + Math.random() * 900000)}`;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      apartment: data.apartment || null,
      city: data.city,
      state: data.state,
      zip: data.zip,
      subtotal: data.subtotal,
      shippingCost: data.shippingCost,
      total: data.total,
      items: {
        create: data.items.map(item => ({
          productId: item.productId,
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          isCustom: item.isCustom || false,
          customDetails: item.customDetails || null
        }))
      }
    }
  });

  return { success: true, orderNumber: order.orderNumber };
}
