import { ReactNode } from 'react'
import Sidebar from '@/components/custom/Sidebar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#141E30] overflow-hidden text-[#DCDAD9]">
      {/* Sidebar - Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-y-auto bg-[#141E30]">
        {/* Top Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-[#1C1E24] border-b border-gray-800">
          <div className="flex items-center flex-1">
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="bg-[#141E30] border border-gray-700 text-sm rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-[#35577D]"
            />
          </div>
          <div className="flex items-center space-x-4">
             <div className="h-8 w-8 rounded-full bg-[#35577D] flex items-center justify-center text-xs font-bold">
               OP
             </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}