import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: string | number
  comparePrice?: string | number | null
  image: string
  featured: boolean
}

export function ProductCard({ product }: { product: Product }) {
  // Calculate discount percentage if comparePrice exists
  const hasDiscount = product.comparePrice && Number(product.comparePrice) > 0
  const discountPercentage = hasDiscount
    ? Math.round(((Number(product.comparePrice) - Number(product.price)) / Number(product.comparePrice)) * 100)
    : 0

  return (
    <div className="group relative">
      <Link href={`/shop/product/${product.slug}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-90 lg:h-60">
          <Image 
            src={product.image || '/placeholder.jpg'} 
            alt={product.name}
            width={500}
            height={400}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
              -{discountPercentage}%
            </div>
          )}
          {product.featured && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs font-semibold rounded">
              Populair
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between">
          <h3 className="text-sm text-gray-700 font-medium">{product.name}</h3>
          <div className="text-sm font-medium">
            <div className="flex flex-col items-end">
              <span className="text-gray-900">
                {formatPrice(Number(product.price))}
              </span>
              {hasDiscount && (
                <span className="text-gray-500 line-through text-xs">
                  {formatPrice(Number(product.comparePrice))}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
      <div className="mt-4">
        <Link 
          href={`/shop/product/${product.slug}`}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Bekijk details
        </Link>
      </div>
    </div>
  )
}