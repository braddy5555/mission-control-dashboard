import { useState } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/hooks/use-cart'
import { StarIcon } from 'lucide-react'
import toast from 'react-hot-toast'

interface ProductDetailProps {
  product: any // Full product type
  relatedProducts: any[] // Related products
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const hasDiscount = product.comparePrice && Number(product.comparePrice) > 0
  const discountPercentage = hasDiscount
    ? Math.round(((Number(product.comparePrice) - Number(product.price)) / Number(product.comparePrice)) * 100)
    : 0

  // Calculate average rating
  const avgRating = product.reviews.length 
    ? product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / product.reviews.length 
    : 0

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    })
    toast.success(`${product.name} toegevoegd aan winkelwagen`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product images */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <Image 
              src={product.image || '/placeholder.jpg'} 
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-center object-cover"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {product.images.map((img: string, i: number) => (
                <div key={i} className="relative aspect-w-1 aspect-h-1 rounded-md overflow-hidden">
                  <Image 
                    src={img || '/placeholder.jpg'} 
                    alt={`${product.name} - image ${i+1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-center object-cover cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product details */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="mt-3">
            <h2 className="sr-only">Product informatie</h2>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`h-5 w-5 ${
                      avgRating > rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500">
                {product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-gray-900">{formatPrice(Number(product.price))}</h2>
              {hasDiscount && (
                <div className="ml-4">
                  <span className="text-gray-500 line-through">{formatPrice(Number(product.comparePrice))}</span>
                  <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {discountPercentage}% korting
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Beschrijving</h3>
            <div className="text-base text-gray-700 space-y-4">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center space-x-3">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Aantal
              </label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <span className="sr-only">Verminderen</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <input
                  id="quantity"
                  name="quantity"
                  className="w-12 text-center border-0 focus:ring-0"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <span className="sr-only">Verhogen</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Toevoegen aan winkelwagen
              </button>
            </div>
          </div>

          <div className="mt-8 border-t pt-8">
            <h3 className="text-lg font-medium text-gray-900">Reviews</h3>
            {product.reviews.length > 0 ? (
              <div className="mt-4 space-y-6">
                {product.reviews.map((review: any) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={`h-4 w-4 ${
                              review.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-sm text-gray-500">{review.user.name}</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">Nog geen reviews.</p>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t pt-8">
          <h2 className="text-xl font-bold text-gray-900">Gerelateerde producten</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <Image
                    src={relatedProduct.image || '/placeholder.jpg'}
                    alt={relatedProduct.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={`/shop/product/${relatedProduct.slug}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {relatedProduct.name}
                      </a>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{formatPrice(Number(relatedProduct.price))}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}