import { FileText, Settings, FlaskConical, CheckCircle2 } from 'lucide-react'

export default function StageHeatmap({ clients }: { clients: any[] }) {
  const stages = [
    { id: 'Docs', label: 'Docs', color: 'text-blue-500', bg: 'bg-blue-500/10', icon: FileText },
    { id: 'Setup', label: 'Setup', color: 'text-purple-500', bg: 'bg-purple-500/10', icon: Settings },
    { id: 'Testing', label: 'Testing', color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: FlaskConical },
    { id: 'Live', label: 'Live', color: 'text-green-500', bg: 'bg-green-500/10', icon: CheckCircle2 },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stages.map((s) => {
        const count = clients.filter(c => c.onboarding_stage === s.id).length
        return (
          <div key={s.id} className="bg-[#1C1E24] border border-gray-800 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${s.bg}`}>
                <s.icon className={s.color} size={18} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{s.label}</p>
                <p className="text-xl font-bold text-white">{count}</p>
              </div>
            </div>
            {/* Minimalist GitHub-style progress blocks */}
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-6 rounded-full ${i <= count ? s.bg.replace('/10', '/40') : 'bg-gray-800/30'}`} 
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}