import { useEffect, useState } from 'react'
// 1. Swap next/router for react-router-dom hooks
import { useParams, Link } from 'react-router-dom' 
import { supabase } from '@/lib/supabase'
import DashboardLayout from '@/layouts/DashboardLayout'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, Phone, Mail, Calendar, User, 
  Loader2, Save 
} from 'lucide-react'
import { Badge } from "@/components/ui/badge"

export default function ClientProfile() {
  // 2. Get the 'id' from useParams() instead of router.query
  const { id } = useParams<{ id: string }>()
  
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // 3. In Vite, we don't need 'isReady', just check if id exists
    if (id) {
      const fetchClient = async () => {
        const { data } = await supabase
          .from('clients')
          .select('*')
          .eq('id', id)
          .single()
          
        if (data) setClient(data)
        setLoading(false)
      }
      fetchClient()
    }
  }, [id])

  const updateClientStatus = async (newStatus: string) => {
    if (!id) return
    setSaving(true)
    const { error } = await supabase
      .from('clients')
      .update({ status: newStatus })
      .eq('id', id)

    if (!error) {
      setClient((prev: any) => ({ ...prev, status: newStatus }))
      window.dispatchEvent(new Event('refresh-metrics'))
    }
    setSaving(false)
  }

  if (loading) return (
    <DashboardLayout>
      <div className="p-20 text-center text-gray-500 animate-pulse font-mono tracking-[0.3em] text-xs">
        DECRYPTING_CLIENT_DATA...
      </div>
    </DashboardLayout>
  )

  if (!client) return (
    <DashboardLayout>
      <div className="p-20 text-center text-red-400 font-mono text-sm">
        [ERROR] CLIENT_NOT_FOUND_IN_DATABASE
      </div>
    </DashboardLayout>
  )

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        
        {/* 4. Use 'to' instead of 'href' for the Link component */}
        <Link to="/dashboard">
          <Button 
            variant="ghost" 
            className="text-gray-500 hover:text-white hover:bg-white/5 gap-2 p-0 px-3 transition-all rounded-full border border-transparent hover:border-gray-800"
          >
            <ArrowLeft size={14} /> Return to Intelligence
          </Button>
        </Link>

        <div className="bg-[#1C1E24] border border-gray-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800/50 pb-10 gap-8 relative z-10">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-[#141E30] rounded-[2rem] flex items-center justify-center border border-gray-700 shadow-2xl">
                  <User size={40} className="text-blue-500" />
                </div>
                <div>
                  <h1 className="text-5xl font-black text-white tracking-tighter mb-2">{client.name}</h1>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-blue-500/5 text-blue-400 border-blue-500/20 font-mono text-[10px] px-3">
                      {client.onboarding_stage || 'PENDING'}
                    </Badge>
                    <span className="text-gray-600 font-mono text-[10px] tracking-tighter uppercase">
                      Reference: {id?.slice(0, 12) || 'ANALYZING...'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 p-1 bg-black/20 rounded-2xl border border-gray-800/50">
                {['In Progress', 'Blocked', 'Completed'].map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant="ghost"
                    onClick={() => updateClientStatus(status)}
                    disabled={saving}
                    className={`rounded-xl text-[11px] font-bold px-4 transition-all ${
                      client.status === status 
                        ? status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                          status === 'Blocked' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-400'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {saving && client.status === status && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                    {status}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mt-12 relative z-10">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] mb-6">Database Metadata</h3>
                  <div className="space-y-6">
                    <div className="group">
                      <p className="text-[10px] text-gray-600 uppercase font-black mb-1.5">Primary Email</p>
                      <div className="flex items-center gap-3 text-gray-200 font-medium truncate">
                        <Mail size={16} className="text-gray-700" /> {client.email}
                      </div>
                    </div>
                    <div className="group">
                      <p className="text-[10px] text-gray-600 uppercase font-black mb-1.5">Direct Line</p>
                      <div className="flex items-center gap-3 text-gray-200 font-mono text-sm tracking-tight">
                        <Phone size={16} className="text-gray-700" /> {client.phone || 'UNAVAILABLE'}
                      </div>
                    </div>
                    <div className="group">
                      <p className="text-[10px] text-gray-600 uppercase font-black mb-1.5">Origin Date</p>
                      <div className="flex items-center gap-3 text-gray-400 font-medium">
                        <Calendar size={16} className="text-gray-700" /> 
                        {client.created_at ? new Date(client.created_at).toLocaleDateString(undefined, { dateStyle: 'full' }) : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 h-full">
                <div className="bg-black/20 rounded-[2rem] border border-gray-800 p-8 flex flex-col h-full shadow-inner ring-1 ring-white/5 group">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Session Notes</h3>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="text-[9px] text-gray-600 font-mono">AUTOSAVE_ACTIVE</span>
                       <Save size={12} className="text-blue-500" />
                    </div>
                  </div>
                  <textarea 
                    className="w-full bg-transparent border-none text-gray-300 text-sm focus:ring-0 resize-none h-48 leading-relaxed scrollbar-hide"
                    placeholder="Draft encrypted intelligence or deployment notes here..."
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </DashboardLayout>
  )
}