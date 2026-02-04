import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Using Magic Link for a smooth "Founders" experience
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/dashboard',
      },
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#141E30] p-4">
      <Card className="w-full max-w-md border-none bg-[#1C1E24] text-[#DCDAD9]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">Prism-Ops</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your email to access your command center.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="founder@company.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#141E30] border-gray-700 text-white"
              />
            </div>
            <Button 
              className="w-full bg-[#35577D] hover:bg-[#2a4563] text-white" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Sending link...' : 'Send Magic Link'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}