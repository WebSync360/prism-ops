import { Link } from "react-router-dom";
import { Logo } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, Zap, Target } from "lucide-react";
// If your image is in src/assets, uncomment the line below:
// import heroImg from "@/assets/Prism-Ops.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#DCDAD9] selection:bg-blue-500/30">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Logo variant="dark" />
        <div className="flex items-center gap-8">
          <Link to="/login" className="text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">
            Login
          </Link>
          <Button asChild className="bg-white text-black hover:bg-gray-200 font-bold px-6 rounded-none uppercase text-[10px] tracking-widest">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
              OWN YOUR <br />
              <span className="text-blue-600">PIPELINE.</span>
            </h1>
            
            <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
              The high-fidelity dashboard for founders who have outgrown spreadsheets. 
              Track onboarding, identify bottlenecks, and scale operations.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-8 rounded-none uppercase tracking-widest text-xs group">
                <Link to="/signup" className="flex items-center gap-3">
                  Create Workspace <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all border-b border-gray-800 pb-1">
                View Platform Features
              </button>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative">
            <div className="absolute -inset-1 bg-blue-600/10 rounded-none blur-2xl" />
            <div className="relative bg-[#0A0C10] border border-white/5 p-2 shadow-2xl">
               <div className="aspect-video bg-gray-900 flex items-center justify-center overflow-hidden">
                 {/* FIX PATH: 
                    1. If file is in public/assets/Prism-Ops.png -> use "/assets/Prism-Ops.png"
                    2. If file is in src/assets/Prism-Ops.png -> import it at top and use {heroImg}
                 */}
                 <img 
                   src="/assets/Prism-Ops.png" 
                   alt="Prism-Ops Dashboard"
                   className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-500"
                   onError={(e) => {
                     e.currentTarget.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070"; // Fallback if your path is wrong
                   }}
                 />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE-COLUMN VALUE PROPS */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16">
          <ValueProp 
            icon={<Shield size={18}/>} 
            title="Private Silos" 
            desc="Row-level security ensures your client data is never visible to other users." 
          />
          <ValueProp 
            icon={<Target size={18}/>} 
            title="Blocker Tracking" 
            desc="Instantly identify which stage of onboarding is causing friction." 
          />
          <ValueProp 
            icon={<Zap size={18}/>} 
            title="Real-time Sync" 
            desc="A unified stream of truth for your entire client portfolio." 
          />
        </div>
      </section>

      {/* SIMPLE FOOTER */}
      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">
          Prism-Ops © 2026 // Precision Infrastructure
        </p>
      </footer>
    </div>
  );
}

function ValueProp({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="space-y-4">
      <div className="text-blue-600">{icon}</div>
      <h3 className="text-xs font-bold text-white uppercase tracking-widest">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}