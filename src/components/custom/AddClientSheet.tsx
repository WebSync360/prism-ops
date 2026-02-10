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
import { Plus, Phone, Mail, User, Activity } from 'lucide-react'

export default function AddClientSheet({ onClientAdded }: { onClientAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'In Progress',
    onboarding_stage: 'Docs'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Identify the current founder session
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        alert("Authentication Error: Please sign in again.")
        return
      }

      // 2. Insert record with the user_id (Ownership Link)
      const { error } = await supabase
        .from('clients')
        .insert([
          { 
            ...formData, 
            user_id: user.id 
          }
        ])

      if (error) {
        alert("Database Error: " + error.message)
      } else {
        // Success: Reset and Close
        setOpen(false)
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          status: 'In Progress', 
          onboarding_stage: 'Docs' 
        })
        onClientAdded() // Triggers the dashboard refresh
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      alert("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-[#35577D] hover:bg-[#2a4563] text-white shadow-[0_0_15px_rgba(53,87,125,0.4)]">
          <Plus size={18} className="mr-2" />
          <span>New Client</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[#1C1E24] border-gray-800 text-[#DCDAD9] sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-white text-xl">Add to Command Center</SheetTitle>
          <SheetDescription className="text-gray-400">
            Enter client details below. All dashboard sections will update automatically.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          {/* Client Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-400 flex items-center gap-2">
              <User size={14} /> Full Name
            </Label>
            <Input 
              id="name" 
              required
              placeholder="e.g. John Smith"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-[#141E30] border-gray-700 text-white focus:border-[#35577D]" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-400 flex items-center gap-2">
                <Mail size={14} /> Email
              </Label>
              <Input 
                id="email" 
                type="email"
                required
                placeholder="client@company.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-[#141E30] border-gray-700 text-white focus:border-[#35577D]" 
              />
            </div>
            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-400 flex items-center gap-2">
                <Phone size={14} /> Phone
              </Label>
              <Input 
                id="phone" 
                placeholder="+1..."
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-[#141E30] border-gray-700 text-white focus:border-[#35577D]" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Status Dropdown */}
            <div className="space-y-2">
              <Label className="text-gray-400 font-medium">Pipeline Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(val) => setFormData({...formData, status: val})}
              >
                <SelectTrigger className="bg-[#141E30] border-gray-700 text-white focus:ring-1 focus:ring-blue-500">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1C1E24] border-gray-800 text-white">
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Onboarding Stage Dropdown */}
            <div className="space-y-2">
              <Label className="text-gray-400 flex items-center gap-2 font-medium">
                <Activity size={14} /> Onboarding Stage
              </Label>
              <Select 
                value={formData.onboarding_stage} 
                onValueChange={(val) => setFormData({...formData, onboarding_stage: val})}
              >
                <SelectTrigger className="bg-[#141E30] border-gray-700 text-white focus:ring-1 focus:ring-blue-500">
                  <SelectValue placeholder="Stage" />
                </SelectTrigger>
                <SelectContent className="bg-[#1C1E24] border-gray-800 text-white">
                  <SelectItem value="Docs">Docs</SelectItem>
                  <SelectItem value="Setup">Setup</SelectItem>
                  <SelectItem value="Testing">Testing</SelectItem>
                  <SelectItem value="Live">Live</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#35577D] hover:bg-[#2a4563] text-white h-12 mt-4 font-bold tracking-tight transition-all active:scale-[0.98]" 
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Syncing to Database...</span>
              </div>
            ) : 'Add to Pipeline'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}