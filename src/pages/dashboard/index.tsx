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

