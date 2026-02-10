import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/layouts/DashboardLayout'
import { Chrome, Loader2 } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // REDIRECT LOGIC: New users go to /onboarding, existing go to /dashboard
    const redirectPath = isSignUp ? '/onboarding' : '/dashboard'

    const { data, error } = isSignUp 
      ? await supabase.auth.signUp({ 
          email, 
          password,
          options: { emailRedirectTo: window.location.origin + '/onboarding' } 
        })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      alert(error.message)
    } else {
      if (isSignUp && !data.session) {
        alert('Check your email to confirm your account!')
      } else {
        navigate(redirectPath)
      }
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        // Google users also need to hit onboarding if they are new
        redirectTo: window.location.origin + '/onboarding' 
      }
    })
    if (error) alert(error.message)
  }

  return (
    <div className="min-h-screen bg-[#141E30] flex flex-col items-center justify-center p-6">
      <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
        <Logo variant="dark" />
      </div>

      <div className="w-full max-w-md bg-[#1C1E24] border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-white tracking-tight">
            {isSignUp ? 'Initialize Founder Node' : 'Access Terminal'}
          </h1>
          <p className="text-gray-500 text-sm">
            {isSignUp ? 'Deploy your command center.' : 'Welcome back, Commander.'}
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-800" /></div>
          <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-gray-600">
            <span className="bg-[#1C1E24] px-4">Secure Terminal Access</span>
          </div>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-400 text-xs uppercase font-black tracking-widest">Email Endpoint</Label>
            <Input 
              type="email" placeholder="founder@agency.com" required 
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-[#141E30] border-gray-800 text-white h-12 rounded-xl focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400 text-xs uppercase font-black tracking-widest">Security Key</Label>
            <Input 
              type="password" placeholder="••••••••" required 
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="bg-[#141E30] border-gray-800 text-white h-12 rounded-xl focus:ring-blue-500"
            />
          </div>
          <Button 
            disabled={loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : isSignUp ? 'Create Account' : 'Establish Connection'}
          </Button>
        </form>

        <div className="text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-gray-500 hover:text-blue-400 font-bold underline underline-offset-4 transition-colors"
          >
            {isSignUp ? 'Already authorized? Sign In' : "No access code? Create Account"}
          </button>
        </div>
      </div>
    </div>
  )
}