import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Wrench } from 'lucide-react';

export const ExpertsPage = () => {
  const experts = [
    {
      name: 'Rajesh Sharma',
      username: 'rajesh_tech',
      role: 'Lead Bench Technician',
      location: 'Pune, Maharashtra',
      reputation: 840,
      solutionsCount: 16,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      badge: 'Dell / Lenovo Specialist',
      bio: 'Repaired over 200 student laptops across COEP hostel benches. Expert in motherboard power rails and VRM static drains.'
    },
    {
      name: 'System Administrator',
      username: 'admin',
      role: 'Platform Moderator & Engineer',
      location: 'Bangalore, Karnataka',
      reputation: 1250,
      solutionsCount: 24,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      badge: 'Core Contributor',
      bio: 'Architecting FixTrail repair schema and maintaining the statistical Wilson confidence engine.'
    }
  ];

  return (
    <div className="py-12 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
            Verified Technicians
          </span>
          <h1 className="text-3xl font-bold text-[#172033] tracking-tight">
            FixTrail Expert Community
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Experienced hardware engineers and students who contribute peer-reviewed troubleshooting guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experts.map((exp) => (
            <div
              key={exp.username}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={exp.avatar}
                  alt={exp.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/20 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900">{exp.name}</h3>
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                  </div>
                  <p className="text-xs text-blue-600 font-medium">{exp.role}</p>
                  <p className="text-[11px] text-slate-400 font-mono">@{exp.username} • {exp.location}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {exp.bio}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-teal-50 text-teal-800 border border-teal-200">
                  {exp.badge}
                </span>
                <span className="font-mono text-emerald-700 font-bold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> {exp.reputation} rep
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
