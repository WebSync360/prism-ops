import { useState, useEffect } from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import AddClientSheet from '@/components/custom/AddClientSheet'
import ClientTable from '@/components/custom/ClientTable'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [stats, setStats] = useState({ total: 0, blocked: 0, inProgress: 0, completed: 0 })

  const fetchStats = async () => {
    const { data } = await supabase.from('clients').select('status')
    if (data) {
      setStats({
        total: data.length,
        blocked: data.filter(c => c.status === 'Blocked').length,
        inProgress: data.filter(c => c.status === 'In Progress').length,
        completed: data.filter(c => c.status === 'Completed').length,
      })
    }
  }

  useEffect(() => {
    fetchStats()
  }, [refreshKey]) // Re-run whenever a client is added

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Founder Command Center</h2>
            <p className="text-gray-400 text-sm">Real-time pulse of your operations.</p>
          </div>
          <AddClientSheet onClientAdded={() => setRefreshKey(prev => prev + 1)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <MetricCard title="Total Clients" value={stats.total} />
           <MetricCard title="Blocked" value={stats.blocked} color="border-l-red-500" />
           <MetricCard title="In Progress" value={stats.inProgress} color="border-l-blue-500" />
           <MetricCard title="Completed" value={stats.completed} color="border-l-green-500" />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Active Pipeline</h3>
          <ClientTable key={refreshKey} />
        </div>
      </div>
    </DashboardLayout>
  )
}

function MetricCard({ title, value, color = "" }: { title: string, value: number, color?: string }) {
  return (
    <div className={`bg-[#1C1E24] rounded-xl border border-gray-800 p-6 ${color}`}>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </div>
  )
}