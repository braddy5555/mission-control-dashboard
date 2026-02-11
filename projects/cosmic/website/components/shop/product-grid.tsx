import { ProductCard } from './product-card'

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

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Geen producten gevonden</h3>
        <p className="mt-2 text-gray-500">Er zijn momenteel geen producten beschikbaar.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}