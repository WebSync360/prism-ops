import DashboardLayout from '@/layouts/DashboardLayout'
import ClientTable from '@/components/custom/ClientTable'
import AddClientSheet from '@/components/custom/AddClientSheet'
import { useState } from 'react'

export default function ClientsPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleNewClient = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Simplified Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Client Database</h2>
            <p className="text-gray-500 text-sm">Manage and filter your authorized client nodes.</p>
          </div>
          <AddClientSheet onClientAdded={handleNewClient} />
        </div>

        {/* Pure Table View - No Heatmap, No Metrics */}
        <div className="bg-[#1C1E24]/30 rounded-2xl border border-gray-800/50 p-1">
          <ClientTable key={refreshKey} />
        </div>
      </div>
    </DashboardLayout>
  )
}