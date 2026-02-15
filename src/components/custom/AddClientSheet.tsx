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
import { Plus, Phone, Mail, User, Activity, Zap, ShieldAlert, Cpu } from 'lucide-react'

export default function AddClientSheet({ onClientAdded }: { onClientAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkingLimit, setCheckingLimit] = useState(false)
  const [isOverLimit, setIsOverLimit] = useState(false)
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'In Progress',
    onboarding_stage: 'Docs'
  })

  // THE GATEKEEPER: Check if user can add more clients
  const checkSubscriptionLimits = async () => {
    setCheckingLimit(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // 1. Get current count
    const { count } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })

    // 2. Get Pro Status
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro')
      .single()

    if (profile && !profile.is_pro && (count || 0) >= 50) {
      setIsOverLimit(true)
    } else {
      setIsOverLimit(false)
    }
    setCheckingLimit(false)
  }

  // Check whenever the sheet opens
  useEffect(() => {
    if (open) checkSubscriptionLimits()
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("No User Found")

      const { error } = await supabase
        .from('clients')
        .insert([{ ...formData, user_id: user.id }])

      if (error) throw error

      setOpen(false)
      setFormData({ name: '', email: '', phone: '', status: 'In Progress', onboarding_stage: 'Docs' })
      onClientAdded() 
      
    } catch (err: any) {
      alert("System Error: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[10px] tracking-widest rounded-none h-11 px-6 transition-all shadow-lg shadow-blue-600/20">
          <Plus size={14} className="mr-2" strokeWidth={3} />
          <span>Initialize_Node</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent className="bg-[#0A0C10] border-white/5 text-white sm:max-w-md p-0 overflow-hidden">
        {/* Visual Header Accent */}
        <div className="h-1 w-full bg-blue-600" />
        
        <div className="p-8 space-y-8">
          <SheetHeader>
            <div className="h-10 w-10 bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-4">
              <Cpu size={20} />
            </div>
            <SheetTitle className="text-white font-black uppercase tracking-tighter text-2xl">Deploy_New_Node</SheetTitle>
            <SheetDescription className="text-gray-500 font-mono text-[10px] leading-relaxed uppercase tracking-widest">
              Establish a new intelligence stream in the global ledger.
            </SheetDescription>
          </SheetHeader>

          {checkingLimit ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="animate-spin text-blue-500" />
              <span className="text-[8px] font-black text-gray-700 tracking-[0.4em]">VERIFYING_CAPACITY...</span>
            </div>
          ) : isOverLimit ? (
            /* THE UPGRADE TRAP */
            <div className="bg-blue-500/5 border border-blue-500/10 p-6 space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="flex items-center gap-3 text-blue-400">
                <ShieldAlert size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Limit Reached</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                Your current operational capacity is capped at <span className="text-white">50 Nodes</span>. Upgrade to Pro to unlock unlimited deployments and AI-enhanced scaling.
              </p>
              <Button 
                onClick={() => navigate('/dashboard/billing')}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[10px] tracking-widest h-12 rounded-none"
              >
                <Zap size={12} className="mr-2 fill-current" /> Upgrade to Pro Tier
              </Button>
            </div>
          ) : (
            /* THE FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[9px] font-black uppercase tracking-widest text-gray-500">Entity_Identity</Label>
                <Input 
                  id="name" required placeholder="FULL NAME"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-white/[0.02] border-white/10 rounded-none h-12 text-[11px] text-white uppercase placeholder:text-gray-800 focus:border-blue-500/50 transition-all" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[9px] font-black uppercase tracking-widest text-gray-500">Email_Endpoint</Label>
                  <Input 
                    id="email" type="email" required placeholder="ID@NODE.COM"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-white/[0.02] border-white/10 rounded-none h-12 text-[11px] text-white uppercase placeholder:text-gray-800 focus:border-blue-500/50 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[9px] font-black uppercase tracking-widest text-gray-500">Comm_Link</Label>
                  <Input 
                    id="phone" placeholder="PHONE"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-white/[0.02] border-white/10 rounded-none h-12 text-[11px] text-white uppercase placeholder:text-gray-800 focus:border-blue-500/50 transition-all" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Pipeline_Status</Label>
                  <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
                    <SelectTrigger className="bg-white/[0.02] border-white/10 rounded-none h-12 text-[10px] text-white uppercase">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A0C10] border-white/10 text-white rounded-none">
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Blocked">Blocked</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-gray-500 text-blue-500/60">Target_Stage</Label>
                  <Select value={formData.onboarding_stage} onValueChange={(val) => setFormData({...formData, onboarding_stage: val})}>
                    <SelectTrigger className="bg-blue-500/[0.02] border-blue-500/20 rounded-none h-12 text-[10px] text-blue-400 uppercase">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A0C10] border-white/10 text-white rounded-none">
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
                className="w-full bg-blue-600 hover:bg-blue-500 text-white h-14 mt-6 font-black uppercase tracking-[0.2em] text-[10px] rounded-none transition-all active:scale-[0.98] shadow-lg shadow-blue-600/10" 
                disabled={loading}
              >
                {loading ? 'SYNCHRONIZING...' : 'COMMIT_TO_LEDGER'}
              </Button>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}