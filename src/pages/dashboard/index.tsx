import { useState, useEffect } from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import AddClientSheet from '@/components/custom/AddClientSheet'
import ClientTable from '@/components/custom/ClientTable'
import StageHeatmap from '@/components/custom/StageHeatmap'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [clients, setClients] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, blocked: 0, completed: 0 })

  const loadData = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setClients(data)
      setStats({
        total: data.length,
        blocked: data.filter(c => c.status === 'Blocked').length,
        completed: data.filter(c => c.status === 'Completed').length,
      })
    }
  }

  useEffect(() => {
    loadData()

    // Listen for updates from ClientTable (status changes/deletes)
    const handleTableUpdate = () => loadData()
    window.addEventListener('refresh-metrics', handleTableUpdate)

    return () => window.removeEventListener('refresh-metrics', handleTableUpdate)
  }, [])

  // Syncs the key to force a hard-refresh of the ClientTable when a new client is added
  const handleNewClient = () => {
    setRefreshKey(prev => prev + 1)
    loadData()
  }

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* TOP BAR: IDENTITY & ACTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tighter">Command Center</h2>
            <p className="text-gray-500 text-sm">Real-time oversight of your client onboarding lifecycle.</p>
          </div>
          <AddClientSheet onClientAdded={handleNewClient} />
        </div>

        {/* SECTION 1: BUSINESS PULSE (METRICS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <MetricCard title="Total Pipeline" value={stats.total} />
           <MetricCard title="Action Required" value={stats.blocked} color="border-l-red-500" />
           <MetricCard title="Successes" value={stats.completed} color="border-l-green-500" />
        </div>

        {/* SECTION 3: THE SPREADSHEET (DATABASE) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Active Records</h3>
            <span className="text-[10px] text-[#35577D] font-bold bg-[#35577D]/10 px-2 py-1 rounded">
              AUTO-SYNC ENABLED
            </span>
          </div>
          <ClientTable key={refreshKey} />
        </div>

      </div>

      
        {/* SECTION 2: DOPAMINE HEATMAP (STAGES) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Onboarding Flow</h3>
            <div className="h-[1px] flex-1 bg-gray-800"></div>
          </div>
          <StageHeatmap clients={clients} />
        </div>
    </DashboardLayout>
  )

}

function MetricCard({ title, value, color = "" }: { title: string, value: number, color?: string }) {
  return (
    <div className={`bg-[#1C1E24] rounded-xl border border-gray-800 p-6 transition-all hover:scale-[1.02] duration-300 ${color}`}>
      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{title}</p>
      <p className="text-4xl font-bold text-white mt-2">
        {value.toString().padStart(2, '0')}
      </p>
    </div>
  )
}