import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'
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
import { Plus, Loader2, AlertCircle, Zap } from 'lucide-react'

export default function AddClientSheet({ onClientAdded }: { onClientAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isOverLimit, setIsOverLimit] = useState(false)
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'In Progress',
    onboarding_stage: 'Docs'
  })

  // Check if they have reached 50 clients
  const checkLimit = async () => {
    const { count } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro')
      .single()

    // If not pro and has 50 or more clients, show the "Buy Pro" message
    if (profile && !profile.is_pro && (count || 0) >= 50) {
      setIsOverLimit(true)
    } else {
      setIsOverLimit(false)
    }
  }

  useEffect(() => {
    if (open) checkLimit()
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    
    const { error } = await supabase
      .from('clients')
      .insert([{ ...formData, user_id: user?.id }])

    if (!error) {
      setOpen(false) // Close the sidebar
      setFormData({ name: '', email: '', phone: '', status: 'In Progress', onboarding_stage: 'Docs' })
      onClientAdded() // Refresh the table
    }
    setLoading(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md">
          <Plus size={18} className="mr-2" />
          Add New Client
        </Button>
      </SheetTrigger>
      
      <SheetContent className="bg-[#1C1E24] border-l border-gray-800 text-white sm:max-w-md">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-white text-xl font-bold">New Client Information</SheetTitle>
          <SheetDescription className="text-gray-400">
            Fill in the details to add a client to your dashboard.
          </SheetDescription>
        </SheetHeader>

        {isOverLimit ? (
          /* THIS SHOWS IF THEY REACHED 50 CLIENTS */
          <div className="space-y-6 py-10 text-center">
            <div className="flex justify-center text-yellow-500">
              <AlertCircle size={48} />
            </div>
            <h2 className="text-lg font-bold">Limit Reached (50/50)</h2>
            <p className="text-gray-400 text-sm">
              You have reached the free limit. Please upgrade to add more clients.
            </p>
            <Button 
              onClick={() => navigate('/dashboard/billing')}
              className="w-full bg-blue-600 hover:bg-blue-500 py-6"
            >
              <Zap size={16} className="mr-2 fill-current" /> Upgrade to Pro
            </Button>
          </div>
        ) : (
          /* THE NORMAL FORM */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-gray-400">Full Name</Label>
              <Input 
                required placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-[#141E30] border-gray-700 text-white" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400">Email Address</Label>
              <Input 
                type="email" required placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-[#141E30] border-gray-700 text-white" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400">Phone Number</Label>
              <Input 
                placeholder="+234..."
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-[#141E30] border-gray-700 text-white" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-400">Status</Label>
                <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
                  <SelectTrigger className="bg-[#141E30] border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1C1E24] border-gray-800 text-white">
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Blocked">Blocked</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400">Stage</Label>
                <Select value={formData.onboarding_stage} onValueChange={(val) => setFormData({...formData, onboarding_stage: val})}>
                  <SelectTrigger className="bg-[#141E30] border-gray-700">
                    <SelectValue />
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
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 mt-4 font-bold" 
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Add Client'}
            </Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  )
}