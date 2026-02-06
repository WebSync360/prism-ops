import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Plus } from 'lucide-react'

export default function AddClientSheet({ onClientAdded }: { onClientAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'In Progress'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('clients')
      .insert([formData])

    if (error) {
      alert(error.message)
    } else {
      setOpen(false)
      setFormData({ name: '', email: '', status: 'In Progress' })
      onClientAdded() // This refreshes your dashboard list
    }
    setLoading(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-[#35577D] hover:bg-[#2a4563] text-white space-x-2">
          <Plus size={18} />
          <span>Add Client</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[#1C1E24] border-gray-800 text-[#DCDAD9]">
        <SheetHeader>
          <SheetTitle className="text-white">New Client Entry</SheetTitle>
          <SheetDescription className="text-gray-400">
            Add a new client to your pipeline. This updates your snapshot instantly.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div className="space-y-2">
            <Label htmlFor="name">Client Name</Label>
            <Input 
              id="name" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-[#141E30] border-gray-700 text-white" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Contact Email</Label>
            <Input 
              id="email" 
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-[#141E30] border-gray-700 text-white" 
            />
          </div>

          <div className="space-y-2">
            <Label>Current Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(val) => setFormData({...formData, status: val})}
            >
              <SelectTrigger className="bg-[#141E30] border-gray-700 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1C1E24] border-gray-700 text-white">
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Blocked">Blocked</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-[#35577D] hover:bg-[#2a4563]" disabled={loading}>
            {loading ? 'Saving...' : 'Deploy Client Entry'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}