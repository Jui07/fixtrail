import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Shield, CheckCircle2, Cpu, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#101B35] text-slate-400 border-t border-slate-800 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] flex items-center justify-center text-white font-bold">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">FixTrail</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              FixTrail is an AI-powered, community-driven device troubleshooting platform. We replace guesswork with statistically verified repair outcomes collected from real hardware technicians and engineering benches.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Wilson Score Evidence
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <Shield className="w-3.5 h-3.5" /> Peer Verified
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Cpu className="w-3.5 h-3.5" /> Gemini Multimodal AI
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Device Hub</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/explore/laptops" className="hover:text-white transition-colors">Laptops & Notebooks</Link></li>
              <li><Link to="/explore/smartphones" className="hover:text-white transition-colors">Smartphones</Link></li>
              <li><Link to="/explore/desktop-computers" className="hover:text-white transition-colors">Desktop Towers</Link></li>
              <li><Link to="/explore/computer-components" className="hover:text-white transition-colors">Motherboards & VRMs</Link></li>
              <li><Link to="/explore" className="text-blue-400 hover:text-blue-300 transition-colors">View All 14 Categories →</Link></li>
            </ul>
          </div>

          {/* Community & Knowledge */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Knowledge Base</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/questions" className="hover:text-white transition-colors">Community Questions</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Ranked Solutions</Link></li>
              <li><Link to="/cost-estimator" className="hover:text-white transition-colors">Repair Cost Estimator</Link></li>
              <li><Link to="/service-centres" className="hover:text-white transition-colors">Service Centre Directory</Link></li>
              <li><Link to="/experts" className="hover:text-white transition-colors">Technician Leaderboard</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How Ranking Works</Link></li>
              <li><Link to="/questions/ask" className="hover:text-white transition-colors">Post Problem Docket</Link></li>
            </ul>
          </div>

          {/* Safety & Protocol */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Safety & Governance</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-amber-400/90 font-medium">Lithium-Ion Safety First</span></li>
              <li><span className="text-slate-400">Anti-Static (ESD) Protocols</span></li>
              <li><span className="text-slate-400">Hostel & Lab Bench Code</span></li>
              <li><span className="text-slate-400">Zero Synthetic Claims Policy</span></li>
              <li><span className="text-slate-400">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} FixTrail Intelligence Platform. Engineering edition.</p>
          <p className="flex items-center gap-1">
            Built with rigor for student & technician workbenches
          </p>
        </div>
      </div>
    </footer>
  );
};
