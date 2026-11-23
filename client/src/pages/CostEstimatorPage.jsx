import React, { useState } from 'react';
import { Calculator, Wrench, ShieldCheck, AlertTriangle, ArrowRight, DollarSign, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CostEstimatorPage = () => {
  const [deviceType, setDeviceType] = useState('laptop');
  const [component, setComponent] = useState('ram');
  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD'

  // Component price reference data (regional estimates based on current Indian market)
  const COST_DATA = {
    laptop: {
      ram: {
        name: 'DDR4 / DDR5 SO-DIMM RAM Upgrade or Reseat',
        partsCostINR: [1800, 3200],
        partsCostUSD: [25, 45],
        labourINR: [200, 400],
        labourUSD: [15, 30],
        difficulty: 'Beginner',
        diyFeasibility: 'HIGH (DIY Recommended)',
        diyAdvice: 'Straightforward procedure. Can be performed with a standard PH0 screwdriver and dry eraser. Follow our guided CMOS flea drain sequence.',
        safetyColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
      },
      screen: {
        name: '15.6" Full HD (1080p) IPS Display Panel Replacement',
        partsCostINR: [3800, 5800],
        partsCostUSD: [50, 75],
        labourINR: [500, 800],
        labourUSD: [30, 50],
        difficulty: 'Intermediate',
        diyFeasibility: 'MODERATE (Careful DIY or Technician)',
        diyAdvice: 'Requires delicate bezel prying without snapping plastic clips, plus extreme care handling the 30-pin eDP connector latch. Battery must be disconnected first.',
        safetyColor: 'text-amber-800 bg-amber-50 border-amber-200'
      },
      battery: {
        name: 'Internal 3-Cell Lithium-Ion Battery (e.g. WDX0R, HT03XL)',
        partsCostINR: [1900, 2800],
        partsCostUSD: [28, 40],
        labourINR: [250, 450],
        labourUSD: [15, 25],
        difficulty: 'Beginner - Intermediate',
        diyFeasibility: 'HIGH (DIY Recommended)',
        diyAdvice: 'Simple screwdriver job. Do NOT use metal tweezers to disconnect the battery harness to prevent sparking the power MOSFET.',
        safetyColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
      },
      motherboard: {
        name: 'Motherboard Component-Level Repair (Burnt VRM / DC Short)',
        partsCostINR: [800, 1500],
        partsCostUSD: [10, 20],
        labourINR: [2000, 3800],
        labourUSD: [60, 120],
        difficulty: 'Advanced Specialist',
        diyFeasibility: 'LOW (Technician Essential)',
        diyAdvice: 'Requires hot-air rework station, high-grade microscope, DC power supply, and schematic board-view files. Do not attempt DIY soldering without training.',
        safetyColor: 'text-red-800 bg-red-50 border-red-200'
      },
      keyboard: {
        name: 'Internal Riveted Chiclet Keyboard Replacement',
        partsCostINR: [900, 1600],
        partsCostUSD: [15, 25],
        labourINR: [600, 1100],
        labourUSD: [35, 60],
        difficulty: 'Intermediate - Advanced',
        diyFeasibility: 'MODERATE (Plastic Welds Required)',
        diyAdvice: 'Modern laptop keyboards are melted into the palm-rest via 50+ plastic rivets. Requires plastic re-staking soldering iron tip or palm-rest assembly swap.',
        safetyColor: 'text-amber-800 bg-amber-50 border-amber-200'
      }
    },
    smartphone: {
      screen: {
        name: 'AMOLED / OLED Screen & Digitizer Assembly',
        partsCostINR: [3500, 8500],
        partsCostUSD: [45, 110],
        labourINR: [400, 800],
        labourUSD: [25, 45],
        difficulty: 'Intermediate',
        diyFeasibility: 'MODERATE (Heat-Gun / Suction Required)',
        diyAdvice: 'Requires heating adhesive to 80°C to soften waterproof glue. B-7000 or pre-cut adhesive gasket needed for re-sealing.',
        safetyColor: 'text-amber-800 bg-amber-50 border-amber-200'
      },
      battery: {
        name: 'Phone Battery Replacement with Pull Tabs',
        partsCostINR: [1200, 2400],
        partsCostUSD: [18, 32],
        labourINR: [300, 600],
        labourUSD: [20, 35],
        difficulty: 'Intermediate',
        diyFeasibility: 'HIGH (Follow Pull-Tab Guide)',
        diyAdvice: 'Slowly pull stretch-release adhesive tabs horizontally. NEVER pry with sharp metal tools or puncture battery pouch.',
        safetyColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
      }
    }
  };

  const selectedData =
    (COST_DATA[deviceType] && COST_DATA[deviceType][component]) ||
    COST_DATA.laptop.ram;

  const parts = currency === 'INR' ? selectedData.partsCostINR : selectedData.partsCostUSD;
  const labour = currency === 'INR' ? selectedData.labourINR : selectedData.labourUSD;
  const sym = currency === 'INR' ? '₹' : '$';

  return (
    <div className="py-10 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <Calculator className="w-3.5 h-3.5 text-blue-600" /> Fair-Market Estimator
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight">
              Repair Cost Estimator & DIY Advisor
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Transparent market breakdown of spare parts, labour benchmarks, and DIY feasibility ratings.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currency === 'INR' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currency === 'USD' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Configuration Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Device Category
              </label>
              <select
                value={deviceType}
                onChange={(e) => {
                  setDeviceType(e.target.value);
                  setComponent(e.target.value === 'smartphone' ? 'screen' : 'ram');
                }}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
              >
                <option value="laptop">Laptop / Notebook</option>
                <option value="smartphone">Smartphone</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Component / Repair Type
              </label>
              <select
                value={component}
                onChange={(e) => setComponent(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
              >
                {deviceType === 'laptop' ? (
                  <>
                    <option value="ram">RAM SO-DIMM (Upgrade / Cleaning)</option>
                    <option value="battery">Internal Battery (Replacement)</option>
                    <option value="screen">FHD Screen / Panel (Replacement)</option>
                    <option value="keyboard">Chiclet Keyboard (Keys not working)</option>
                    <option value="motherboard">Motherboard (Component VRM Short)</option>
                  </>
                ) : (
                  <>
                    <option value="screen">Display & Digitizer Glass</option>
                    <option value="battery">Battery Pouch Swap</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Pricing & DIY Verdict Card */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">{selectedData.name}</h3>
                <span className="text-xs text-slate-500">Benchmark estimated fair range</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${selectedData.safetyColor} self-start sm:self-auto`}>
                {selectedData.diyFeasibility}
              </span>
            </div>

            {/* Price Estimates Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-1">
                <span className="text-xs text-slate-500 block font-medium">Estimated Parts Cost</span>
                <span className="text-lg font-bold font-mono text-slate-900 block">
                  {sym}{parts[0]} - {sym}{parts[1]}
                </span>
                <span className="text-[11px] text-slate-400">OEM or Certified Tier-1</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-1">
                <span className="text-xs text-slate-500 block font-medium">Technician Labour Fee</span>
                <span className="text-lg font-bold font-mono text-slate-900 block">
                  {sym}{labour[0]} - {sym}{labour[1]}
                </span>
                <span className="text-[11px] text-slate-400">Standard bench fee</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/30 text-center space-y-1">
                <span className="text-xs text-blue-900 block font-bold">Total Service Centre Cost</span>
                <span className="text-lg font-bold font-mono text-blue-700 block">
                  {sym}{parts[0] + labour[0]} - {sym}{parts[1] + labour[1]}
                </span>
                <span className="text-[11px] text-teal-700 font-semibold">Save {sym}{labour[0]} with DIY</span>
              </div>
            </div>

            {/* Engineering Guidance Note */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5 leading-relaxed">
              <strong className="block text-slate-900 font-semibold flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-blue-600" /> Technician Recommendation & Feasibility:
              </strong>
              <p className="text-slate-600">{selectedData.diyAdvice}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-2 gap-3">
            <span>Always label estimates as estimates. Real vendor pricing may vary by brand.</span>
            <Link
              to="/service-centres"
              className="text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
            >
              Locate Verified Service Centres →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
