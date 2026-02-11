import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ProductDetail } from '@/components/shop/product-detail'
import { stripe } from '@/lib/stripe'

interface ProductPageProps {
  params: { slug: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { 
      category: true,
      reviews: { 
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        take: 5
      }
    }
  })

  if (!product) {
    notFound()
  }

  // Get related products
  const relatedProducts = await prisma.product.findMany({
    where: { 
      categoryId: product.categoryId,
      id: { not: product.id },
      inStock: true
    },
    take: 4
  })

  return (
    <ProductDetail 
      product={product} 
      relatedProducts={relatedProducts}
    />
  )
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true }
  })
  
  return products.map((p) => ({
    slug: p.slug
  }))
}
