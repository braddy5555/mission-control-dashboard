import Link from 'next/link'
import { HomeIcon, ShoppingBagIcon, UsersIcon, TagIcon, SettingsIcon, BarChart2Icon } from 'lucide-react'

export function AdminNav() {
  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin">
                <span className="text-blue-600 font-bold text-xl">CP Admin</span>
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              <Link
                href="/admin"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-gray-900"
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <Link
                href="/admin/products"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                <TagIcon className="h-4 w-4 mr-2" />
                Producten
              </Link>
              <Link
                href="/admin/orders"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                <ShoppingBagIcon className="h-4 w-4 mr-2" />
                Orders
              </Link>
              <Link
                href="/admin/users"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                <UsersIcon className="h-4 w-4 mr-2" />
                Gebruikers
              </Link>
              <Link
                href="/admin/analytics"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                <BarChart2Icon className="h-4 w-4 mr-2" />
                Statistieken
              </Link>
              <Link
                href="/admin/settings"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                <SettingsIcon className="h-4 w-4 mr-2" />
                Instellingen
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <Link 
              href="/" 
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Bekijk Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}