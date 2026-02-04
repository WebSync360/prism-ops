import { LayoutDashboard, Users, ClipboardCheck, Settings, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Clients', path: '/clients' },
  { icon: ClipboardCheck, label: 'Daily Snapshot', path: '/snapshot' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  const location = useLocation()

  const handleSignOut = () => supabase.auth.signOut()

  return (
    <div className="w-64 bg-[#1C1E24] border-r border-gray-800 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white tracking-tight">Prism-Ops</h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-[#35577D] text-white' 
                  : 'text-gray-400 hover:bg-[#141E30] hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={handleSignOut}
          className="flex items-center space-x-3 px-3 py-2 w-full text-gray-400 hover:text-red-400 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  )
}