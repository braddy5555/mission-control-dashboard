import { StatsCard } from './stats-card'

interface StatsCardsProps {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalUsers: number
}

export function StatsCards({
  totalOrders,
  totalRevenue,
  totalProducts,
  totalUsers
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard 
        title="Totale Orders" 
        value={totalOrders.toString()} 
        description="Alle orders" 
        trend="up"
        trendValue="12%"
      />
      <StatsCard 
        title="Totale Omzet" 
        value={`€${totalRevenue.toLocaleString('nl-NL')}`} 
        description="Alle tijd" 
        trend="up"
        trendValue="23%"
      />
      <StatsCard 
        title="Producten" 
        value={totalProducts.toString()} 
        description="Actieve producten" 
        trend="up"
        trendValue="5%"
      />
      <StatsCard 
        title="Gebruikers" 
        value={totalUsers.toString()} 
        description="Geregistreerde gebruikers" 
        trend="up"
        trendValue="18%"
      />
    </div>
  )
}