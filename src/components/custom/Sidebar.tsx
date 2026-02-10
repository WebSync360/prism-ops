import { LayoutDashboard, Users, ClipboardCheck, Settings, LogOut, CreditCard, MessageSquare } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/layouts/DashboardLayout'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: ClipboardCheck, label: 'Daily Snapshot', path: '/snapshot' }, // Corrected path
  { icon: Users, label: 'Clients', path: '/dashboard/clients' }, 
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Sidebar({ onItemClick }: { onItemClick?: () => void }) {
  const location = useLocation()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="w-64 bg-[#1C1E24] flex flex-col h-full border-r border-gray-800/50">
      {/* BRANDING SECTION */}
      <div className="p-8 hidden md:block">
        <Logo variant="dark" />
      </div>

      {/* PRIMARY NAVIGATION */}
      <nav className="flex-1 px-4 space-y-1 mt-4 md:mt-0">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
                           (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onItemClick}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[inset_0_0_10px_rgba(59,130,246,0.05)]' 
                  : 'text-gray-500 hover:bg-[#141E30] hover:text-white'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-blue-400' : 'group-hover:text-blue-400'} />
              <span className="font-semibold text-sm tracking-tight">{item.label}</span>
              
              {isActive && (
                <div className="ml-auto w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]"></div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* SUPPORT & BILLING SECTION */}
      <div className="px-4 py-4 space-y-1 border-t border-gray-800/50">
        <Link
          to="/billing"
          onClick={onItemClick}
          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
            location.pathname === '/billing' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-500 hover:text-blue-400 hover:bg-blue-500/5'
          }`}
        >
          <CreditCard size={18} />
          <span className="font-bold text-xs uppercase tracking-widest text-blue-400">Billing</span>
        </Link>

        {/* FEEDBACK LINK (Mailto) */}
        <a 
          href="prismops22@gmail.com" // Replace with your actual email
          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-500 hover:text-green-400 hover:bg-green-500/5 transition-all duration-200 group"
        >
          <MessageSquare size={18} />
          <span className="font-bold text-xs uppercase tracking-widest">Feedback</span>
        </a>
      </div>

      {/* TERMINAL FOOTER */}
      <div className="p-4 border-t border-gray-800/50">
        <div className="bg-[#141E30]/50 rounded-2xl p-1 border border-white/5">
          <button 
            onClick={handleSignOut}
            className="flex items-center space-x-3 px-4 py-3 w-full text-gray-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all duration-200 group"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Terminate Session</span>
          </button>
        </div>
      </div>
    </div>
  )
}