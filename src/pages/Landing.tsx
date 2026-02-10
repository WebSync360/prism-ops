import { Link } from "react-router-dom";
import { Logo } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, Zap, Target } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#DCDAD9] selection:bg-blue-500/30 overflow-x-hidden font-sans">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-white/5 relative z-20">
        <Logo variant="dark" />
        <div className="flex items-center gap-8">
          <Link to="/login" className="text-[10px] font-black uppercase tracking-widest hover:text-blue-500 transition-colors">
            Sign In
          </Link>
          <Button asChild className="bg-white text-black hover:bg-gray-200 font-bold px-6 rounded-none uppercase text-[10px] tracking-widest">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-18 pb-24 px-6">
        {/* Luxury Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10">
            {/* Real Status Bar */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-none border-l-2 border-blue-600 bg-blue-600/5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
                Onboarding Infrastructure : Active
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.85]">
              OWN YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">PIPELINE.</span>
            </h1>
            
            <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-medium">
              The command center for founders who have outgrown spreadsheets. 
              Track client onboarding, solve bottlenecks, and scale your delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-8 rounded-none text-xs uppercase tracking-widest group">
                <Link to="/signup" className="flex items-center gap-3">
                  Create Workspace <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all">
                <span>See Platform Features</span>
              </button>
            </div>
          </div>

          {/* HERO IMAGE / PREVIEW (Fixed Option 2) */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/10 rounded-full blur-[100px] opacity-50" />
            <div className="relative bg-[#0A0C10] border border-white/10 p-1 shadow-2xl">
               <div className="relative aspect-video bg-[#0D1117] overflow-hidden flex flex-col">
                 {/* Fake Window Header */}
                 <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                    <div className="h-2 w-2 rounded-full bg-red-500/20" />
                    <div className="h-2 w-2 rounded-full bg-yellow-500/20" />
                    <div className="h-2 w-2 rounded-full bg-green-500/20" />
                    <div className="ml-4 h-2 w-24 bg-white/5 rounded-full" />
                 </div>
                 {/* Content Area */}
                 <div className="flex-1 relative flex items-center justify-center p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent" />
                    {/* Visual representation of a dashboard grid */}
                    <div className="w-full h-full border border-white/5 grid grid-cols-3 gap-2 p-2 opacity-20">
                      <div className="bg-white/10 h-full w-full" />
                      <div className="bg-white/10 h-full w-full col-span-2" />
                      <div className="bg-white/10 h-full w-full col-span-2" />
                      <div className="bg-white/10 h-full w-full" />
                    </div>
                    <div className="absolute text-[10px] font-mono text-blue-500 tracking-[0.5em] uppercase animate-pulse bg-[#0A0C10] px-4 py-2 border border-blue-500/20">
                      System_Link_Active
                    </div>
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE-COLUMN VALUE PROPS */}
      <section className="py-20 border-t border-white/5 relative bg-[#0A0C10]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-white/5 border border-white/5">
            <FeatureCard 
              icon={<Shield size={18}/>} 
              title="Secure Silos" 
              desc="Row-level security ensures your client records are private and encrypted." 
            />
            <FeatureCard 
              icon={<Target size={18}/>} 
              title="Blocker Logic" 
              desc="Instantly identify which clients are stalled and why." 
            />
            <FeatureCard 
              icon={<Zap size={18}/>} 
              title="Sync Engine" 
              desc="Real-time updates across your entire client portfolio." 
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">
          Prism-Ops © 2026 : Precision Infrastructure
       </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-12 bg-[#0A0C10] hover:bg-white/[0.02] transition-all group">
      <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <h3 className="text-xs font-black text-white tracking-[0.2em] uppercase mb-4">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}