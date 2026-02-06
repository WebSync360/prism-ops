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

export default function ClientTable() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setClients(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchClients()
  }, [])

  if (loading) return <div className="text-gray-500">Loading data stream...</div>

  return (
    <div className="rounded-md border border-gray-800 bg-[#1C1E24]">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800 hover:bg-transparent">
            <TableHead className="text-gray-400">Client Name</TableHead>
            <TableHead className="text-gray-400">Email</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
            <TableHead className="text-gray-400 text-right">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="border-gray-800 hover:bg-[#141E30]">
              <TableCell className="font-medium text-white">{client.name}</TableCell>
              <TableCell className="text-gray-400">{client.email}</TableCell>
              <TableCell>
                <Badge className={
                  client.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                  client.status === 'Blocked' ? 'bg-red-500/10 text-red-500' :
                  'bg-blue-500/10 text-blue-500'
                }>
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-gray-500 text-xs">
                {new Date(client.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
          {clients.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10 text-gray-600">
                No clients found. Add your first one above.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}