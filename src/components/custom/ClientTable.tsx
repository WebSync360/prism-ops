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
  Archive, ExternalLink, User 
} from "lucide-react"

export default function ClientTable() {
  const [clients, setClients] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setClients(data)
    setLoading(false)
  }

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

  const deleteClient = async (id: string) => {
    if (!confirm("Are you sure? This will permanently remove this client.")) return
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

  if (loading) return <div className="text-gray-500 animate-pulse py-10 text-center italic font-mono uppercase tracking-widest text-xs">Accessing encrypted ledger...</div>

  return (
    <div className="space-y-4">
      <div className="relative group max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={16} />
        <Input 
          placeholder="Filter by identity or endpoint..." 
          className="bg-[#1C1E24] border-gray-800 pl-10 text-white focus:ring-1 focus:ring-blue-500 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-2xl border border-gray-800 bg-[#1C1E24] overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-[#141E30]/50">
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] py-5">Client Identity</TableHead>
              <TableHead className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">Contact Point</TableHead>
              <TableHead className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">Flow Stage</TableHead>
              <TableHead className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">Status</TableHead>
              <TableHead className="text-right text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] pr-6">Commands</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id} className="border-gray-800 hover:bg-[#141E30]/80 transition-colors group/row">
                <TableCell className="py-4">
                  {/* FIX 1: Applied className to Link directly, removed nested <a> */}
                  <Link 
                    to={`/dashboard/clients/${client.id}`}
                    className="group/link inline-block"
                  >
                    <div className="font-bold text-white tracking-tight group-hover/link:text-blue-400 transition-colors flex items-center gap-2">
                      {client.name}
                      <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity text-blue-400" />
                    </div>
                  </Link>
                  <div className="text-[9px] text-gray-600 font-mono mt-1 uppercase tracking-tighter">
                      REF: {client.id.slice(0, 8)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-300 font-medium">{client.email}</div>
                  <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-1 font-mono">
                    <Phone size={10} className="text-blue-900" /> {client.phone || 'NONE'}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-500/5 text-blue-400 border-blue-500/20 text-[10px] font-black tracking-widest px-2 py-0">
                    {client.onboarding_stage || 'DOCS'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {updatingId === client.id ? (
                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        client.status === 'Completed' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                        client.status === 'Blocked' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' :
                        'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                      }`} />
                      <span className="text-[11px] font-bold text-gray-200">{client.status}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#1C1E24] border-gray-800 text-white shadow-2xl min-w-[180px]">
                      <DropdownMenuLabel className="text-gray-500 text-[10px] uppercase tracking-[0.15em]">Management</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-800" />
                      
                      {/* FIX 2: Using 'asChild' on DropdownMenuItem so it converts the Link into a menu item correctly */}
                      <DropdownMenuItem asChild className="gap-2 cursor-pointer focus:bg-blue-500/10 focus:text-blue-400">
                        <Link to={`/dashboard/clients/${client.id}`}>
                          <User size={14} /> Intelligence Profile
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-gray-800" />

                      <DropdownMenuItem onClick={() => updateStatus(client.id, 'In Progress')} className="gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Mark: In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(client.id, 'Blocked')} className="gap-2 text-red-400 focus:text-red-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Mark: Blocked
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(client.id, 'Completed')} className="gap-2 text-green-400 focus:text-green-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Mark: Completed
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator className="bg-gray-800" />
                      
                      <DropdownMenuItem onClick={() => deleteClient(client.id)} className="gap-2 text-red-600 focus:bg-red-950/30 focus:text-red-500">
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
          <div className="text-center py-24 bg-[#1C1E24]">
             <p className="text-gray-600 text-sm font-mono tracking-widest uppercase">Zero records found</p>
          </div>
        )}
      </div>
    </div>
  )
}