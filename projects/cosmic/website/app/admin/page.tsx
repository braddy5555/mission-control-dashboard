import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AdminNav } from '@/components/admin/admin-nav'
import { StatsCards } from '@/components/admin/stats-cards'
import { RecentOrders } from '@/components/admin/recent-orders'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  // Get stats
  const totalOrders = await prisma.order.count()
  const totalRevenue = await prisma.order.aggregate({
    where: { paymentStatus: 'PAID' },
    _sum: { total: true }
  })
  const totalProducts = await prisma.product.count()
  const totalUsers = await prisma.user.count()

  // Get recent orders
  const recentOrders = await prisma.order.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: { product: { select: { name: true } } }
      }
    }
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welkom terug, {session.user.name}</p>
        </div>

        <StatsCards 
          totalOrders={totalOrders}
          totalRevenue={totalRevenue._sum.total || 0}
          totalProducts={totalProducts}
          totalUsers={totalUsers}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentOrders orders={recentOrders} />
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Snelle Acties</h3>
            <div className="space-y-3">
              <a 
                href="/admin/products/new"
                className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                + Nieuw Product
              </a>
              <a 
                href="/admin/orders"
                className="block w-full text-center bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
              >
                Bekijk Alle Orders
              </a>
              <a 
                href="/admin/users"
                className="block w-full text-center bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
              >
                Gebruikers Beheren
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
