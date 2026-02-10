import { FileText, Zap, ShieldCheck, Rocket } from 'lucide-react'

export default function StageHeatmap({ clients }: { clients: any[] }) {
  // ALIGNED: Names now match the DB values directly to prevent confusion
  const stages = [
    { id: 'Docs', label: 'Documentation', color: 'text-blue-500', bg: 'bg-blue-500/10', icon: FileText, border: 'border-blue-500/20' },
    { id: 'Setup', label: 'System Setup', color: 'text-blue-400', bg: 'bg-blue-400/10', icon: Zap, border: 'border-blue-400/20' },
    { id: 'Testing', label: 'Validation', color: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: ShieldCheck, border: 'border-cyan-500/20' },
    { id: 'Live', label: 'Operational', color: 'text-green-500', bg: 'bg-green-500/10', icon: Rocket, border: 'border-green-500/20' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stages.map((s) => {
        const count = clients.filter(c => c.onboarding_stage === s.id).length
        
        return (
          <div key={s.id} className="bg-[#0A0C10] border border-white/5 p-6 rounded-none flex flex-col gap-6 hover:border-white/10 transition-all group relative">
            
            {/* Minimalist Header */}
            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <s.icon className={`${s.color} opacity-70`} size={14} />
                  <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em] leading-none">
                    {s.label}
                  </p>
                </div>
                <p className="text-3xl font-black text-white leading-none tracking-tighter">
                  {count.toString().padStart(2, '0')}
                </p>
              </div>
              
              {/* Subtle Stage Indicator */}
              <div className={`text-[8px] font-mono px-2 py-1 border ${s.border} ${s.color} bg-transparent`}>
                {s.id.toUpperCase()}
              </div>
            </div>

            {/* THE PROGRESS BAR: Clean, Uniform Industrial Look */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-gray-700 font-bold uppercase tracking-widest">Capacity_Load</span>
                <span className="text-[8px] text-gray-500 font-mono">{count * 10}%</span>
              </div>
              <div className="flex gap-1 h-1 w-full bg-white/[0.02]">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 transition-all duration-500 ${
                      i < count 
                        ? `${s.bg.replace('/10', '/60')} shadow-[0_0_10px_-2px_rgba(59,130,246,0.2)]` 
                        : 'bg-white/5'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative Corner Element */}
            <div className={`absolute top-0 right-0 w-[2px] h-0 group-hover:h-full transition-all duration-300 ${s.bg.replace('/10', '/80')}`} />
          </div>
        )
      })}
    </div>
  )
}