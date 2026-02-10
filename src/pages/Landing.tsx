import { Link } from "react-router-dom";
import { Logo } from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, LayoutDashboard, Database, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#141E30] text-[#DCDAD9] selection:bg-blue-500/30">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <Logo variant="dark" />
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-bold hover:text-white transition-colors">
            Login
          </Link>
          <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                System Status: v1.0 Live
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
              The Client Onboarding <br />
              <span className="text-blue-500">Command Center.</span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Stop chasing updates in Slack and Notion. Prism-Ops replaces scattered 
              spreadsheets with one real-time dashboard for founders who need to 
              see what’s moving, blocked, and operational.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-7 rounded-2xl text-lg shadow-2xl shadow-blue-600/20 group">
                <Link to="/signup" className="flex items-center gap-2">
                  Initialize Workspace <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-gray-800 bg-transparent hover:bg-white/5 text-white px-8 py-7 rounded-2xl font-bold">
                 View Demo List
              </Button>
            </div>
          </div>

          {/* HERO IMAGE / PREVIEW */}
          <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20" />
            <div className="relative bg-[#1C1E24] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden p-2">
               {/* This is where a screenshot of your actual Dashboard will go */}
               <div className="bg-[#141E30] rounded-lg aspect-video flex items-center justify-center border border-gray-800">
                 <LayoutDashboard className="text-gray-800 w-20 h-20" />
                 <p className="absolute bottom-4 left-4 text-[10px] font-mono text-gray-600">CORE_DASHBOARD_PREVIEW.IMG</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINI-FEATURES */}
      <section className="py-20 bg-[#1C1E24]/50 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: LayoutDashboard, title: "Operational Oversight", desc: "A high-level view of every client currently in the pipeline." },
            { icon: Database, title: "Single Source of Truth", desc: "Update once, sync everywhere. No more duplicate entries." },
            { icon: Zap, title: "Bottleneck Detection", desc: "Instantly identify which clients are stalled in provisioning." }
          ].map((f, i) => (
            <div key={i} className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-gray-900 text-center">
        <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
          © 2026 Prism-Ops Infrastructure. Built for Founders.
        </p>
      </footer>
    </div>
  );
}