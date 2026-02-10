import { ReactNode, useState, useEffect } from 'react'
import Sidebar from '@/components/custom/Sidebar'
import { supabase } from '@/lib/supabase'
import { Menu, X, Bell, Zap, Triangle, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'

// 1. Integrated Prism-Ops Logo Component
export const Logo = ({ className = "", variant = "dark" }: { className?: string, variant?: "dark" | "light" }) => {
  const isDark = variant === "dark";
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center">
        <Triangle 
          className={`h-7 w-7 rotate-180 ${isDark ? 'text-blue-500 fill-blue-500/10' : 'text-slate-600 fill-blue-600/10'}`} 
          strokeWidth={2.5}
        />
        <div className={`absolute h-1.5 w-1.5 rounded-full top-1/2 left-1/2 -translate-x-1/2 translate-y-0 ${isDark ? 'bg-blue-400' : 'bg-slate-600'}`} />
      </div>
      <span className={`text-xl font-bold tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Prism-Ops
      </span>
    </div>
  );
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userInitials, setUserInitials] = useState('??')
  const [workspaceName, setWorkspaceName] = useState('FOUNDER_NODE') // Default fallback
  const [pendingActions, setPendingActions] = useState(0)

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // 1. Get Initials from Email or Name
        const name = user.user_metadata?.full_name || user.email || 'Admin'
        const initials = name.split(/[@\s.]/).map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        setUserInitials(initials)

        // 2. Get Workspace Name from Metadata (Set during onboarding)
        if (user.user_metadata?.workspace_name) {
          setWorkspaceName(user.user_metadata.workspace_name.toUpperCase())
        }
      }
    }

    const fetchAlerts = async () => {
      const { count } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Blocked')
      setPendingActions(count || 0)
    }

    getUserData()
    fetchAlerts()
  }, [])

  return (
    <div className="flex h-screen bg-[#141E30] overflow-hidden text-[#DCDAD9]">
      
      {/* SIDEBAR - Desktop */}
      <div className="hidden md:flex border-r border-gray-800/50">
        <Sidebar />
      </div>

      {/* SIDEBAR - Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex md:hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          <div className="relative w-[280px] bg-[#141E30] h-full shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col border-r border-gray-800">
            <div className="p-6 flex items-center justify-between border-b border-gray-800/50">
              <Logo variant="dark" />
              <Button variant="ghost" size="icon" className="text-gray-500" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={20} />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
                <Sidebar onItemClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        
        {/* COMMAND CENTER TOP BAR */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-[#0A0C10] backdrop-blur-xl border-b border-gray-800/50 relative z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-white/5 rounded-xl text-blue-400 border border-blue-500/20 bg-blue-500/5"
            >
              <Menu size={20} />
            </button>
            
            <div className="hidden md:flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">Prism_Operational</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 md:space-x-8">
            {/* Real-time Alerts */}
            <div className="flex items-center gap-4 pr-6 border-r border-gray-800/80">
               <div className="relative group cursor-pointer p-2 hover:bg-white/5 rounded-full transition-colors">
                  <Bell size={18} className={`${pendingActions > 0 ? 'text-red-400' : 'text-gray-500'}`} />
                  {pendingActions > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                  )}
               </div>
               
               <div className="hidden sm:flex items-center gap-2.5 bg-red-500/5 px-3 py-1.5 rounded-lg border border-red-500/10">
                 <Zap size={12} className="text-red-500" />
                 <span className="text-[10px] font-black text-red-500 uppercase tracking-tight">{pendingActions} Issues Detected</span>
               </div>
            </div>

            {/* Founder Node Info - DYNAMIC */}
            <div className="flex items-center gap-4">
               <div className="hidden lg:block text-right">
                 <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest leading-none mb-1.5">Workspace</p>
                 <p className="text-[11px] font-bold text-white leading-none flex items-center gap-1.5 justify-center uppercase tracking-tighter">
                   {workspaceName}
                 </p>
               </div>
               <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#1C1E24] to-[#141E30] border border-gray-700 flex items-center justify-center text-xs font-black text-blue-400 shadow-2xl ring-1 ring-blue-500/20">
                 {userInitials}
               </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#141E30]">
          <div className="max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}