import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HardwareVisualizer } from './components/HardwareVisualizer';
import { MagneticScrewTray } from './components/MagneticScrewTray';
import { TriageIntake } from './components/TriageIntake';
import { RepairWalkthrough } from './components/RepairWalkthrough';
import { InstantLookup } from './components/InstantLookup';
import { ServiceDocket } from './components/ServiceDocket';
import { Toast } from './components/ui/Toast';
import { CAMPUS_CASES } from './data/cases';

export function App() {
  const [activeTab, setActiveTab] = useState('visualizer');
  const [resolvedCount, setResolvedCount] = useState(14);
  const [activeCase, setActiveCase] = useState(CAMPUS_CASES[0]);
  const [toastInfo, setToastInfo] = useState({ message: '', visible: false });

  const showToast = (msg) => {
    setToastInfo({ message: msg, visible: true });
    setTimeout(() => {
      setToastInfo((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  const handleTriageComplete = (triageData) => {
    showToast(`Triage analyzed: matched ${triageData.brand} repair profile.`);
    setActiveTab('visualizer');
  };

  const handleWalkthroughComplete = (outcome) => {
    if (outcome === 'fixed') {
      setResolvedCount((c) => c + 1);
      showToast('Thanks! Your report helped 12 students with the same Dell Inspiron.');
    } else {
      showToast('Thanks for logging your outcome. Peer engineers alerted.');
    }
    setActiveTab('docket');
  };

  return (
    <div className="min-h-screen bench-dot-grid bg-[#F7F5F0] text-[#1C2321] flex flex-col antialiased pb-20 md:pb-8">
      {/* Navbar with mobile bottom bar & desktop header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        resolvedCount={resolvedCount}
        totalCases={19}
      />

      {/* Main Workbench Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {activeTab === 'visualizer' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <HardwareVisualizer
              onLaunchWalkthrough={() => setActiveTab('walkthrough')}
              onShowToast={showToast}
            />
            <MagneticScrewTray onShowToast={showToast} />
          </div>
        )}

        {activeTab === 'triage' && (
          <div className="animate-in fade-in duration-150">
            <TriageIntake
              onCompleteTriage={handleTriageComplete}
              onShowToast={showToast}
            />
          </div>
        )}

        {activeTab === 'walkthrough' && (
          <div className="animate-in fade-in duration-150">
            <RepairWalkthrough
              onCompleteWalkthrough={handleWalkthroughComplete}
              onShowToast={showToast}
            />
          </div>
        )}

        {activeTab === 'lookup' && (
          <div className="animate-in fade-in duration-150">
            <InstantLookup onShowToast={showToast} />
          </div>
        )}

        {activeTab === 'docket' && (
          <div className="animate-in fade-in duration-150">
            <ServiceDocket caseData={activeCase} />
          </div>
        )}
      </main>

      {/* Toast Feedback */}
      <Toast
        message={toastInfo.message}
        visible={toastInfo.visible}
        onHide={() => setToastInfo((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  );
}

export default App;
