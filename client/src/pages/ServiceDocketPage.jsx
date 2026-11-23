import React from 'react';
import { Printer, ArrowLeft, ShieldCheck, CheckSquare, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServiceDocketPage = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-10 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="no-print flex items-center justify-between">
          <Link
            to="/dashboard"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> Print Service Docket
          </button>
        </div>

        {/* Printable Physical Sheet */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-card text-slate-800 space-y-8 font-sans print:border-none print:shadow-none print:p-0">
          {/* Top Header & Barcode */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-slate-900 pb-6 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-900">FixTrail</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                  BENCH DOCKET
                </span>
              </div>
              <p className="text-xs text-slate-500">Hostel & Student Engineering Repair Desk</p>
              <p className="text-[11px] text-slate-400 font-mono">ISO/Bench Evidence Code: WD-951</p>
            </div>

            <div className="text-right font-mono">
              <span className="text-2xl font-bold tracking-widest block font-mono text-slate-900">
                ||| | |||| || ||| |||| |
              </span>
              <span className="text-xs text-slate-500 block">DOCKET #FT-2026-09824</span>
              <span className="text-[11px] text-slate-400">Date: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Client & Device Information Grid */}
          <div className="grid grid-cols-2 gap-6 text-xs border-b border-slate-200 pb-6">
            <div className="space-y-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                1. Hardware Identification
              </span>
              <div><strong className="text-slate-500">Device Model:</strong> Dell Inspiron 15 5567 (BAL20)</div>
              <div><strong className="text-slate-500">Serial / Service Tag:</strong> 7X92KL1</div>
              <div><strong className="text-slate-500">Processor / RAM:</strong> Core i5-7200U / 8GB DDR4</div>
              <div><strong className="text-slate-500">Operating System:</strong> Windows 11 23H2 (Build 22631)</div>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                2. Intake Details & Custody
              </span>
              <div><strong className="text-slate-500">Reported By:</strong> Arjun Patil (Student ID: COEP-2024-81)</div>
              <div><strong className="text-slate-500">Bench Assigned:</strong> Bench #3 (Lead: Rajesh Sharma)</div>
              <div><strong className="text-slate-500">Intake Condition:</strong> Complete black screen; power LED 3A/2W</div>
              <div><strong className="text-slate-500">Charger Supplied:</strong> Yes (Dell 45W Barrel Adapter)</div>
            </div>
          </div>

          {/* Diagnostic Inspection Checklist */}
          <div className="space-y-3 border-b border-slate-200 pb-6 text-xs">
            <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
              3. Bench Safety Inspection Checklist
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Charger output tested with DMM (19.5V confirmed nominal)',
                'Visual check for liquid ingress / copper corrosion traces (Clean)',
                'Lithium battery pouch inspected for swelling (Normal)',
                'Main internal battery disconnected before tool touch',
                'Capacitive flea drain executed (35-second power hold)',
                'RAM SO-DIMM contact pins cleaned with dry eraser'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-slate-400 rounded flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sign-off Block */}
          <div className="grid grid-cols-2 gap-12 pt-4 text-xs">
            <div className="space-y-8">
              <div>
                <strong className="block text-slate-900 mb-1">Assigned Technician Sign-off:</strong>
                <p className="text-slate-500 text-[11px]">Procedure executed per Wilson Benchmark #5567</p>
              </div>
              <div className="border-t border-slate-400 pt-2 text-[11px] text-slate-600 font-mono">
                Technician Signature / Date
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <strong className="block text-slate-900 mb-1">Customer / Student Sign-off:</strong>
                <p className="text-slate-500 text-[11px]">Received device in functioning POST state</p>
              </div>
              <div className="border-t border-slate-400 pt-2 text-[11px] text-slate-600 font-mono">
                Student Signature / Date
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
