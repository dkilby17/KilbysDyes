import { PrismaClient } from '@prisma/client'
import { products } from '../src/data/products'

const prisma = new PrismaClient()

async function main() {
  const count = await prisma.product.count()
  if (count > 0) {
    console.log('Database already seeded.')
    return
  }

  console.log('Start seeding...')

  for (const p of products) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        type: p.type,
        description: p.description,
        price: p.price,
        patternName: p.patternName,
        colorFamily: p.colorFamily,
        colorsUsed: p.colorsUsed,
        isNewDrop: p.isNewDrop,
        careInstructions: p.careInstructions,
        status: p.status,
        createdAt: new Date(p.createdAt),
        images: {
          create: p.images.map((img) => ({
            url: img.url,
            isFront: img.isFront,
            altText: img.altText,
          }))
        },
        variants: {
          create: p.variants.map((v) => ({
            size: v.size,
            quantity: v.quantity,
          }))
        }
      }
    })
    console.log(`Created product with id: ${product.id}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
