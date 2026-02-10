import DashboardLayout from '@/layouts/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Check, Zap, Crown, Shield } from 'lucide-react'

export default function Billing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "For solo founders managing early-stage pipelines.",
      features: ["Up to 50 clients", "Full Dashboard Access", "Manual Status Updates", "Community Support"],
      button: "Current Plan",
      current: true
    },
    {
      name: "Pro",
      price: "$19",
      description: "For high-velocity agencies scaling their operations.",
      features: ["Unlimited Clients", "Advanced Filters", "Export Ledger (CSV/PDF)", "Priority Snapshot Support", "Early Access to AI"],
      button: "Upgrade to Pro",
      current: false,
      highlight: true
    }
  ]

  return (
    <DashboardLayout>
      <div className="max-w-5xl space-y-10 pb-20 animate-in fade-in duration-700">
        <div>
          <h2 className="text-3xl font-bold text-white/80 tracking-tighter text-blue-500">Subscription & Scaling</h2>
          <p className="text-gray-500 text-sm italic font-mono">Manage your node's operational capacity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative bg-[#1C1E24] border ${plan.highlight ? 'border-blue-500 shadow-2xl shadow-blue-500/10' : 'border-gray-800'} rounded-3xl p-8 flex flex-col justify-between transition-all hover:border-gray-600`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full flex items-center gap-1">
                  <Crown size={12} /> Recommended
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-gray-500 text-sm font-bold">/month</span>
                  </div>
                  <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm">
                      <div className="h-5 w-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                className={`mt-10 w-full h-14 rounded-2xl font-black transition-all ${
                  plan.current 
                    ? 'bg-transparent border border-gray-800 text-gray-500 cursor-default' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                }`}
              >
                {plan.button}
              </Button>
            </div>
          ))}
        </div>

        {/* SECURITY TRUST BADGE */}
        <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-6 flex items-center gap-4 max-w-2xl">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Enterprise-Grade Billing</p>
            <p className="text-xs text-gray-500">Payments are secured via Stripe. No credit card information is stored on Prism-Ops servers.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}