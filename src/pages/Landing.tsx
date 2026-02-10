import { Link } from "react-router-dom";
import { Logo } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, ShieldCheck, Activity, ChevronRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#DCDAD9] selection:bg-blue-500/30 overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-white/5">
        <Logo variant="dark" />
        <div className="flex items-center gap-8">
          <Link to="/login" className="text-xs font-black uppercase tracking-widest hover:text-blue-500 transition-colors">
            Access Terminal
          </Link>
          <Button asChild className="bg-white text-black hover:bg-gray-200 font-bold px-6 rounded-none uppercase text-xs tracking-tighter">
            <Link to="/signup">Initialize Unit</Link>
          </Button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-18 pb-40 px-6">
        {/* Subtle Background Grid for "Technical" look */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-none border-l-2 border-blue-600 bg-blue-600/5">
              <Terminal size={14} className="text-blue-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400">
                Protocols: Operational // Secure_Silo_Active
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-[calc(-0.05em)] text-white leading-[0.85]">
              DOMINATE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">PIPELINE.</span>
            </h1>
            
            <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-medium">
              Prism-Ops is a high-fidelity command deck for founders. 
              Eliminate the fog of manual tracking. See every client, every blocker, and every win in one unified stream.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-8 rounded-none text-md uppercase tracking-tighter group">
                <Link to="/signup" className="flex items-center gap-3">
                  Deploy Workspace <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <button className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all">
                <span>View System Dossier</span>
                <div className="h-[1px] w-8 bg-gray-800" />
              </button>
            </div>
          </div>

          {/* HERO IMAGE / PREVIEW */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/20 rounded-full blur-[120px] opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-[#0A0C10] border border-white/10 p-1 shadow-2xl shadow-black">
               {/* TO ADD YOUR IMAGE: 
                  Replace the <img> src with: src="/assets/your-dashboard-screenshot.png" 
               */}
               <div className="relative aspect-video bg-gray-900 overflow-hidden">
                 <img 
                   src="./assets/Prism-Ops.png" 
                   alt="System Interface"
                   className="object-cover w-full h-full opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent" />
                 <div className="absolute top-4 left-4 flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500/50" />
                    <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                    <div className="h-2 w-2 rounded-full bg-green-500/50" />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* LUXURY FEATURES SECTION */}
      <section className="py-32 border-t border-white/5 relative bg-[#0A0C10]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">Industrial Grade <br/> Performance</h2>
            <p className="text-gray-500 max-w-sm text-sm font-medium leading-relaxed">
              Engineered for those who value clarity over noise. Prism-Ops strips away the fluff to focus on what matters: execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <FeatureCard 
              icon={<ShieldCheck size={20}/>} 
              title="Founder Silos" 
              desc="Encrypted row-level security. Your data is your own, period." 
            />
            <FeatureCard 
              icon={<Activity size={20}/>} 
              title="Real-time Pulse" 
              desc="Instant updates across the pipeline. Zero refresh required." 
            />
            <FeatureCard 
              icon={<Terminal size={20}/>} 
              title="Execution Focused" 
              desc="Designed to identify blockers before they become churn." 
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 text-center">
        <div className="flex justify-center gap-12 mb-8 opacity-30 grayscale underline-offset-4 text-[10px] font-bold uppercase tracking-widest">
            <span>SLA: 99.9%</span>
            <span>Uptime: Operational</span>
            <span>Encryption: AES-256</span>
        </div>
        <p className="text-[10px] font-mono text-gray-700 uppercase tracking-[0.5em]">
          Prism-Ops // Built for the 1%.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-10 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
      <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <h3 className="text-lg font-black text-white tracking-widest uppercase mb-4">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}