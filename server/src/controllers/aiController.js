import { Solution } from '../models/Solution.js';
import { DeviceModel } from '../models/DeviceModel.js';

// Knowledge base of common diagnostic symptoms & hazard keywords
const HAZARD_KEYWORDS = {
  liquid: ['chai', 'coffee', 'water', 'tea', 'juice', 'liquid', 'spill', 'spilled', 'wet', 'rain'],
  battery_bloat: ['swollen', 'bulging', 'bloated', 'trackpad popping', 'swelling', 'puffed'],
  short_circuit: ['smoke', 'burnt', 'burning smell', 'spark', 'popping sound', 'sparked']
};

export const triageProblem = async (req, res, next) => {
  try {
    const { problemText, categoryId, modelId } = req.body;

    if (!problemText) {
      return res.status(400).json({
        success: false,
        message: 'Problem text is required for AI triage.'
      });
    }

    const text = problemText.toLowerCase();

    // 1. Safety Hazard Check
    let hazard = null;
    if (HAZARD_KEYWORDS.liquid.some((k) => text.includes(k))) {
      hazard = {
        type: 'liquid',
        level: 'CRITICAL',
        title: 'LIQUID SPILL DETECTED — STOP IMMEDIATELY',
        message: 'Do NOT attempt to power on or plug in the charger! Electrolysis will rapidly dissolve copper motherboard traces. Disconnect the battery immediately and allow a minimum 48-hour desiccated drying period with 99% isopropyl alcohol flush.'
      };
    } else if (HAZARD_KEYWORDS.battery_bloat.some((k) => text.includes(k))) {
      hazard = {
        type: 'battery_bloat',
        level: 'HAZARDOUS',
        title: 'SWOLLEN LITHIUM BATTERY HAZARD',
        message: 'Lithium polymer cell expansion generates flammable gas. Puncturing the pouch will cause a thermal runaway fire. Remove the battery carefully, do NOT bend or press it, and store in a fireproof container.'
      };
    } else if (HAZARD_KEYWORDS.short_circuit.some((k) => text.includes(k))) {
      hazard = {
        type: 'short_circuit',
        level: 'CRITICAL',
        title: 'BURNT COMPONENT / POWER RAIL SHORT',
        message: 'Power rail MOSFET or ceramic capacitor has suffered dielectric breakdown. Continued power application risks burning adjacent PCB layers beyond repair.'
      };
    }

    // 2. Keyword & Fault Extraction
    const detectedSymptoms = [];
    if (text.includes('black screen') || text.includes('no display') || text.includes('dark screen')) detectedSymptoms.push('Black Screen / No POST');
    if (text.includes('fan spin') || text.includes('fan loud') || text.includes('fan stops')) detectedSymptoms.push('Abnormal Fan Behavior');
    if (text.includes('amber') || text.includes('white') || text.includes('blink') || text.includes('flashing')) detectedSymptoms.push('Diagnostic LED Blink Code');
    if (text.includes('sound') || text.includes('audio') || text.includes('headphone') || text.includes('mic')) detectedSymptoms.push('Audio Codec / Driver Disconnect');
    if (text.includes('freeze') || text.includes('restart') || text.includes('crash')) detectedSymptoms.push('System Unstable Freeze');

    // 3. Match Ranked Solutions
    const searchTerms = detectedSymptoms.length > 0 ? detectedSymptoms.join(' ') : problemText;
    const matchingSolutions = await Solution.find({
      $or: [
        { symptomKeywords: { $in: [new RegExp(text.slice(0, 20), 'i')] } },
        { title: { $regex: text.slice(0, 15), $options: 'i' } },
        { rootCause: { $regex: text.slice(0, 15), $options: 'i' } }
      ]
    })
      .sort({ 'stats.wilsonScore': -1, 'stats.workedCount': -1 })
      .limit(3);

    // Fallback to top Wilson score solutions if query is specific
    const finalSolutions = matchingSolutions.length > 0 ? matchingSolutions : await Solution.find().sort({ 'stats.wilsonScore': -1 }).limit(2);

    res.status(200).json({
      success: true,
      data: {
        hazard,
        detectedSymptoms,
        suggestedActions: [
          'Verify DC charger output voltage with multimeter or tested power brick.',
          'Inspect diagnostic LED status or listen for motherboard beep codes.',
          'Perform a 30-second capacitive flea power discharge before component replacement.'
        ],
        matchingSolutions
      }
    });
  } catch (err) {
    next(err);
  }
};

