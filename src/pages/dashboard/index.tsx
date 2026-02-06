import DashboardLayout from '@/layouts/DashboardLayout'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Founder Command Center</h2>
          <p className="text-gray-400">Everything you need to see, all in one place.</p>
        </div>

        {/* We will build the 4 Cards and the Client Table here next! */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <div className="h-32 bg-[#1C1E24] rounded-xl border border-gray-800 p-4">Total Clients</div>
           <div className="h-32 bg-[#1C1E24] rounded-xl border border-gray-800 p-4 text-red-400">Blocked</div>
           <div className="h-32 bg-[#1C1E24] rounded-xl border border-gray-800 p-4 text-blue-400">In Progress</div>
           <div className="h-32 bg-[#1C1E24] rounded-xl border border-gray-800 p-4 text-green-400">Completed</div>
        </div>
      </div>
    </DashboardLayout>
  )
}

import DashboardLayout from '@/layouts/DashboardLayout'
import AddClientSheet from '@/components/custom/AddClientSheet'

export default function Dashboard() {
  const refreshData = () => {
    // We will hook this up to React Query in 5 minutes!
    console.log("Refreshing data...")
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Founder Command Center</h2>
            <p className="text-gray-400 text-sm">Real-time pulse of your operations.</p>
          </div>
          
          {/* THE BUTTON */}
          <AddClientSheet onClientAdded={refreshData} />
        </div>

        {/* 4 Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           {/* Card 1 */}
           <div className="bg-[#1C1E24] rounded-xl border border-gray-800 p-6">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Clients</p>
              <p className="text-3xl font-bold text-white mt-1">0</p>
           </div>
           {/* Repeat for others with your colors... */}
        </div>
      </div>
    </DashboardLayout>
  )
}