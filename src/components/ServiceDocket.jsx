import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Printer, CheckSquare, ShieldCheck } from 'lucide-react';

export function ServiceDocket({ caseData, onPrint }) {
  const currentCase = caseData || {
    id: 'PUN-5567-09',
    student: 'Tanmay Deshmukh',
    college: 'COEP Tech University, Shivajinagar',
    hostel: 'Hostel Block D, Room 214',
    device: 'Dell Inspiron 15 5567',
    serviceTag: '7G8X922',
    specs: 'Core i5-7200U • 8GB DDR4 • AMD Radeon R7 M445 • 1TB HDD',
    symptomTitle: 'Powers on -> fan spins 4s -> black screen',
    symptomCode: 'LED: 3 Amber, 2 White',
    fixSummary: 'Reseated RAM module, cleaned gold contacts with white vinyl pencil eraser.',
    date: '19-Nov-2026',
    status: 'Verified Repaired'
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Card className="p-6 sm:p-8 bg-white print:border-none print:shadow-none print:p-0">
        
        {/* Docket Header */}
        <div className="flex items-start justify-between pb-4 border-b-2 border-[#1C2321]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#0F766E] uppercase tracking-wider">
              FixTrail Student Hardware Network • Pune Engineering Hub
            </span>
            <h1 className="text-xl font-bold text-[#1C2321] mt-0.5 tracking-tight">
              HOSTEL HARDWARE REPAIR INTAKE DOCKET
            </h1>
          </div>
          <div className="text-right font-mono text-xs">
            <span className="font-bold text-[#1C2321]">DOCKET #{currentCase.id}</span>
            <div className="text-[10px] text-[#525E59] mt-0.5">{currentCase.date} • Pune Bench</div>
          </div>
        </div>

        {/* Student & Machine Meta */}
        <div className="grid grid-cols-2 gap-4 py-4 border-b border-[#E5E2D9] text-xs font-mono">
          <div>
            <span className="text-[10px] text-[#525E59] uppercase font-bold block">Student Credentials</span>
            <span className="font-bold text-[#1C2321] text-sm">{currentCase.student}</span>
            <div className="text-[#525E59]">{currentCase.college}</div>
            <div className="text-[#525E59]">{currentCase.hostel}</div>
          </div>
          <div>
            <span className="text-[10px] text-[#525E59] uppercase font-bold block">Hardware Specifications</span>
            <span className="font-bold text-[#1C2321] text-sm">{currentCase.device}</span>
            <div className="text-[#525E59]">Service Tag: {currentCase.serviceTag}</div>
            <div className="text-[#525E59] text-[11px]">{currentCase.specs}</div>
          </div>
        </div>

        {/* Diagnostic Findings */}
        <div className="py-4 border-b border-[#E5E2D9] space-y-3 text-xs">
          <div>
            <span className="font-mono font-bold text-[11px] text-[#1C2321] uppercase">Reported Failure Mode:</span>
            <p className="mt-1 font-mono text-[#525E59] bg-[#F7F5F0] p-2.5 rounded border border-[#E5E2D9]">
              {currentCase.symptomTitle} ({currentCase.symptomCode})
            </p>
          </div>

          <div>
            <span className="font-mono font-bold text-[11px] text-[#1C2321] uppercase">Action Performed on Bench:</span>
            <p className="mt-1 font-mono text-[#1C2321] bg-[#F0FDFA] p-2.5 rounded border border-[#99F6E4]">
              {currentCase.fixSummary}
            </p>
          </div>

          <div>
            <span className="font-mono font-bold text-[11px] text-[#1C2321] uppercase">Pre-Release Safety Checks:</span>
            <div className="grid grid-cols-2 gap-2 mt-1.5 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded border border-black flex items-center justify-center font-bold text-[9px]">✓</span>
                <span>Charger 19.5V Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded border border-black flex items-center justify-center font-bold text-[9px]">✓</span>
                <span>Zero Liquid Contamination</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded border border-black flex items-center justify-center font-bold text-[9px]">✓</span>
                <span>Battery Pouch Flat (0V Hazard)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded border border-black flex items-center justify-center font-bold text-[9px]">✓</span>
                <span>POST & Windows Boot Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barcode & Verification Sign-off */}
        <div className="pt-4 flex items-center justify-between text-xs font-mono">
          <div>
            <div className="h-7 w-40 bg-black flex items-center justify-center text-white text-[8px] tracking-widest font-mono">
              ||| | |||| || ||| |||| |
            </div>
            <span className="text-[9px] text-[#525E59]">SERIAL VALIDATION VERIFIED</span>
          </div>

          <div className="text-right">
            <div className="border-b border-[#1C2321] w-36 mb-1" />
            <span className="text-[10px] text-[#525E59]">Senior Bench Lead Signature</span>
          </div>
        </div>

        {/* Print Button (Hidden during print) */}
        <div className="no-print mt-6 pt-4 border-t border-[#E5E2D9] flex justify-end">
          <Button
            variant="primary"
            size="md"
            onClick={() => window.print()}
          >
            <Printer className="w-4 h-4 mr-1.5" />
            <span>Print Service Docket</span>
          </Button>
        </div>

      </Card>
    </div>
  );
}
