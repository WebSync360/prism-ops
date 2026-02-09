import { useState, useEffect } from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { User, Database, Shield, Loader2, Save, Globe } from 'lucide-react'
import { toast } from 'sonner' // or your preferred toast library

export default function Settings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
  })

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setProfile({
          fullName: user.user_metadata?.full_name || '',
          email: user.email || '',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile() {
    setSaving(true)
    const { error } = await supabase.auth.updateUser({
      data: { full_name: profile.fullName }
    })

    if (error) {
      alert("Update failed: " + error.message)
    } else {
      // This triggers the Top Bar initials to update via window event if you set up a listener,
      // or simply by re-fetching on next load.
      alert("Kernel Metadata Updated.")
    }
    setSaving(false)
  }

  if (loading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    </DashboardLayout>
  )

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-10 pb-20 animate-in fade-in duration-500">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tighter">System Settings</h2>
          <p className="text-gray-500 text-sm">Hardware-level configurations for Prism-Ops.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT NAV - For that professional "SaaS" feel */}
          <div className="space-y-2">
            <nav className="flex flex-col space-y-1">
              <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
                <User size={16} /> <span className="text-sm font-bold">Identity</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-300 transition-colors">
                <Shield size={16} /> <span className="text-sm font-bold">Security</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-300 transition-colors">
                <Globe size={16} /> <span className="text-sm font-bold">Network</span>
              </div>
            </nav>
          </div>

          {/* MAIN FORM */}
          <div className="md:col-span-2 space-y-6">
            <section className="bg-[#1C1E24] border border-gray-800 rounded-2xl p-8 space-y-8 shadow-2xl">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Founder Identity</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Core Profile Metadata</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <Label className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Legal Name / Alias</Label>
                  <Input 
                    value={profile.fullName}
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    placeholder="Enter full name" 
                    className="bg-[#141E30] border-gray-800 text-white focus:ring-blue-500 focus:border-blue-500 h-12" 
                  />
                </div>
                <div className="space-y-3 opacity-60 cursor-not-allowed">
                  <Label className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Primary Endpoint (Email)</Label>
                  <Input 
                    value={profile.email} 
                    disabled 
                    className="bg-[#141E30] border-gray-800 text-gray-500 h-12" 
                  />
                  <p className="text-[10px] text-gray-600 italic font-mono">Endpoint modification restricted via console.</p>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={updateProfile} 
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-6 rounded-xl transition-all flex gap-2"
                >
                  {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  Synchronize Changes
                </Button>
              </div>
            </section>

            {/* SYSTEM STATUS */}
            <section className="bg-[#1C1E24]/50 border border-gray-800 rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/5 rounded-xl border border-green-500/10 text-green-500">
                    <Database size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-white font-bold">Supabase Cloud Ledger</p>
                    <p className="text-[10px] text-gray-500 font-mono">STATUS: PRISM_STABLE_01</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Synchronized
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}