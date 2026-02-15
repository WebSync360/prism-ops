import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Link, useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  MoreHorizontal, Loader2, Phone, Search, 
  Archive, User, ShieldAlert, Cpu, Activity,
  ChevronRight, Zap
} from "lucide-react"

export default function ClientTable() {
  const [clients, setClients] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [userIsPro, setUserIsPro] = useState(false)
  const navigate = useNavigate()

  const CLIENT_LIMIT = 50

  const fetchClients = async () => {
    setLoading(true)
    
    // 1. Fetch Client Nodes
    const { data: clientData, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    // 2. Fetch User Pro Status
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro')
      .single()
      
    if (!error) setClients(clientData || [])
    if (profile) setUserIsPro(profile.is_pro)
    setLoading(false)
  }

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id)
    const { error } = await supabase.from('clients').update({ status: newStatus }).eq('id', id)
    if (!error) {
      setClients(clients.map(c => c.id === id ? { ...c, status: newStatus } : c))
      window.dispatchEvent(new Event('refresh-metrics'))
    }
    setUpdatingId(null)
  }

  const updateStage = async (id: string, newStage: string) => {
    setUpdatingId(id)
    const { error } = await supabase.from('clients').update({ onboarding_stage: newStage }).eq('id', id)
    if (!error) {
      setClients(clients.map(c => c.id === id ? { ...c, onboarding_stage: newStage } : c))
      window.dispatchEvent(new Event('refresh-metrics'))
    }
    setUpdatingId(null)
  }

  const deleteClient = async (id: string) => {
    if (!confirm("Confirm: De-list this node from the global ledger?")) return
    const { error } = await supabase.from('clients').delete().eq('id', id)
    if (!error) {
      setClients(clients.filter(c => c.id !== id))
      window.dispatchEvent(new Event('refresh-metrics'))
    }
  }

  useEffect(() => {
    fetchClients()
    const handleRefresh = () => fetchClients()
    window.addEventListener('refresh-metrics', handleRefresh)
    return () => window.removeEventListener('refresh-metrics', handleRefresh)
  }, [])

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-4">
      <div className="relative">
        <Loader2 className="animate-spin text-blue-500" size={32} strokeWidth={1} />
        <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500/30" size={12} />
      </div>
      <span className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-700 animate-pulse">Syncing_Active_Nodes...</span>
    </div>
  )

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      
      {/* HUD: TOP COMMAND BAR */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-500 transition-colors" size={14} />
          <Input 
            placeholder="SEARCH_IDENTITY_REF..." 
            className="bg-white/[0.02] border-white/10 rounded-none pl-12 h-11 text-[10px] tracking-widest text-white uppercase placeholder:text-gray-800 focus:border-blue-500/30 transition-all font-mono"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* SYSTEM CAPACITY TRACKER */}
        <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-2 pr-4 h-11">
          <div className="flex flex-col items-end px-3 border-r border-white/5">
            <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Active_Nodes</span>
            <span className={`text-[11px] font-black ${clients.length >= CLIENT_LIMIT && !userIsPro ? 'text-red-500' : 'text-blue-400'}`}>
              {clients.length} <span className="text-[8px] text-gray-700 mx-1">/</span> {userIsPro ? '∞' : CLIENT_LIMIT}
            </span>
          </div>
          {!userIsPro && (
            <Button 
              onClick={() => navigate('/dashboard/billing')}
              className="h-7 bg-blue-600 hover:bg-blue-500 text-[9px] font-black uppercase tracking-tighter px-3 rounded-none flex items-center gap-2"
            >
              <Zap size={10} fill="currentColor" /> Scale_Cap
            </Button>
          )}
        </div>
      </div>

      {/* PRIMARY DATA LEDGER */}
      <div className="rounded-none border border-white/5 bg-[#0A0C10] overflow-hidden shadow-2xl relative">
        <Table>
          <TableHeader className="bg-white/[0.02] border-b border-white/5">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="text-gray-600 font-black uppercase text-[9px] tracking-[0.3em] h-14 pl-6">Entity_Header</TableHead>
              <TableHead className="text-gray-600 font-black uppercase text-[9px] tracking-[0.3em]">Lifecycle_Stage</TableHead>
              <TableHead className="text-gray-600 font-black uppercase text-[9px] tracking-[0.3em]">Operational_Status</TableHead>
              <TableHead className="text-right text-gray-600 font-black uppercase text-[9px] tracking-[0.3em] pr-8">System_Commands</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id} className="border-white/5 hover:bg-white/[0.01] transition-colors group/row">
                {/* ENTITY INFO */}
                <TableCell className="py-5 pl-6">
                  <Link to={`/dashboard/clients/${client.id}`} className="group/link flex items-center gap-4">
                    <div className="h-9 w-9 bg-blue-500/5 border border-white/5 flex items-center justify-center text-blue-500 group-hover/link:border-blue-500/50 transition-all">
                      <Cpu size={14} />
                    </div>
                    <div>
                      <div className="font-black text-white text-[11px] uppercase tracking-tighter group-hover/link:text-blue-400 transition-colors">
                        {client.name}
                      </div>
                      <div className="text-[8px] text-gray-700 font-mono uppercase tracking-widest">{client.email}</div>
                    </div>
                  </Link>
                </TableCell>

                {/* ONBOARDING STAGE */}
                <TableCell>
                  <Badge className="bg-blue-500/5 text-blue-400 border-blue-500/20 text-[8px] font-black tracking-[0.2em] px-2 py-0.5 rounded-none border uppercase">
                    {client.onboarding_stage || 'INIT_LINK'}
                  </Badge>
                </TableCell>

                {/* OPERATIONAL STATUS */}
                <TableCell>
                  {updatingId === client.id ? (
                    <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        client.status === 'Completed' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' :
                        client.status === 'Blocked' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' :
                        'bg-blue-500 shadow-[0_0_8px_#3b82f6]'
                      } ${client.status === 'Blocked' ? 'animate-pulse' : ''}`} />
                      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                        {client.status || 'ACTIVE'}
                      </span>
                    </div>
                  )}
                </TableCell>

                {/* COMMAND ACTIONS */}
                <TableCell className="text-right pr-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-gray-700 hover:text-white hover:bg-white/5 rounded-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent align="end" className="bg-[#0A0C10] border-white/10 text-white shadow-2xl min-w-[200px] rounded-none p-1 border-t-2 border-t-blue-600 font-sans">
                      <DropdownMenuLabel className="text-gray-600 text-[8px] uppercase tracking-[0.3em] px-2 py-2 text-center">Protocol_Access</DropdownMenuLabel>
                      
                      <DropdownMenuItem asChild className="gap-2 cursor-pointer focus:bg-blue-600 rounded-none py-2.5 text-[9px] font-bold uppercase tracking-widest">
                        <Link to={`/dashboard/clients/${client.id}`}>
                          <User size={12} /> Open Intel Profile
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-white/5" />
                      
                      {/* Lifecycle Stage Selection */}
                      <DropdownMenuLabel className="text-gray-500 text-[7px] uppercase tracking-[0.2em] px-2 py-1.5">Lifecycle_Stage</DropdownMenuLabel>
                      {['Docs', 'Setup', 'Testing', 'Live'].map((stage) => (
                        <DropdownMenuItem 
                          key={stage} 
                          onClick={() => updateStage(client.id, stage)}
                          className={`gap-2 cursor-pointer rounded-none text-[9px] font-bold uppercase py-2 ${client.onboarding_stage === stage ? 'text-blue-400 bg-blue-500/5' : 'hover:bg-white/5'}`}
                        >
                          <div className={`w-1 h-1 ${client.onboarding_stage === stage ? 'bg-blue-500 shadow-[0_0_5px_#3b82f6]' : 'bg-gray-800'}`} />
                          {stage}
                        </DropdownMenuItem>
                      ))}

                      <DropdownMenuSeparator className="bg-white/5" />

                      {/* Operational Status Selection */}
                      <DropdownMenuLabel className="text-gray-500 text-[7px] uppercase tracking-[0.2em] px-2 py-1.5">System_Status</DropdownMenuLabel>
                      {[
                        { label: 'In Progress', color: 'bg-blue-500' },
                        { label: 'Blocked', color: 'bg-red-500' },
                        { label: 'Completed', color: 'bg-green-500' }
                      ].map((status) => (
                        <DropdownMenuItem 
                          key={status.label} 
                          onClick={() => updateStatus(client.id, status.label)}
                          className={`gap-2 cursor-pointer rounded-none text-[9px] font-bold uppercase py-2 ${client.status === status.label ? 'text-white bg-white/5 font-black' : 'text-gray-500 hover:bg-white/5'}`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${status.color} ${client.status === status.label ? 'animate-pulse' : 'opacity-30'}`} />
                          {status.label}
                        </DropdownMenuItem>
                      ))}
                      
                      <DropdownMenuSeparator className="bg-white/5" />
                      
                      <DropdownMenuItem onClick={() => deleteClient(client.id)} className="gap-2 cursor-pointer text-gray-600 focus:bg-red-900 focus:text-white py-2.5 text-[9px] font-bold uppercase">
                        <Archive size={12} /> De-list Node
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* EMPTY STATE */}
        {filteredClients.length === 0 && (
          <div className="text-center py-32 bg-white/[0.01] border-t border-white/5">
             <Activity className="mx-auto text-gray-900 mb-4 animate-pulse" size={24} />
             <p className="text-gray-800 text-[9px] font-black tracking-[0.5em] uppercase">No_Active_Signals_Detected</p>
          </div>
        )}
      </div>
    </div>
  )
}