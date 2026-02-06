import DashboardLayout from '@/layouts/DashboardLayout'
import AddClientSheet from '@/components/custom/AddClientSheet'
import ClientTable from '@/components/custom/ClientTable'

export default function Dashboard() {
  const refreshData = () => {
    // This will trigger the database fetch soon!
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
          
          {/* THE ACTION BUTTON */}
          <AddClientSheet onClientAdded={refreshData} />
        </div>

        {/* 4 Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           {/* Total Clients */}
           <div className="bg-[#1C1E24] rounded-xl border border-gray-800 p-6">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Clients</p>
              <p className="text-3xl font-bold text-white mt-1">0</p>
           </div>

           {/* Blocked - Red accent */}
           <div className="bg-[#1C1E24] rounded-xl border border-gray-800 p-6 border-l-4 border-l-red-500">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Blocked</p>
              <p className="text-3xl font-bold text-white mt-1">0</p>
           </div>

           {/* In Progress - Blue accent */}
           <div className="bg-[#1C1E24] rounded-xl border border-gray-800 p-6 border-l-4 border-l-blue-500">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">In Progress</p>
              <p className="text-3xl font-bold text-white mt-1">0</p>
           </div>

           {/* Completed - Green accent */}
           <div className="bg-[#1C1E24] rounded-xl border border-gray-800 p-6 border-l-4 border-l-green-500">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Completed</p>
              <p className="text-3xl font-bold text-white mt-1">0</p>
           </div>
        </div>

        {/* Placeholder for the Table we are building next */}
        <div className="bg-[#1C1E24] rounded-xl border border-gray-800 h-64 flex items-center justify-center text-gray-600">
           Client Table Loading...
        </div>
      </div>
    </DashboardLayout>
  )
}