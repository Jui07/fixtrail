import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { SafetyBanner } from './ui/SafetyBanner';
import { SignalBadge } from './ui/Badge';
import { Camera, AlertCircle, ArrowRight, CheckCircle2, Upload } from 'lucide-react';

export function TriageIntake({ onCompleteTriage, onShowToast }) {
  const [step, setStep] = useState(1);
  const [hazardType, setHazardType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('Dell');
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [customText, setCustomText] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  const symptoms = [
    {
      id: 'no-post',
      label: 'Powers On, Black Screen',
      subtext: 'Power LED on, fan spins for a few seconds then halts. Pitch black display.',
      risk: 'Careful',
      hazard: null
    },
    {
      id: 'dead',
      label: 'Completely Dead / No Power LED',
      subtext: 'Nothing happens when power button is pressed. Charger light does not respond.',
      risk: 'Careful',
      hazard: null
    },
    {
      id: 'liquid',
      label: 'Liquid Spill (Water, Chai, Coffee)',
      subtext: 'Liquid entered keyboard or bottom vents recently, even if wiped off.',
      risk: 'CRITICAL',
      hazard: 'liquid'
    },
    {
      id: 'swollen',
      label: 'Trackpad Popping Up / Bulging Base',
      subtext: 'Trackpad button feels stiff to click; bottom plastic case seams are gaping open.',
      risk: 'FIRE RISK',
      hazard: 'swollen'
    }
  ];

  const handleTextChange = (val) => {
    setCustomText(val);
    const lower = val.toLowerCase();
    if (lower.includes('chai') || lower.includes('water') || lower.includes('tea') || lower.includes('coffee') || lower.includes('spill') || lower.includes('liquid') || lower.includes('rain')) {
      setHazardType('liquid');
    } else if (lower.includes('swollen') || lower.includes('bulge') || lower.includes('smoke') || lower.includes('bloat')) {
      setHazardType('swollen');
    } else {
      setHazardType(null);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedPhoto(URL.createObjectURL(file));
      onShowToast?.(`Photo attached: ${file.name}`);
    }
  };

  const handleSelectSymptom = (symp) => {
    setSelectedSymptom(symp.id);
    if (symp.hazard) {
      setHazardType(symp.hazard);
    } else {
      setHazardType(null);
    }
  };

  const handleProceed = () => {
    if (!selectedSymptom && !customText) {
      onShowToast?.('Please choose a symptom or describe what happened.');
      return;
    }
    onCompleteTriage({
      brand: selectedBrand,
      symptom: selectedSymptom,
      customNotes: customText,
      hazard: hazardType
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Live Safety Alert Banner if triggered */}
      {hazardType && (
        <SafetyBanner
          type={hazardType}
          onDismiss={() => setHazardType(null)}
        />
      )}

      <Card className="p-6 sm:p-8">
        <div className="border-b border-[#E5E2D9] pb-4 mb-6">
          <div className="flex items-center justify-between text-xs font-mono text-[#525E59]">
            <span>Conversational Intake</span>
            <span>Hostel Triage</span>
          </div>
          <h2 className="text-xl font-bold text-[#1C2321] mt-1.5">What happened to your laptop?</h2>
          <p className="text-xs text-[#525E59] mt-0.5">
            Be honest about hostel accidents. Spilled tea, backpack drops, or 24/7 charging — we diagnose without judging.
          </p>
        </div>

        <div className="space-y-6">
          
          {/* Brand Selector */}
          <div>
            <label className="block text-xs font-bold text-[#1C2321] mb-2 uppercase tracking-wide">
              1. Select Laptop Brand:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {['Dell', 'HP', 'Lenovo', 'Asus', 'Acer'].map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => setSelectedBrand(brand)}
                  className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all ${
                    selectedBrand === brand
                      ? 'bg-[#0F766E] text-white shadow-xs'
                      : 'bg-[#F7F5F0] text-[#1C2321] border border-[#E5E2D9] hover:border-[#0F766E]'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Big Tap Symptom Choices */}
          <div>
            <label className="block text-xs font-bold text-[#1C2321] mb-2 uppercase tracking-wide">
              2. Choose the Observed Symptom:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {symptoms.map((symp) => {
                const isSelected = selectedSymptom === symp.id;
                const isHazard = symp.hazard !== null;
                return (
                  <button
                    key={symp.id}
                    type="button"
                    onClick={() => handleSelectSymptom(symp)}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0F766E] bg-[#F0FDFA] shadow-xs'
                        : isHazard
                        ? 'border-[#FECACA] bg-[#FEF2F2]/60 hover:border-[#EF4444]'
                        : 'border-[#E5E2D9] bg-[#F7F5F0]/60 hover:border-[#0F766E]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[11px] font-mono font-bold ${isHazard ? 'text-[#B91C1C]' : 'text-[#0F766E]'}`}>
                          {symp.risk}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />}
                      </div>
                      <h4 className="text-sm font-bold text-[#1C2321]">{symp.label}</h4>
                      <p className="text-xs text-[#525E59] mt-1 leading-snug">{symp.subtext}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Freeform Notes & Live Safety Analysis */}
          <div>
            <label className="block text-xs font-bold text-[#1C2321] mb-1.5 uppercase tracking-wide">
              3. Or describe in your own words (Live safety detection):
            </label>
            <textarea
              rows={3}
              value={customText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="e.g. My Dell Inspiron LED is blinking 3 amber then 2 white, or spilled water on keyboard last night..."
              className="w-full text-xs font-mono bg-[#F7F5F0] border border-[#E5E2D9] rounded-lg p-3 text-[#1C2321] focus:outline-none focus:ring-2 focus:ring-[#0F766E] resize-none"
            />
            <p className="text-[11px] text-[#525E59] mt-1">
              Typing words like "chai", "liquid", "smoke", or "swollen" engages instant safety alert.
            </p>
          </div>

          {/* Optional Photo Attachment */}
          <div className="pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1C2321] uppercase tracking-wide">
                Optional: Upload Photo of Laptop / Blink Code / Damage
              </label>
              <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-mono text-[#0F766E] hover:underline">
                <Upload className="w-3.5 h-3.5" />
                <span>Choose Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {uploadedPhoto && (
              <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden border border-[#E5E2D9] bg-black">
                <img
                  src={uploadedPhoto}
                  alt="Uploaded hardware defect"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setUploadedPhoto(null)}
                  className="absolute top-2 right-2 bg-black/70 text-white rounded px-2 py-0.5 text-[10px] font-mono"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-[#E5E2D9] flex justify-end">
            <Button
              variant="primary"
              size="lg"
              onClick={handleProceed}
              className="w-full sm:w-auto"
            >
              <span>Analyze & Start Repair Guide</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>

        </div>
      </Card>
    </div>
  );
}
