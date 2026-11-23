import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { DeviceCategory } from '../models/DeviceCategory.js';
import { Manufacturer } from '../models/Manufacturer.js';
import { DeviceModel } from '../models/DeviceModel.js';
import { Question } from '../models/Question.js';
import { Answer } from '../models/Answer.js';
import { Solution } from '../models/Solution.js';
import { Outcome } from '../models/Outcome.js';
import { ServiceCentre } from '../models/ServiceCentre.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fixtrail';

const seedDatabase = async () => {
  try {
    console.log('🌱 Connecting to MongoDB for seeding...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected.');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      DeviceCategory.deleteMany({}),
      Manufacturer.deleteMany({}),
      DeviceModel.deleteMany({}),
      Question.deleteMany({}),
      Answer.deleteMany({}),
      Solution.deleteMany({}),
      Outcome.deleteMany({}),
      ServiceCentre.deleteMany({})
    ]);
    console.log('🧹 Purged existing collections.');

    // 1. Create Core Users
    console.log('👤 Seeding Users...');
    const adminUser = await User.create({
      fullName: 'System Administrator',
      username: 'admin',
      email: 'admin@fixtrail.tech',
      passwordHash: 'AdminPass123!',
      role: 'admin',
      reputationPoints: 1250,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isEmailVerified: true
    });

    const expertUser = await User.create({
      fullName: 'Rajesh Sharma',
      username: 'rajesh_tech',
      email: 'rajesh.sharma@fixtrail.tech',
      passwordHash: 'ExpertPass123!',
      role: 'expert',
      reputationPoints: 840,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isEmailVerified: true
    });

    const studentUser = await User.create({
      fullName: 'Arjun Patil',
      username: 'arjun_engg',
      email: 'arjun.patil@fixtrail.tech',
      passwordHash: 'StudentPass123!',
      role: 'user',
      reputationPoints: 65,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      isEmailVerified: true
    });

    // 2. Create 14 Device Categories with Realistic High-Res Photography
    console.log('📱 Seeding 14 Device Categories...');
    const categoriesData = [
      {
        name: 'Laptops',
        slug: 'laptops',
        description: 'Ultrabooks, gaming rigs, student workhorses, and business notebooks.',
        icon: 'Laptop',
        imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
        displayOrder: 1
      },
      {
        name: 'Desktop Computers',
        slug: 'desktop-computers',
        description: 'Custom towers, all-in-one workstations, and mini PC systems.',
        icon: 'Monitor',
        imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80',
        displayOrder: 2
      },
      {
        name: 'Smartphones',
        slug: 'smartphones',
        description: 'Flagships, mid-range phones, screen replacements, and battery service.',
        icon: 'Smartphone',
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
        displayOrder: 3
      },
      {
        name: 'Tablets',
        slug: 'tablets',
        description: 'iPads, Android slates, digitizer glass, and charging port issues.',
        icon: 'Tablet',
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
        displayOrder: 4
      },
      {
        name: 'Smart TVs',
        slug: 'smart-tvs',
        description: 'LED/OLED backlight repair, T-Con boards, power supply capacitors.',
        icon: 'Tv',
        imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
        displayOrder: 5
      },
      {
        name: 'Monitors',
        slug: 'monitors',
        description: 'Gaming monitors, panel lines, flickering power bricks, and DisplayPort handshake.',
        icon: 'TvMinimal',
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
        displayOrder: 6
      },
      {
        name: 'Printers & Scanners',
        slug: 'printers-scanners',
        description: 'Laserjet fusers, ink tank head unclogging, roller feed jams.',
        icon: 'Printer',
        imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=80',
        displayOrder: 7
      },
      {
        name: 'Smartwatches & Wearables',
        slug: 'smartwatches-wearables',
        description: 'Smart bands, smartwatch battery swaps, sensor glass re-adhesion.',
        icon: 'Watch',
        imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
        displayOrder: 8
      },
      {
        name: 'Routers & Networking',
        slug: 'routers-networking',
        description: 'Mesh nodes, Wi-Fi 6 routers, bricked firmware recovery, Ethernet switch ports.',
        icon: 'Wifi',
        imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
        displayOrder: 9
      },
      {
        name: 'Gaming Consoles',
        slug: 'gaming-consoles',
        description: 'PlayStation, Xbox, Nintendo Switch stick drift, HDMI port resoldering.',
        icon: 'Gamepad2',
        imageUrl: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&auto=format&fit=crop&q=80',
        displayOrder: 10
      },
      {
        name: 'Audio & Headphones',
        slug: 'audio-headphones',
        description: 'ANC headphones, Bluetooth earbuds, DACs, amplifier pot crackle.',
        icon: 'Headphones',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        displayOrder: 11
      },
      {
        name: 'Computer Components',
        slug: 'computer-components',
        description: 'Motherboard VRMs, GPU repasting, NVMe controller errors, modular PSUs.',
        icon: 'Cpu',
        imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80',
        displayOrder: 12
      },
      {
        name: 'Smart Home Devices',
        slug: 'smart-home-devices',
        description: 'Smart plugs, robotic vacuum lidar sensors, doorbell power loop.',
        icon: 'Home',
        imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80',
        displayOrder: 13
      },
      {
        name: 'Other Electronic Devices',
        slug: 'other-electronics',
        description: 'Lab bench instruments, drones, soldering stations, micro-controllers.',
        icon: 'Wrench',
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
        displayOrder: 14
      }
    ];

    const categories = await DeviceCategory.insertMany(categoriesData);
    const laptopCat = categories.find((c) => c.slug === 'laptops');
    const phoneCat = categories.find((c) => c.slug === 'smartphones');
    const compCat = categories.find((c) => c.slug === 'computer-components');

    // 3. Create Popular Manufacturers
    console.log('🏭 Seeding Manufacturers...');
    const mfgData = [
      {
        name: 'Dell',
        slug: 'dell',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
        categories: [laptopCat._id, compCat._id],
        websiteUrl: 'https://www.dell.com'
      },
      {
        name: 'HP',
        slug: 'hp',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg',
        categories: [laptopCat._id],
        websiteUrl: 'https://www.hp.com'
      },
      {
        name: 'Lenovo',
        slug: 'lenovo',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg',
        categories: [laptopCat._id, phoneCat._id],
        websiteUrl: 'https://www.lenovo.com'
      },
      {
        name: 'Apple',
        slug: 'apple',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        categories: [laptopCat._id, phoneCat._id],
        websiteUrl: 'https://www.apple.com'
      },
      {
        name: 'ASUS',
        slug: 'asus',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg',
        categories: [laptopCat._id, compCat._id],
        websiteUrl: 'https://www.asus.com'
      },
      {
        name: 'Acer',
        slug: 'acer',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Acer_Logo.svg',
        categories: [laptopCat._id],
        websiteUrl: 'https://www.acer.com'
      },
      {
        name: 'Samsung',
        slug: 'samsung',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
        categories: [phoneCat._id],
        websiteUrl: 'https://www.samsung.com'
      }
    ];

    const manufacturers = await Manufacturer.insertMany(mfgData);
    const dellMfg = manufacturers.find((m) => m.slug === 'dell');
    const hpMfg = manufacturers.find((m) => m.slug === 'hp');
    const lenovoMfg = manufacturers.find((m) => m.slug === 'lenovo');

    // 4. Create Models with Detailed Diagnostic Information
    console.log('💻 Seeding Models...');
    const modelsData = [
      {
        name: 'Inspiron 15 5567',
        slug: 'dell-inspiron-15-5567',
        manufacturerId: dellMfg._id,
        categoryId: laptopCat._id,
        releaseYear: 2017,
        imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80',
        specs: {
          cpu: 'Intel Core i5-7200U / i7-7500U',
          ramType: 'DDR4 2400MHz SO-DIMM (Dual Slot)',
          storageType: '2.5" SATA SSD / HDD',
          batteryModel: 'WDX0R (42Wh, 11.4V, 3-cell)',
          displayResolution: '1920x1080 FHD'
        },
        biosKeys: {
          setupKey: 'F2',
          bootMenuKey: 'F12'
        },
        blinkCodes: [
          { pattern: '3 Amber, 2 White', component: 'Memory / RAM', meaning: 'Memory / RAM subsystem failure or unseated stick', ledColor: 'Amber/White', severity: 'High' },
          { pattern: '2 Amber, 4 White', component: 'Display', meaning: 'Memory of video controller failure / Display handshake', ledColor: 'Amber/White', severity: 'Medium' },
          { pattern: '2 Amber, 1 White', component: 'CPU', meaning: 'Processor subsystem failure', ledColor: 'Amber/White', severity: 'Critical' }
        ],
        screwSpecs: [
          { location: 'Base Cover Outer Perimeter', size: 'M2.5 x 8mm', colorHex: '#2563EB', warning: 'Long screw - do not place in keyboard tray' },
          { location: 'Battery Mounting', size: 'M2.0 x 3mm', colorHex: '#14B8A6', warning: 'Short screw' },
          { location: 'Hard Drive Caddy Bracket', size: 'M3.0 x 3mm', colorHex: '#F59E0B', warning: 'Flat wafer screw' }
        ],
        commonSymptoms: ['Black screen on boot', 'Flashing amber power light', 'Slow booting with 100% disk usage', 'Hinges clicking']
      },
      {
        name: 'Pavilion 15-cs series',
        slug: 'hp-pavilion-15-cs',
        manufacturerId: hpMfg._id,
        categoryId: laptopCat._id,
        releaseYear: 2019,
        imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80',
        specs: {
          cpu: 'Intel Core i5-8265U / i7-8565U',
          ramType: 'DDR4 2666MHz SO-DIMM',
          storageType: 'M.2 NVMe PCIe Gen3 x4',
          batteryModel: 'HT03XL (41Wh, 11.55V)',
          displayResolution: '1920x1080 IPS'
        },
        biosKeys: {
          setupKey: 'F10 (or Esc then F10)',
          bootMenuKey: 'F9'
        },
        blinkCodes: [
          { pattern: 'Caps Lock 3 Long, 2 Short', component: 'Memory / RAM', meaning: 'Memory module initialization error', ledColor: 'White', severity: 'High' },
          { pattern: 'Caps Lock 5 Long, 3 Short', component: 'Motherboard', meaning: 'Embedded controller timeout', ledColor: 'White', severity: 'Critical' }
        ],
        screwSpecs: [
          { location: 'Under Rubber Foot Strips', size: 'M2.5 x 6mm', colorHex: '#2563EB', warning: 'Hidden screws under adhesive' },
          { location: 'Fan Assembly', size: 'M2.0 x 4mm', colorHex: '#14B8A6', warning: 'Low torque required' }
        ],
        commonSymptoms: ['Caps Lock flashing 3 long 2 short', 'Fan spinning loud but no screen', 'Battery plugged in not charging']
      },
      {
        name: 'IdeaPad 3 15ITL6',
        slug: 'lenovo-ideapad-3-15itl6',
        manufacturerId: lenovoMfg._id,
        categoryId: laptopCat._id,
        releaseYear: 2021,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
        specs: {
          cpu: 'Intel 11th Gen Core i3/i5',
          ramType: '4GB/8GB Soldered + 1x SO-DIMM slot',
          storageType: 'M.2 2280 NVMe SSD',
          batteryModel: 'L20L2PF0 (38Wh)',
          displayResolution: '1920x1080 TN/IPS'
        },
        biosKeys: {
          setupKey: 'F2 (or Novo Button Pin)',
          bootMenuKey: 'F12'
        },
        blinkCodes: [
          { pattern: 'Power LED 3 Pulses', component: 'Sleep / Hibernate', meaning: 'System in deep S3/S4 hang', ledColor: 'Amber', severity: 'Low' }
        ],
        screwSpecs: [
          { location: 'Bottom Plate Screws', size: 'M2.0 x 5mm', colorHex: '#2563EB', warning: 'Torx / Phillips PH0' }
        ],
        commonSymptoms: ['Power button LED turns on then turns off after 5 seconds', 'Screen stays black with quiet fan']
      }
    ];

    const models = await DeviceModel.insertMany(modelsData);
    const inspiron = models.find((m) => m.slug === 'dell-inspiron-15-5567');
    const pavilion = models.find((m) => m.slug === 'hp-pavilion-15-cs');
    const ideapad = models.find((m) => m.slug === 'lenovo-ideapad-3-15itl6');

    // 5. Create Documented Solutions with Real Wilson Scores
    console.log('🔬 Seeding Evidence-Ranked Solutions...');
    const sol1 = new Solution({
      title: 'CMOS Deep Drain & RAM Reseat for Black Screen POST Freeze',
      slug: 'cmos-deep-drain-and-ram-reseat',
      description: 'Comprehensive static discharge and dual-channel memory pin cleaning sequence that cures 3 Amber, 2 White blink codes and post-sleep black screen freezes.',
      categoryId: laptopCat._id,
      targetModels: [inspiron._id, pavilion._id, ideapad._id],
      symptomKeywords: ['black screen', 'fan spinning', '3 amber 2 white', 'no display', 'led flashing', 'freeze on boot'],
      errorCodes: ['3-2', 'CAPS-3-2'],
      rootCause: 'Static charge latch-up in the southbridge embedded controller preventing RAM initialization sequence after sudden shutdown or low-voltage AC brownout.',
      steps: [
        {
          stepNumber: 1,
          title: 'Total Power Deprivation',
          instruction: 'Disconnect AC charger. Unscrew the base cover and disconnect the internal main battery header from the motherboard. Never use metal tools on the battery connector.',
          toolRequired: 'Phillips #0 screwdriver, plastic spudger',
          safetyWarning: 'Do NOT puncture the lithium-ion pouch cells. Keep away from metallic surfaces.',
          estimatedMinutes: 5
        },
        {
          stepNumber: 2,
          title: 'Remove CMOS Coin Battery',
          instruction: 'Locate the CR2032 3V coin cell battery. Gently slide the latch to pop out the coin battery (or disconnect the 2-pin bundled CMOS wire on Dell Inspiron 5567).',
          toolRequired: 'Non-conductive nylon probe',
          safetyWarning: 'Note positive (+) polarity facing upward before removal.',
          estimatedMinutes: 3
        },
        {
          stepNumber: 3,
          title: '30-Second Capacitive Flea Power Purge',
          instruction: 'With both batteries disconnected, press and firmly hold down the laptop power button for a continuous 35 seconds. This discharges the capacitors across the motherboard VRM rail.',
          toolRequired: 'None',
          safetyWarning: 'Hold firmly without releasing to guarantee complete bleed-off.',
          estimatedMinutes: 1
        },
        {
          stepNumber: 4,
          title: 'Reseat & Clean RAM Gold Fingers',
          instruction: 'Pop the retention clips of the SO-DIMM RAM stick. Clean the gold edge connector contacts using a clean, dry microfiber cloth or soft eraser to remove oxidation. Re-insert at a 30-degree angle and snap flat.',
          toolRequired: 'Dry microfiber cloth or pencil eraser',
          safetyWarning: 'Avoid touching RAM chips directly with static hands. Touch bare metal chassis first.',
          estimatedMinutes: 6
        },
        {
          stepNumber: 5,
          title: 'Re-arm and Initial POST Training',
          instruction: 'Reconnect CMOS battery, reconnect main battery. Plug in AC power. Press power button. NOTE: The first boot will take up to 90 seconds while the BIOS memory trains. The screen may cycle twice—do not interrupt it.',
          toolRequired: 'AC Charger',
          safetyWarning: 'Be patient! First boot cycles are normal.',
          estimatedMinutes: 3
        }
      ],
      requiredTools: ['Phillips #0 Screwdriver', 'Plastic Prying Spudger', 'Microfiber Cloth / Eraser'],
      difficulty: 'intermediate',
      safetyLevel: 'caution',
      sourceCaseStudy: 'Verified on 19 student laptops across Pune engineering hostel benches (COEP, PICT). Worked for 14 machines directly.',
      authorId: expertUser._id,
      stats: {
        totalAttempts: 19,
        workedCount: 14,
        partlyWorkedCount: 2,
        failedCount: 3,
        wilsonScore: 0.5182,
        evidenceLevel: 'Bench-Verified'
      },
      verifiedEvidenceCount: 8
    });
    await sol1.save();

    const sol2 = new Solution({
      title: 'Realtek Audio Codec Driver Rollback for Sudden Microphone & Headphone Jack Mute',
      slug: 'realtek-audio-driver-rollback',
      description: 'Resolves generic Windows Update driver conflicts that cause "No Audio Output Device is Installed" error and crackling 3.5mm headset jack.',
      categoryId: laptopCat._id,
      targetModels: [inspiron._id, pavilion._id],
      symptomKeywords: ['no sound', 'microphone not working', 'red x on speaker', 'realtek', 'headphone jack not detected'],
      errorCodes: ['CODE-10', 'CODE-43'],
      rootCause: 'Windows Update overwriting OEM Waves MaxxAudio / Realtek High Definition Audio driver with generic Intel High Definition Audio SST endpoint.',
      steps: [
        {
          stepNumber: 1,
          title: 'Open Device Manager',
          instruction: 'Press Windows + X, select Device Manager. Expand "Sound, video and game controllers".',
          toolRequired: 'Keyboard',
          estimatedMinutes: 2
        },
        {
          stepNumber: 2,
          title: 'Select "Have Disk" Legacy Driver',
          instruction: 'Right-click Realtek Audio -> Update Driver -> Browse my computer -> Let me pick from a list of available drivers on my computer. Select "High Definition Audio Device" (standard Microsoft) or official Realtek 6.0.x signed driver.',
          toolRequired: 'Mouse',
          estimatedMinutes: 4
        },
        {
          stepNumber: 3,
          title: 'Restart & Test',
          instruction: 'Reboot system. Test 3.5mm headphone jack toggle in sound control panel.',
          toolRequired: 'None',
          estimatedMinutes: 2
        }
      ],
      requiredTools: ['None (Software)'],
      difficulty: 'beginner',
      safetyLevel: 'safe',
      sourceCaseStudy: 'Tested on Dell Inspiron 5567 audio failure cases after Windows 11 22H2 update.',
      authorId: expertUser._id,
      stats: {
        totalAttempts: 12,
        workedCount: 10,
        partlyWorkedCount: 1,
        failedCount: 1,
        wilsonScore: 0.5638,
        evidenceLevel: 'High'
      },
      verifiedEvidenceCount: 6
    });
    await sol2.save();

    // 6. Create Questions & Answers
    console.log('💬 Seeding Questions and Answers...');
    const q1 = await Question.create({
      title: 'Dell Inspiron 15 5567 power light flashes 3 amber, 2 white with black screen',
      slug: 'dell-inspiron-5567-3-amber-2-white-black-screen',
      description: 'Yesterday during exam prep in hostel, my laptop suddenly went dark. When I press the power button, the fan spins for 4 seconds, screen remains completely black, and the front diagnostic LED blinks 3 Amber followed by 2 White. Screen backlight does not turn on. What is the verified fix?',
      authorId: studentUser._id,
      categoryId: laptopCat._id,
      manufacturerId: dellMfg._id,
      modelId: inspiron._id,
      osVersion: 'Windows 11 23H2',
      biosVersion: '1.2.8',
      symptoms: ['Black screen', 'Fan spins briefly then stops', '3 amber 2 white blink code'],
      errorCodes: ['3-Amber 2-White'],
      troubleshootingAttempted: 'Plugged in different charger, tried external HDMI monitor (no signal).',
      tags: ['dell', 'inspiron', 'black-screen', 'blink-code', 'ram'],
      score: 18,
      views: 342,
      status: 'resolved',
      answersCount: 1
    });

    const ans1 = await Answer.create({
      questionId: q1._id,
      authorId: expertUser._id,
      content: 'This 3 Amber, 2 White code on 7th-gen Dell Inspirons indicates that the memory module has either oxidized pins or the embedded controller is stuck in an S3 sleep training loop.\n\nI have fixed over 14 of these in our college workshop using the CMOS deep-drain and eraser cleaning sequence. Follow the steps below carefully.',
      steps: [
        {
          stepNumber: 1,
          title: 'Disconnect Battery and CMOS',
          instruction: 'Take off back cover (keep screws organized!). Unplug main battery and small CMOS battery connector.',
          toolRequired: 'PH0 screwdriver, plastic pick'
        },
        {
          stepNumber: 2,
          title: '30-Second Flea Power Drain',
          instruction: 'Hold power button down for 35 seconds to reset the southbridge register.',
          toolRequired: 'None'
        },
        {
          stepNumber: 3,
          title: 'Clean RAM Contacts with Eraser',
          instruction: 'Take out the DDR4 stick. Rub a soft white pencil eraser lightly over both sides of the gold pins to remove the invisible gray oxide film. Brush away all eraser shavings.',
          toolRequired: 'Pencil eraser'
        }
      ],
      requiredTools: ['PH0 Screwdriver', 'Plastic spudger', 'Pencil eraser'],
      difficulty: 'intermediate',
      safetyLevel: 'caution',
      safetyPrecautions: 'Do not use a damp cloth. Disconnect the charger before opening the laptop.',
      score: 22,
      isAccepted: true,
      expertReviewedBy: expertUser._id,
      expertReviewNotes: 'Verified procedure aligned with Dell Service Manual 5567 section 24.'
    });

    q1.acceptedAnswerId = ans1._id;
    await q1.save();

    // 7. Seed Outcomes for sol1
    console.log('📊 Seeding Repair Outcomes for Statistical Verification...');
    const outcomeRecords = [];
    for (let i = 0; i < 14; i++) {
      outcomeRecords.push({
        userId: expertUser._id,
        solutionId: sol1._id,
        questionId: q1._id,
        status: 'worked',
        notes: `Hostel bench test #${i + 1}: RAM stick gold pins cleaned with eraser, laptop booted into BIOS POST after 45s training.`,
        attemptDurationMin: 18,
        confirmedAfter24h: true
      });
    }
    for (let i = 0; i < 2; i++) {
      outcomeRecords.push({
        userId: studentUser._id,
        solutionId: sol1._id,
        status: 'partly_worked',
        notes: 'Screen turned on, but had to replace one bad RAM stick in slot 2.',
        attemptDurationMin: 25,
        confirmedAfter24h: true
      });
    }
    for (let i = 0; i < 3; i++) {
      outcomeRecords.push({
        userId: studentUser._id,
        solutionId: sol1._id,
        status: 'nothing_worked',
        notes: 'Motherboard had burnt power MOSFET near DC jack, required component-level board repair.',
        attemptDurationMin: 35,
        confirmedAfter24h: false
      });
    }

    await Outcome.insertMany(outcomeRecords);

    // 8. Seed Verified Service Centres
    console.log('🏢 Seeding Verified Service Centres...');
    await ServiceCentre.insertMany([
      {
        name: 'Dell Exclusive & Authorized Care Hub',
        city: 'Pune',
        address: 'Shop 14, Deccan Gymkhana, Jangali Maharaj (JM) Road, Pune, Maharashtra 411004',
        phone: '+91 20 2553 4410',
        email: 'support.pune@dellcarehub.in',
        supportedBrands: ['Dell', 'Alienware'],
        rating: 4.8,
        reviewCount: 312,
        isAuthorizedOEM: true,
        timings: 'Mon - Sat: 10:00 AM - 7:30 PM'
      },
      {
        name: 'HP World Official Service Center',
        city: 'Pune',
        address: 'Opposite Ferguson College Main Gate, FC Road, Shivajinagar, Pune 411005',
        phone: '+91 20 2567 8891',
        email: 'pune.fc@hpcare.com',
        supportedBrands: ['HP', 'Compaq', 'Omen'],
        rating: 4.6,
        reviewCount: 245,
        isAuthorizedOEM: true,
        timings: 'Mon - Sat: 10:30 AM - 8:00 PM'
      },
      {
        name: 'Lenovo Exclusive Service Point',
        city: 'Pune',
        address: 'Karve Road, Near Nal Stop, Kothrud, Pune 411038',
        phone: '+91 20 2544 1120',
        email: 'service.kothrud@lenovopune.in',
        supportedBrands: ['Lenovo', 'Motorola', 'ThinkPad'],
        rating: 4.7,
        reviewCount: 189,
        isAuthorizedOEM: true,
        timings: 'Mon - Sat: 10:00 AM - 7:00 PM'
      },
      {
        name: 'Unicorn Apple Authorised Service Provider',
        city: 'Pune',
        address: 'Phoenix Marketcity Mall, Ground Floor, Viman Nagar, Pune 411014',
        phone: '+91 20 6689 0100',
        email: 'service.pune@unicornstore.net',
        supportedBrands: ['Apple'],
        rating: 4.9,
        reviewCount: 520,
        isAuthorizedOEM: true,
        timings: 'Mon - Sun: 11:00 AM - 8:30 PM'
      },
      {
        name: 'Hostel Engineering Hardware Repair Desk',
        city: 'Pune',
        address: 'COEP Hostel Workshop, Wellesley Road, Shivajinagar, Pune 411005',
        phone: '+91 98230 45199',
        email: 'bench@fixtrail.tech',
        supportedBrands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer'],
        rating: 4.9,
        reviewCount: 94,
        isAuthorizedOEM: false,
        timings: 'Mon - Sat: 5:00 PM - 10:00 PM'
      }
    ]);

    console.log('✅ Database successfully seeded with authentic, realistic FixTrail records!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedDatabase();
