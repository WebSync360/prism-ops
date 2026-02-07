import { LayoutDashboard, Users, ClipboardCheck, Settings, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  // Changing path to /daily-snapshot to match App.tsx
  { icon: ClipboardCheck, label: 'Daily Snapshot', path: '/daily-snapshot' },
  // Keep these for future expansion or leave as placeholders
  { icon: Users, label: 'Clients', path: '/dashboard/clients' }, 
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  const location = useLocation()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    // Force refresh to clear any cached auth state
    window.location.href = '/login'
  }

  return (
    <div className="w-64 bg-[#1C1E24] border-r border-gray-800 flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <h1 className="text-xl font-bold text-white tracking-tighter flex items-center gap-2">
          <div className="w-6 h-6 bg-[#35577D] rounded-md shadow-[0_0_15px_rgba(53,87,125,0.5)]"></div>
          Prism-Ops
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-[#35577D]/20 text-[#64B5F6] border border-[#35577D]/50 shadow-[inset_0_0_10px_rgba(53,87,125,0.1)]' 
                  : 'text-gray-400 hover:bg-[#141E30] hover:text-white'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-[#64B5F6]' : 'group-hover:text-white'} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#64B5F6] shadow-[0_0_8px_#64B5F6]"></div>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={handleSignOut}
          className="flex items-center space-x-3 px-4 py-3 w-full text-gray-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  )
}