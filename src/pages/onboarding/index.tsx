import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Rocket, Target, ArrowRight } from 'lucide-react'

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    workspaceName: '',
    clientCount: '',
    bottleneck: ''
  })

  const handleComplete = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      // Save this to user metadata so the dashboard can use it
      await supabase.auth.updateUser({
        data: { 
          workspace_name: formData.workspaceName,
          onboarding_complete: true,
          bottleneck_focus: formData.bottleneck
        }
      })
    }
    
    navigate('/dashboard')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#141E30] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-500">
        
        {/* PROGRESS BAR */}
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-blue-500' : 'bg-gray-800'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tighter">Name your node.</h2>
              <p className="text-gray-500 text-sm">What is the name of your agency or workspace?</p>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Workspace Name</Label>
              <Input 
                autoFocus
                placeholder="e.g. Prism Creative" 
                className="bg-[#1C1E24] border-gray-800 h-12 rounded-xl"
                value={formData.workspaceName}
                onChange={(e) => setFormData({...formData, workspaceName: e.target.value})}
              />
            </div>
            <Button onClick={() => setStep(2)} disabled={!formData.workspaceName} className="w-full bg-blue-600 h-12 rounded-xl font-bold">
              Next Stage <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tighter">Current Volume.</h2>
              <p className="text-gray-500 text-sm">How many clients are you currently onboarding?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['1-5', '6-15', '16-30', '30+'].map((opt) => (
                <button 
                  key={opt}
                  onClick={() => setFormData({...formData, clientCount: opt})}
                  className={`p-4 rounded-xl border font-bold transition-all ${formData.clientCount === opt ? 'bg-blue-600 border-blue-500' : 'bg-[#1C1E24] border-gray-800 text-gray-400'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <Button onClick={() => setStep(3)} disabled={!formData.clientCount} className="w-full bg-blue-600 h-12 rounded-xl font-bold">
              Continue
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tighter">Identify Bottleneck.</h2>
              <p className="text-gray-500 text-sm">Where does your onboarding usually stall?</p>
            </div>
            <div className="space-y-3">
              {['Collecting Documents', 'Technical Setup', 'Client Communication'].map((opt) => (
                <button 
                  key={opt}
                  onClick={() => setFormData({...formData, bottleneck: opt})}
                  className={`w-full p-4 rounded-xl border font-bold text-left transition-all ${formData.bottleneck === opt ? 'bg-blue-600 border-blue-500' : 'bg-[#1C1E24] border-gray-800 text-gray-400'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <Button onClick={handleComplete} disabled={!formData.bottleneck || loading} className="w-full bg-blue-600 h-12 rounded-xl font-bold">
              {loading ? 'Initializing...' : 'Launch Command Center'}
            </Button>
          </div>
        )}

      </div>
    </div>
  )
}