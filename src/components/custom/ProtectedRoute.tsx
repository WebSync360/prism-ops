import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const location = useLocation()

  useEffect(() => {
    // 1. Check current session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    checkUser()

    // 2. Listen for sign-in/sign-out events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#141E30] text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#35577D]"></div>
      </div>
    )
  }

  // If no user, send them to login but remember where they were trying to go
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}