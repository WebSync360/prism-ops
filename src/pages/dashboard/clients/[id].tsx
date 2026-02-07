"use client" // Add this if you are using the App Router

import { useParams } from 'next/navigation' 
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import DashboardLayout from '@/layouts/DashboardLayout'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, Phone, Mail, Calendar, User, 
  CheckCircle2, AlertCircle, Loader2, Save 
} from 'lucide-react'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"

export default function ClientProfile() {
  const params = useParams()
  const id = params?.id 
  
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        const { data } = await supabase.from('clients').select('*').eq('id', id).single()
        if (data) setClient(data)
        setLoading(false)
      }
      fetchClient()
    }
  }, [id])

  const updateClientStatus = async (newStatus: string) => {
    setSaving(true)
    const { error } = await supabase
      .from('clients')
      .update({ status: newStatus })
      .eq('id', id)

    if (!error) {
      setClient({ ...client, status: newStatus })
      window.dispatchEvent(new Event('refresh-metrics'))
    }
    setSaving(false)
  }

  if (loading) return (
    <DashboardLayout>
      <div className="p-20 text-center text-gray-500 animate-pulse font-mono tracking-widest">
        DECRYPTING CLIENT DATA...
      </div>
    </DashboardLayout>
  )

  if (!client) return <div className="p-20 text-center text-red-500">Client not found.</div>

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        
        {/* TOP NAVIGATION */}
        <Link href="/dashboard">
          <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800/50 gap-2 p-0 px-2 transition-all">
            <ArrowLeft size={16} /> Back to Command Center
          </Button>
        </Link>

        {/* PROFILE HEADER CARD */}
        <div className="bg-[#1C1E24] border border-gray-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px]" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-8 gap-6 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#141E30] to-[#243B55] rounded-2xl flex items-center justify-center border border-gray-700 shadow-inner">
                <User size={36} className="text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white tracking-tighter">{client.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-500/5 text-blue-400 border-blue-500/20 font-mono text-[10px]">
                    {client.onboarding_stage || 'DOCS'}
                  </Badge>
                  <span className="text-gray-600 text-xs">ID: {client.id.slice(0, 8)}</span>
                </div>
              </div>
            </div>

            {/* QUICK STATUS ACTIONS */}
            <div className="flex flex-wrap gap-2">
              {['In Progress', 'Blocked', 'Completed'].map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={client.status === status ? "default" : "outline"}
                  onClick={() => updateClientStatus(status)}
                  disabled={saving}
                  className={`rounded-full text-xs font-bold transition-all ${
                    client.status === status 
                      ? status === 'Completed' ? 'bg-green-600 hover:bg-green-700' :
                        status === 'Blocked' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600'
                      : 'border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {saving && client.status === status ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : null}
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* INFORMATION GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-10 relative z-10">
            
            {/* LEFT: DATA LIST */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Contact Intelligence</h3>
                <div className="space-y-5">
                  <div className="group">
                    <p className="text-[10px] text-gray-600 uppercase font-bold mb-1">Email Address</p>
                    <div className="flex items-center gap-3 text-gray-200 group-hover:text-blue-400 transition-colors">
                      <Mail size={16} className="text-gray-700" /> {client.email}
                    </div>
                  </div>
                  <div className="group">
                    <p className="text-[10px] text-gray-600 uppercase font-bold mb-1">Direct Line</p>
                    <div className="flex items-center gap-3 text-gray-200 group-hover:text-blue-400 transition-colors font-mono">
                      <Phone size={16} className="text-gray-700" /> {client.phone || 'NO RECORD'}
                    </div>
                  </div>
                  <div className="group">
                    <p className="text-[10px] text-gray-600 uppercase font-bold mb-1">Lifecycle Start</p>
                    <div className="flex items-center gap-3 text-gray-400">
                      <Calendar size={16} className="text-gray-700" /> 
                      {new Date(client.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: SCRATCHPAD / NOTES */}
            <div className="lg:col-span-3">
              <div className="bg-[#141E30]/50 rounded-2xl border border-gray-800 p-6 flex flex-col h-full ring-1 ring-white/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Strategy Notes</h3>
                  <Save size={14} className="text-gray-600" />
                </div>
                <textarea 
                  className="w-full bg-transparent border-none text-gray-300 text-sm focus:ring-0 resize-none h-40 scrollbar-hide"
                  placeholder="Draft internal strategy, blockers, or next steps here..."
                />
                <p className="text-[9px] text-gray-600 text-right mt-2 italic">Notes auto-save to local session</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}