// Interactive Diagnostic Decision Tree
const DECISION_TREE = {
  root: {
    id: 'root',
    question: 'When you press the power button, what does the primary power LED do?',
    options: [
      { text: 'LED turns on solid and stays on', next: 'step_fan' },
      { text: 'LED turns on for a few seconds then shuts off', next: 'step_power_cycle' },
      { text: 'LED blinks in a rhythmic pattern (Amber / White pulses)', next: 'step_blink_codes' },
      { text: 'Completely dead (No lights, no sound, no reaction)', next: 'step_no_power' }
    ]
  },
  step_fan: {
    id: 'step_fan',
    question: 'Does the internal cooling fan start spinning?',
    options: [
      { text: 'Yes, fan spins normally, but the screen stays completely black', next: 'step_display_check' },
      { text: 'Fan ramps up to 100% full speed immediately', next: 'diag_thermal_post' },
      { text: 'No fan activity at all', next: 'step_display_check' }
    ]
  },
  step_display_check: {
    id: 'step_display_check',
    question: 'Connect an external HDMI monitor or shine a bright flashlight directly at the laptop screen. What do you see?',
    options: [
      { text: 'Faint desktop/logo is visible under the flashlight (No backlight)', next: 'diag_backlight_fuse' },
      { text: 'External monitor displays desktop perfectly; laptop screen remains black', next: 'diag_edp_cable' },
      { text: 'Both laptop screen and external monitor display nothing', next: 'diag_ram_post_freeze' }
    ]
  },
  step_blink_codes: {
    id: 'step_blink_codes',
    question: 'What exact blink pattern does the diagnostic LED produce?',
    options: [
      { text: '3 Amber, 2 White (or 3 beeps / Caps Lock 3 long 2 short)', next: 'diag_ram_post_freeze' },
      { text: '2 Amber, 4 White (or 2 beeps)', next: 'diag_video_ram' },
      { text: '2 Amber, 1 White (CPU failure)', next: 'diag_cpu_failure' }
    ]
  },
  step_no_power: {
    id: 'step_no_power',
    question: 'When the AC charger is plugged in, does the charger LED stay on or turn off?',
    options: [
      { text: 'Charger LED stays on, but laptop still does not react', next: 'diag_dc_in_jack' },
      { text: 'Charger LED immediately turns off when plugged into laptop', next: 'diag_vrm_short' },
      { text: 'Charger has no LED', next: 'diag_dc_in_jack' }
    ]
  },

  // Terminal Diagnosis Nodes
  diag_ram_post_freeze: {
    isTerminal: true,
    title: 'POST Memory Training Freeze / Oxidized RAM Contacts',
    confidence: '95% (Wilson Evidence: 0.5182)',
    explanation: 'The system is powering on and CPU is alive, but the memory controller cannot establish communication with the SO-DIMM RAM stick due to contact oxidation or an S3 deep-sleep latch.',
    recommendedSolutionSlug: 'cmos-deep-drain-and-ram-reseat',
    safetyWarning: 'Unplug AC and disconnect main battery before unseating RAM stick.'
  },
  diag_backlight_fuse: {
    isTerminal: true,
    title: 'Blown Display Backlight Fuse or Bad Inverter',
    confidence: '88%',
    explanation: 'The LCD panel liquid crystals are functioning (confirmed by flashlight test), but the 19V LED backlight power rail fuse on the motherboard has opened.',
    recommendedSolutionSlug: 'cmos-deep-drain-and-ram-reseat',
    safetyWarning: 'Requires board-level multimeter inspection. Do not short fuse with solder.'
  },
  diag_edp_cable: {
    isTerminal: true,
    title: 'Pinched eDP Display Ribbon Cable in Hinge',
    confidence: '92%',
    explanation: 'Since external video works via HDMI, GPU and RAM are functioning. The display ribbon cable is either unseated from motherboard JEDP1 or pinched inside the left hinge.',
    recommendedSolutionSlug: 'cmos-deep-drain-and-ram-reseat',
    safetyWarning: 'Disconnect battery before touching eDP connector to avoid blowing backlight chip.'
  },
  diag_vrm_short: {
    isTerminal: true,
    title: 'Primary 19V Rail Short Circuit (Shorted High-Side MOSFET / Capacitor)',
    confidence: '98%',
    explanation: 'When the charger LED shuts off upon plugging in, the charger internal overcurrent protection tripped due to a direct short circuit to ground on the main 19V VIN power rail.',
    recommendedSolutionSlug: 'cmos-deep-drain-and-ram-reseat',
    safetyWarning: 'Do NOT force power. Requires bench DC power supply with thermal camera or alcohol freeze spray to locate short.'
  },
  diag_dc_in_jack: {
    isTerminal: true,
    title: 'Fractured DC-In Power Harness or Dead CMOS Battery',
    confidence: '85%',
    explanation: 'The DC jack center pin or internal harness wire has fractured from strain, preventing charging current from reaching the battery charge controller IC.',
    recommendedSolutionSlug: 'cmos-deep-drain-and-ram-reseat',
    safetyWarning: 'Inspect center pin inside charging port for plastic breakage.'
  }
};

export const getDecisionTreeNode = async (req, res, next) => {
  try {
    const { nodeId = 'root' } = req.body;
    const node = DECISION_TREE[nodeId] || DECISION_TREE.root;

    let matchedSolution = null;
    if (node.isTerminal && node.recommendedSolutionSlug) {
      matchedSolution = await Solution.findOne({ slug: node.recommendedSolutionSlug });
    }

    res.status(200).json({
      success: true,
      data: {
        node,
        matchedSolution
      }
    });
  } catch (err) {
    next(err);
  }
};

export const visionInspect = async (req, res, next) => {
  try {
    const { imageBase64, imageType = 'error_screen' } = req.body;

    // Simulated OCR & Visual Intelligence Pipeline
    // Returns structured OCR readings, detected error code, and component advice
    res.status(200).json({
      success: true,
      data: {
        ocrConfidence: 0.94,
        detectedText: 'Recovery: Your PC/Device needs to be repaired. Error code: 0xc00000e. A required device isn\'t connected or cannot be accessed.',
        identifiedFault: 'BCD (Boot Configuration Data) Corrupted or NVMe SSD Reseat Required',
        recommendedAction: '1. Reseat NVMe M.2 SSD to clear socket dust. 2. Boot into Windows Recovery Command Prompt and execute bootrec /rebuildbcd.',
        safetyLevel: 'Safe'
      }
    });
  } catch (err) {
    next(err);
  }
};
