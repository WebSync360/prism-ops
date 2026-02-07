import { FileText, Settings, FlaskConical, CheckCircle2 } from 'lucide-react'

export default function StageHeatmap({ clients }: { clients: any[] }) {
  const stages = [
    { id: 'Docs', label: 'Docs', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: FileText },
    { id: 'Setup', label: 'Setup', color: 'text-purple-400', bg: 'bg-purple-500/10', icon: Settings },
    { id: 'Testing', label: 'Testing', color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: FlaskConical },
    { id: 'Live', label: 'Live', color: 'text-green-400', bg: 'bg-green-500/10', icon: CheckCircle2 },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stages.map((s) => {
        const count = clients.filter(c => c.onboarding_stage === s.id).length
        
        return (
          <div key={s.id} className="bg-[#1C1E24] border border-gray-800 p-5 rounded-2xl flex flex-col gap-5 hover:border-gray-700 transition-all group relative overflow-hidden">
            {/* Subtle background glow on hover */}
            <div className={`absolute -right-4 -top-4 w-16 h-16 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity ${s.bg.replace('/10', '')}`} />

            <div className="flex items-center justify-between relative z-10">
              <div className="flex `items-center` gap-3">
                <div className={`p-2.5 rounded-xl ${s.bg} border border-white/5`}>
                  <s.icon className={s.color} size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] leading-none mb-1.5">{s.label}</p>
                  <p className="text-2xl font-black text-white leading-none">{count}</p>
                </div>
              </div>
            </div>

            {/* THE DOPAMINE STREAK: 10 minimalist blocks */}
            <div className="flex gap-1.5 h-1.5 w-full relative z-10">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`flex-1 rounded-full transition-all duration-500 ${
                    i < count 
                      ? `${s.bg.replace('/10', '/60')} shadow-[0_0_12px_-2px_rgba(255,255,255,0.1)]` 
                      : 'bg-gray-800/40'
                  }`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}