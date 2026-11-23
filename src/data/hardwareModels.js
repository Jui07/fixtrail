export const HARDWARE_MODELS = [
  {
    id: "dell-5567",
    brand: "Dell",
    name: "Inspiron 15 5567",
    year: "2017-2019",
    chassisType: "Plastic clam-shell with removable optical drive",
    screws: [
      { id: "hinge", name: "Rear Hinge Screws", size: "M2.5 × 5mm", color: "Silver", count: 2, caution: "Do not overtighten into brass standoff." },
      { id: "base", name: "Chassis Perimeter", size: "M2.0 × 3mm", color: "Black", count: 8, caution: "Shallow holes — long screws will poke keyboard." },
      { id: "battery", name: "Battery Bracket", size: "M2.0 × 4mm", color: "Wafer-head", count: 4, caution: "Keep separated from exterior screws." },
      { id: "dvd", name: "Optical Bay Lock", size: "M2.5 × 8mm", color: "Long Silver", count: 1, caution: "Located under base center rubber bumper." }
    ],
    ramSlots: 2,
    ramType: "DDR4 SODIMM 2400MHz",
    storageType: "2.5\" SATA III + 1x M.2 (non-NVMe in early revs)",
    batteryModel: "WDX0R (42Wh, 11.4V)",
    commonFailure: "RAM unseated (3 Amber, 2 White), slow HDD, hinge stiffening",
    biosKey: "F2",
    bootKey: "F12"
  },
  {
    id: "hp-15cs",
    brand: "HP",
    name: "Pavilion 15-cs series",
    year: "2018-2020",
    chassisType: "Aluminum keyboard deck, plastic base with rear hidden screws under rubber strip",
    screws: [
      { id: "rubber", name: "Under Rear Rubber Foot", size: "M2.5 × 6mm", color: "Black", count: 3, caution: "Gently peel adhesive rubber strip with plastic pry tool." },
      { id: "front", name: "Front Lip Screws", size: "M2.0 × 3.5mm", color: "Silver", count: 3, caution: "Visible screws along angled front edge." }
    ],
    ramSlots: 2,
    ramType: "DDR4 SODIMM 2666MHz",
    storageType: "1x M.2 NVMe PCIe + 1x 2.5\" SATA bay",
    batteryModel: "HT03XL (41.04Wh, 11.55V)",
    commonFailure: "Loose barrel DC jack, cracking hinge plastic mounts",
    biosKey: "F10",
    bootKey: "F9",
    menuKey: "Esc"
  },
  {
    id: "lenovo-ideapad3",
    brand: "Lenovo",
    name: "IdeaPad 3 15IML05",
    year: "2020-2022",
    chassisType: "All-plastic unibody base with side Novo button hole",
    screws: [
      { id: "rear", name: "Top Rear Edge", size: "M2.0 × 6mm", color: "Black", count: 4, caution: "Angle slightly tilted when reinstalling." },
      { id: "middle", name: "Mid Base", size: "M2.0 × 4mm", color: "Black", count: 2, caution: "Flat profile." },
      { id: "front", name: "Front Edge", size: "M2.0 × 3mm", color: "Black", count: 4, caution: "Shortest screws." }
    ],
    ramSlots: 1,
    ramType: "4GB Soldered on board + 1x DDR4 SODIMM",
    storageType: "1x M.2 2280/2242 NVMe + 2.5\" bracket space",
    batteryModel: "L19M3PF3 (45Wh)",
    commonFailure: "Battery cell expansion, soldered RAM degradation, soft hinge screws",
    biosKey: "F2",
    bootKey: "F12"
  },
  {
    id: "asus-x512",
    brand: "Asus",
    name: "VivoBook 15 X512FL",
    year: "2019-2021",
    chassisType: "ErgoLift hinge plastic chassis (lifts base 2° when opened)",
    screws: [
      { id: "corner", name: "ErgoLift Hinge Corners", size: "M2.5 × 6mm", color: "Chrome", count: 2, caution: "Spring tension from hinge mechanism." },
      { id: "bottom", name: "Bottom Perimeter", size: "M2.0 × 4mm", color: "Black", count: 8, caution: "Use plastic spudger around USB ports." }
    ],
    ramSlots: 1,
    ramType: "4GB Soldered + 1x DDR4 SODIMM slot",
    storageType: "1x M.2 NVMe + 1x 2.5\" SATA bay",
    batteryModel: "B21N1818 (37Wh, 7.7V)",
    commonFailure: "Blower fan bearing friction, thermal throttle, ErgoLift hinge binding",
    biosKey: "F2",
    bootKey: "Esc"
  },
  {
    id: "acer-a515",
    brand: "Acer",
    name: "Aspire 5 A515-51G",
    year: "2017-2019",
    chassisType: "Plastic bottom with separate quick-access doors on some revisions",
    screws: [
      { id: "doors", name: "RAM / HDD Hatch Door", size: "M2.0 × 3mm", color: "Black", count: 2, caution: "Do not pry before removing center screw." },
      { id: "perimeter", name: "Full Chassis Perimeter", size: "M2.5 × 5mm", color: "Silver/Black", count: 18, caution: "Large number of screws; record positions." }
    ],
    ramSlots: 1,
    ramType: "4GB or 8GB DDR4 SODIMM",
    storageType: "1x 2.5\" SATA + 1x M.2 SATA/NVMe",
    batteryModel: "AC14B8K (48Wh, 15.2V)",
    commonFailure: "CMOS coin battery exhaustion, SATA HDD cable ribbon fragile latch",
    biosKey: "F2",
    bootKey: "F12"
  }
];
