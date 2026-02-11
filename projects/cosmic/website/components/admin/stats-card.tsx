import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  description: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export function StatsCard({
  title,
  value,
  description,
  trend = 'neutral',
  trendValue = ''
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {trend !== 'neutral' && trendValue && (
          <div className={`flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? (
              <ArrowUpIcon className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 mr-1" />
            )}
            <span className="text-sm">{trendValue}</span>
          </div>
        )}
      </div>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  )
}