import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link' // <--- Crucial for navigation
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
import { MoreHorizontal, Loader2, Phone, Search, Archive, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react"

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

  if (loading) return <div className="text-gray-500 animate-pulse py-10 text-center italic">Syncing spreadsheet data...</div>

  return (
    <div className="space-y-4">
      <div className="relative group max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#35577D] transition-colors" size={16} />
        <Input 
          placeholder="Quick search (name or email)..." 
          className="bg-[#1C1E24] border-gray-800 pl-10 text-white focus:border-[#35577D] transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-xl border border-gray-800 bg-[#1C1E24] overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-[#141E30]/50">
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Client Identity</TableHead>
              <TableHead className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Contact Point</TableHead>
              <TableHead className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Onboarding Stage</TableHead>
              <TableHead className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Status</TableHead>
              <TableHead className="text-right text-gray-500 font-bold uppercase text-[10px] tracking-widest">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id} className="border-gray-800 hover:bg-[#141E30]/80 transition-colors group/row">
                <TableCell>
                  {/* WRAPPED IN LINK TO PROFILE PAGE */}
                  <Link href={`/dashboard/clients/${client.id}`} className="group/link block">
                    <div className="font-semibold text-white tracking-tight group-hover/link:text-blue-400 transition-colors flex items-center gap-2">
                      {client.name}
                      <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                     UID: {client.id.slice(0, 8)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-300">{client.email}</div>
                  <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-1 font-mono">
                    <Phone size={10} className="text-[#35577D]" /> {client.phone || '--'}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-[#35577D]/10 text-[#64B5F6] border-[#35577D]/30 text-[10px] uppercase font-bold px-2 py-0">
                    {client.onboarding_stage || 'Docs'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {updatingId === client.id ? (
                    <Loader2 className="h-4 w-4 animate-spin text-[#35577D]" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        client.status === 'Completed' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' :
                        client.status === 'Blocked' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                        'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                      }`} />
                      <span className="text-xs text-white">{client.status}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-white hover:bg-gray-800">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#1C1E24] border-gray-800 text-white shadow-2xl">
                      <DropdownMenuLabel className="text-gray-400 text-[10px] uppercase tracking-widest">Update Lifecycle</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-800" />
                      
                      <Link href={`/dashboard/clients/${client.id}`}>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <User size={14} className="text-gray-400" /> View Detailed Profile
                        </DropdownMenuItem>
                      </Link>

                      <DropdownMenuSeparator className="bg-gray-800" />

                      <DropdownMenuItem onClick={() => updateStatus(client.id, 'In Progress')} className="gap-2">
                        <Loader2 size={14} className="text-blue-500" /> Mark: In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(client.id, 'Blocked')} className="gap-2 text-red-400">
                        <AlertCircle size={14} className="text-red-500" /> Mark: Blocked
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(client.id, 'Completed')} className="gap-2 text-green-400">
                        <CheckCircle2 size={14} className="text-green-500" /> Mark: Completed
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-800" />
                      <DropdownMenuItem onClick={() => deleteClient(client.id)} className="gap-2 text-red-600 focus:bg-red-950 focus:text-red-400">
                        <Archive size={14} /> Archive Forever
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredClients.length === 0 && (
          <div className="text-center py-20 bg-[#1C1E24]">
             <p className="text-gray-600 text-sm italic">No entries match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}