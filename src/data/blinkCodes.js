export const DIAGNOSTIC_BLINK_CODES = [
  {
    brand: "Dell",
    pattern: "3 Amber, 2 White",
    amber: 3,
    white: 2,
    meaning: "Memory / RAM Subsystem Failure",
    details: "The laptop detects power but cannot read SPD data or train RAM frequency. 80% caused by dust or oxidation, not burnt RAM.",
    fix: "Reseat SODIMM module into Slot A. Clean gold pins with clean eraser.",
    risk: "Careful"
  },
  {
    brand: "Dell",
    pattern: "2 Amber, 1 White",
    amber: 2,
    white: 1,
    meaning: "CPU Failure / VCore Regulator Fault",
    details: "Processor VRM (voltage regulator module) failed to supply 1.05V core power or CPU thermal fuse tripped.",
    fix: "Perform cold EC reset (hold power button for 30s with battery disconnected). If persistent, requires technician board repair.",
    risk: "Advanced"
  },
  {
    brand: "Dell",
    pattern: "2 Amber, 7 White",
    amber: 2,
    white: 7,
    meaning: "LCD Display Cable (eDP) Not Detected",
    details: "Motherboard cannot communicate with display panel logic board. Often pinched inside left hinge.",
    fix: "Inspect 30-pin/40-pin eDP display connector latch under heatsink.",
    risk: "Careful"
  },
  {
    brand: "Dell",
    pattern: "3 Amber, 3 White",
    amber: 3,
    white: 3,
    meaning: "BIOS Recovery Image Missing",
    details: "BIOS firmware was corrupted during an interrupted update or low battery event.",
    fix: "Hold [Ctrl + Esc] while plugging in AC power to trigger Dell BIOS Auto-Recovery mode.",
    risk: "Safe"
  },
  {
    brand: "Dell",
    pattern: "3 Amber, 4 White",
    amber: 3,
    white: 4,
    meaning: "Real-Time Clock (RTC) Coin Cell Exhausted",
    details: "CR2032 voltage has dropped below 2.75V threshold. Laptop loses system date/time when battery is empty.",
    fix: "Replace CR2032 3V coin cell (₹25 at electrical shop).",
    risk: "Safe"
  },
  {
    brand: "HP",
    pattern: "3 Slow Blinks, 2 Fast Blinks (Caps Lock)",
    amber: 3,
    white: 2,
    meaning: "Memory Module Error",
    details: "HP uses white Caps Lock LED rhythm for POST failure before display turns on.",
    fix: "Reseat memory stick in secondary SODIMM slot.",
    risk: "Careful"
  },
  {
    brand: "HP",
    pattern: "5 Slow Blinks, 3 Fast Blinks (Caps Lock)",
    amber: 5,
    white: 3,
    meaning: "Motherboard / Embedded Controller Failure",
    details: "Hardware component or power rail failed to reach power-good state.",
    fix: "Disconnect AC & battery, hold power button 20s, reconnect with AC only.",
    risk: "Careful"
  }
];
