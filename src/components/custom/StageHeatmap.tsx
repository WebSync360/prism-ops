import { CheckCircle2, FileText, Settings, FlaskConical } from 'lucide-react'

export default function StageHeatmap({ clients }: { clients: any[] }) {
  const getCount = (stage: string) => clients.filter(c => c.onboarding_stage === stage).length

  const stages = [
    { label: 'Docs', count: getCount('Docs'), icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Setup', count: getCount('Setup'), icon: Settings, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Testing', count: getCount('Testing'), icon: FlaskConical, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Live', count: getCount('Live'), icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stages.map((s) => (
        <div key={s.label} className="bg-[#1C1E24] border border-gray-800 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${s.bg}`}>
              <s.icon className={s.color} size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{s.label}</p>
              <p className="text-xl font-bold text-white">{s.count}</p>
            </div>
          </div>
          {/* Minimalist GitHub-style block */}
          <div className="flex gap-1">
             {[...Array(5)].map((_, i) => (
               <div key={i} className={`w-2 h-6 rounded-sm ${i < s.count ? s.bg : 'bg-gray-800/30'}`} />
             ))}
          </div>
        </div>
      ))}
    </div>
  )
}