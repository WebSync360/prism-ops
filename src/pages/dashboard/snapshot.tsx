import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' // 1. Import Link from react-router-dom
import DashboardLayout from '@/layouts/DashboardLayout'
import { supabase } from '@/lib/supabase'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react"

export default function DailySnapshot() {
  const [blockedClients, setBlockedClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchSnapshot = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('status', 'Blocked')
      .order('created_at', { ascending: false })

    if (!error) setBlockedClients(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchSnapshot()
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Daily Snapshot</h2>
          <p className="text-gray-400 text-sm">Priority focus for {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-[#1C1E24] border-red-900/20 border">
            <CardHeader className="flex flex-row items-center space-x-2 border-b border-gray-800 pb-4">
              <AlertCircle className="text-red-500" size={20} />
              <CardTitle className="text-white text-lg font-medium">Critical Blockers</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {loading ? (
                <div className="text-gray-500 text-sm">Scanning for bottlenecks...</div>
              ) : blockedClients.length > 0 ? (
                <div className="space-y-4">
                  {blockedClients.map((client) => (
                    /* 2. Wrap the card in a Link pointing to the dynamic ID */
                    <Link 
                      to={`/dashboard/clients/${client.id}`} 
                      key={client.id}
                      className="block group"
                    >
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[#141E30] border border-gray-800 group-hover:border-red-500/50 transition-all">
                        <div>
                          <div className="text-white font-semibold group-hover:text-red-400 transition-colors">{client.name}</div>
                          <div className="text-xs text-gray-400">{client.email}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Needs Action</Badge>
                          <ArrowRight size={14} className="text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 italic">
                  Clear skies. No blocked clients detected.
                </div>
              )}
            </CardContent>
          </Card>

          <div className="bg-[#1C1E24] p-6 rounded-xl border border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/10 rounded-full">
                <CheckCircle2 className="text-blue-500" size={24} />
              </div>
              <div>
                <h4 className="text-white font-medium">Ready for Progress?</h4>
                <p className="text-sm text-gray-400">View your full pipeline to move clients to completion.</p>
              </div>
            </div>
            {/* 3. Change <a> to <Link> for smoother internal navigation */}
            <Link to="/dashboard" className="text-white hover:text-blue-400 transition-colors">
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}