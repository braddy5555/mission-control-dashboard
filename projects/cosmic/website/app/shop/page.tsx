import { ProductGrid } from '@/components/shop/product-grid'
import { prisma } from '@/lib/prisma'
import { HeroSection } from '@/components/shop/hero-section'

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { inStock: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })

  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Categorieën</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/shop" className="text-blue-600 font-medium">
                    Alle producten
                  </a>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <a 
                      href={`/shop/category/${cat.slug}`}
                      className="text-gray-600 hover:text-blue-600 transition"
                    >
                      {cat.name} ({cat._count.products})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Onze Producten</h1>
              <p className="text-gray-600 mt-2">
                Ontdek onze AI-tools, templates en complete systemen
              </p>
            </div>
            
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  )
}
