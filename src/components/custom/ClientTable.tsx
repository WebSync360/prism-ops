import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
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
import { MoreHorizontal, Loader2 } from "lucide-react"

export default function ClientTable() {
  const [clients, setClients] = useState<any[]>([])
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
      // Optimistic update: change local state immediately so it feels fast
      setClients(clients.map(c => c.id === id ? { ...c, status: newStatus } : c))
    }
    setUpdatingId(null)
  }

  useEffect(() => {
    fetchClients()
  }, [])

  if (loading) return <div className="text-gray-500 animate-pulse">Loading data stream...</div>

  return (
    <div className="rounded-md border border-gray-800 bg-[#1C1E24]">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800 hover:bg-transparent">
            <TableHead className="text-gray-400">Client Name</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
            <TableHead className="text-gray-400 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="border-gray-800 hover:bg-[#141E30]">
              <TableCell className="font-medium text-white">
                <div>{client.name}</div>
                <div className="text-xs text-gray-500">{client.email}</div>
              </TableCell>
              <TableCell>
                {updatingId === client.id ? (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                ) : (
                  <Badge className={
                    client.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    client.status === 'Blocked' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                    'bg-blue-500/10 text-blue-500 border-blue-500/20'
                  }>
                    {client.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#1C1E24] border-gray-800 text-white">
                    <DropdownMenuLabel className="text-gray-400">Change Status</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem onClick={() => updateStatus(client.id, 'In Progress')}>
                      In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateStatus(client.id, 'Blocked')} className="text-red-400">
                      Blocked
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateStatus(client.id, 'Completed')} className="text-green-400">
                      Completed
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}