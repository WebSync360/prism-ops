import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Link } from 'react-router-dom'
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
  Archive, ExternalLink, User, Layers
} from "lucide-react"

export default function ClientTable() {
  const [clients, setClients] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  // 1. DATA FETCHING
  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setClients(data)
    setLoading(false)
  }

  // 2. LOGIC: UPDATE STATUS (In Progress, Blocked, etc.)
  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id)
    const { error } = await supabase
      .from('clients')
      .update({ status: newStatus })
      .eq('id', id)

    if (!error) {
      setClients(clients.map(c => c.id === id ? { ...c, status: newStatus } : c))
      window.dispatchEvent(new Event('refresh-metrics'))
    }
    setUpdatingId(null)
  }

  // 3. LOGIC: UPDATE STAGE (Docs, Setup, Testing, Live)
  const updateStage = async (id: string, newStage: string) => {
    setUpdatingId(id)
    const { error } = await supabase
      .from('clients')
      .update({ onboarding_stage: newStage })
      .eq('id', id)

    if (!error) {
      setClients(clients.map(c => c.id === id ? { ...c, onboarding_stage: newStage } : c))
      window.dispatchEvent(new Event('refresh-metrics'))
    }
    setUpdatingId(null)
  }

  // 4. LOGIC: DELETE CLIENT
  const deleteClient = async (id: string) => {
    if (!confirm("This will permanently wipe this record. Proceed?")) return
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
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <Loader2 className="animate-spin text-blue-500" size={24} />
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Syncing_Ledger...</span>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* SEARCH BAR - INDUSTRIAL STYLE */}
      <div className="relative group max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-500 transition-colors" size={14} />
        <Input 
          placeholder="FILTER BY IDENTITY OR ENDPOINT..." 
          className="bg-white/[0.02] border-white/10 rounded-none pl-12 h-12 text-[10px] tracking-widest text-white uppercase placeholder:text-gray-800 focus:border-blue-500/50 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* THE TABLE */}
      <div className="rounded-none border border-white/5 bg-[#0A0C10] overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-white/[0.02] border-b border-white/5">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="text-gray-600 font-black uppercase text-[9px] tracking-[0.2em] h-14 pl-6">Client Identity</TableHead>
              <TableHead className="text-gray-600 font-black uppercase text-[9px] tracking-[0.2em]">Contact Point</TableHead>
              <TableHead className="text-gray-600 font-black uppercase text-[9px] tracking-[0.2em]">Current Stage</TableHead>
              <TableHead className="text-gray-600 font-black uppercase text-[9px] tracking-[0.2em]">Ops Status</TableHead>
              <TableHead className="text-right text-gray-600 font-black uppercase text-[9px] tracking-[0.2em] pr-8">Commands</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id} className="border-white/5 hover:bg-white/[0.01] transition-colors group/row">
                <TableCell className="py-6 pl-6">
                  <Link to={`/dashboard/clients/${client.id}`} className="group/link inline-block">
                    <div className="font-black text-white text-xs uppercase tracking-tighter group-hover/link:text-blue-400 transition-colors flex items-center gap-2">
                      {client.name}
                      <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity text-blue-500" />
                    </div>
                  </Link>
                  <div className="text-[8px] text-gray-700 font-mono mt-1 uppercase tracking-widest">
                    ID_REF: {client.id.slice(0, 8)}
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="text-[10px] text-gray-400 font-bold tracking-tight uppercase">{client.email}</div>
                  <div className="text-[9px] text-gray-600 flex items-center gap-1 mt-1 font-mono">
                    <Phone size={10} className="text-blue-900" /> {client.phone || 'NO_LINK'}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className="bg-blue-500/5 text-blue-400 border-blue-500/20 text-[9px] font-black tracking-widest px-2 py-0.5 rounded-none border">
                    {client.onboarding_stage || 'DOCS'}
                  </Badge>
                </TableCell>

                <TableCell>
                  {updatingId === client.id ? (
                    <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <div className={`w-1 h-1 rounded-full ${
                        client.status === 'Completed' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' :
                        client.status === 'Blocked' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' :
                        'bg-blue-500 shadow-[0_0_8px_#3b82f6]'
                      }`} />
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{client.status}</span>
                    </div>
                  )}
                </TableCell>

                <TableCell className="text-right pr-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-gray-700 hover:text-white hover:bg-white/5 rounded-none">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent align="end" className="bg-[#0A0C10] border-white/10 text-white shadow-2xl min-w-[200px] rounded-none p-2 font-sans">
                      <DropdownMenuLabel className="text-gray-600 text-[8px] uppercase tracking-[0.3em] px-2 py-2">Node Controls</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white/5" />
                      
                      <DropdownMenuItem asChild className="gap-3 cursor-pointer focus:bg-blue-600 focus:text-white rounded-none py-3 text-[10px] font-bold uppercase tracking-widest">
                        <Link to={`/dashboard/clients/${client.id}`}>
                          <User size={14} /> Open Intel Profile
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-white/5" />

                      {/* STAGE MIGRATION SECTION */}
                      <DropdownMenuLabel className="text-gray-600 text-[8px] uppercase tracking-[0.3em] px-2 py-2">Migrate Stage</DropdownMenuLabel>
                      {['Docs', 'Setup', 'Testing', 'Live'].map((stage) => (
                        <DropdownMenuItem 
                          key={stage} 
                          onClick={() => updateStage(client.id, stage)}
                          className={`gap-3 cursor-pointer rounded-none text-[10px] font-bold uppercase tracking-widest py-2.5 ${client.onboarding_stage === stage ? 'text-blue-400 bg-blue-500/5' : 'text-gray-500 focus:bg-white/5'}`}
                        >
                          <div className={`w-1 h-1 rounded-full ${client.onboarding_stage === stage ? 'bg-blue-400 shadow-[0_0_8px_#3b82f6]' : 'bg-gray-800'}`} />
                          {stage}
                        </DropdownMenuItem>
                      ))}

                      <DropdownMenuSeparator className="bg-white/5" />

                      {/* OPS STATUS SECTION */}
                      <DropdownMenuLabel className="text-gray-600 text-[8px] uppercase tracking-[0.3em] px-2 py-2">System Status</DropdownMenuLabel>
                      {['In Progress', 'Blocked', 'Completed'].map((stat) => (
                        <DropdownMenuItem 
                          key={stat}
                          onClick={() => updateStatus(client.id, stat)}
                          className="gap-3 cursor-pointer text-[10px] font-bold uppercase tracking-widest text-gray-500 focus:bg-white/5 py-2.5"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            stat === 'Completed' ? 'bg-green-500' : stat === 'Blocked' ? 'bg-red-500' : 'bg-blue-500'
                          }`} />
                          {stat}
                        </DropdownMenuItem>
                      ))}
                      
                      <DropdownMenuSeparator className="bg-white/5" />
                      
                      <DropdownMenuItem onClick={() => deleteClient(client.id)} className="gap-3 cursor-pointer text-gray-600 focus:bg-red-600 focus:text-white py-3 text-[10px] font-bold uppercase tracking-widest transition-colors">
                        <Archive size={14} /> Wipe Record
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredClients.length === 0 && (
          <div className="text-center py-32 bg-[#0A0C10]">
             <p className="text-gray-800 text-[10px] font-black tracking-[0.5em] uppercase">No_Data_Streams_Detected</p>
          </div>
        )}
      </div>
    </div>
  )
}