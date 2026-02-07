import DashboardLayout from '@/layouts/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Bell, Shield, User, Database } from 'lucide-react'

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-10 pb-20">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tighter">System Settings</h2>
          <p className="text-gray-500 text-sm">Configure your Command Center environment.</p>
        </div>

        {/* PROFILE SECTION */}
        <section className="bg-[#1C1E24] border border-gray-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
            <User size={20} className="text-[#35577D]" />
            <h3 className="text-lg font-semibold text-white">Founder Profile</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-400 text-xs uppercase">Display Name</Label>
              <Input placeholder="Founder" className="bg-[#141E30] border-gray-800 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400 text-xs uppercase">Contact Email</Label>
              <Input placeholder="founder@example.com" className="bg-[#141E30] border-gray-800 text-white" />
            </div>
          </div>
          <Button className="bg-[#35577D] hover:bg-[#2a4563]">Save Changes</Button>
        </section>

        {/* SYSTEM STATUS */}
        <section className="bg-[#1C1E24] border border-gray-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
            <Database size={20} className="text-green-500" />
            <h3 className="text-lg font-semibold text-white">Database Connectivity</h3>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-white font-medium `text-gray-200`">Supabase Cloud Sync</p>
              <p className="text-xs text-gray-500 italic">Connected to prism_ops_production</p>
            </div>
            <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest animate-pulse">
              <div className="w-2 h-2 bg-green-500 rounded-full" /> Operational
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}