import { Link } from "react-router-dom";
import { Logo } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ChevronRight, Cpu, Activity, Globe, Box } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#DCDAD9] selection:bg-blue-500/30 overflow-x-hidden font-sans">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-white/5 relative z-20">
        <Logo variant="dark" />
        <div className="flex items-center gap-8">
          <Link to="/login" className="text-[10px] font-black uppercase tracking-widest hover:text-blue-500 transition-colors">
            Terminal Access
          </Link>
          <Button asChild className="bg-white text-black hover:bg-gray-200 font-bold px-6 rounded-none uppercase text-[10px] tracking-widest">
            <Link to="/signup">Initialize Node</Link>
          </Button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-18 pb-24 px-6">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10">
            {/* Target Niche Badge */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-none border-l-2 border-blue-600 bg-blue-600/5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
                Engineered for AI Automation Agencies
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.85]">
              ONBOARDING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 text-3xl md:text-7xl">AS INFRASTRUCTURE.</span>
            </h1>
            
            <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-medium">
              Eliminate the "Information Blackout." Prism-Ops is the command center for high-velocity agencies scaling past manual chaos.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-8 rounded-none text-xs uppercase tracking-widest group">
                <Link to="/signup" className="flex items-center gap-3">
                  Deploy Workspace <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <div className="flex flex-col justify-center">
                <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">Current Status:</span>
                <span className="text-[10px] font-black text-white uppercase tracking-tighter">v1 Staging Live</span>
              </div>
            </div>
          </div>

          {/* HERO IMAGE / PREVIEW */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/10 rounded-full blur-[100px] opacity-50" />
            <div className="relative bg-[#0A0C10] border border-white/10 p-1 shadow-2xl">
               <div className="relative aspect-video bg-[#0D1117] overflow-hidden flex flex-col">
                 <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-red-500/20" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500/20" />
                      <div className="h-2 w-2 rounded-full bg-green-500/20" />
                    </div>
                    <div className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Global_Status_Relay</div>
                 </div>
                 <div className="flex-1 relative flex items-center justify-center p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent" />
                    
                    {/* Visual representation of high-density agency data */}
                    <div className="grid grid-cols-4 gap-4 w-full h-full opacity-30">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="border border-white/10 bg-white/5 h-12" />
                      ))}
                    </div>

                    <div className="absolute flex flex-col items-center gap-4">
                      <div className="text-[10px] font-mono text-blue-500 tracking-[0.5em] uppercase animate-pulse bg-[#0A0C10] px-4 py-2 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        Awaiting_API_Handshake
                      </div>
                      <div className="text-[8px] font-bold text-gray-700 tracking-widest uppercase">Node_Ref: {Math.random().toString(36).substring(7)}</div>
                    </div>
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC VALUE PROPS */}
      <section className="py-20 border-t border-white/5 relative bg-[#0A0C10]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-white/5 border border-white/5">
            <FeatureCard 
              icon={<Cpu size={18}/>} 
              title="Identity Ledger" 
              desc="Manage credentials, API keys, and client nodes in a single high-security command center." 
            />
            <FeatureCard 
              icon={<Activity size={18}/>} 
              title="Pipeline Velocity" 
              desc="Identify bottlenecks in real-time. Know exactly who is stalled and which assets are missing." 
            />
            <FeatureCard 
              icon={<Box size={18}/>} 
              title="Agency Scale" 
              desc="Built for 2-15 person teams managing high-ticket AI automation deployments." 
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 text-center">
        <div className="flex justify-center gap-12 mb-8 opacity-40 grayscale contrast-125">
           <span className="text-[10px] font-black tracking-widest uppercase">System_01</span>
           <span className="text-[10px] font-black tracking-widest uppercase">Node_02</span>
           <span className="text-[10px] font-black tracking-widest uppercase">Vault_03</span>
        </div>
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">
          Prism-Ops © 2026 : Operational Clarity for AI Agencies
       </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-12 bg-[#0A0C10] hover:bg-white/[0.02] transition-all group border-r border-white/5 last:border-r-0">
      <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <h3 className="text-xs font-black text-white tracking-[0.2em] uppercase mb-4">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}