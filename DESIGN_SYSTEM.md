# FixTrail — Design System & Engineering Specification

> **Identity**: Trusted repair-bench notebook for students. Calm, practical, friendly, zero jargon — written like a senior who has fixed 50 laptops in a Pune hostel.

---

## 1. Design Tokens & Visual Direction

### 1.1 Color Palette
- **Background (Base)**: `#F7F5F0` (Warm off-white repair-bench paper)
- **Ink (Text/Foreground)**: `#1C2321` (High-contrast charcoal ink)
- **Surface / Card**: `#FFFFFF` with subtle border `#E5E2D9`
- **Primary Accent**: `#0F766E` (Deep Teal — confident, grounded)
- **Signal System (Risk Only)**:
  - **Safe**: `#15803D` / Bg: `#DCFCE7` (Level 1 — software / external)
  - **Careful**: `#B45309` / Bg: `#FEF3C7` (Level 2 — screw removal / battery disconnect)
  - **Advanced**: `#B91C1C` / Bg: `#FEE2E2` (Level 3 — thermal paste / display ribbon / board level)
- **Dark Theme (Optional)**: Charcoal `#181A1B`, Card `#222527`, Ink `#E6E4DF` (never pure `#000000`).
- **Forbidden**: Purple/blue SaaS gradients, glassmorphism, floating blur blobs, emoji icons, generic hero sections.

### 1.2 Typography
- **UI & Display**: `Manrope` / `Plus Jakarta Sans` (humane, clean, legible at small sizes)
- **Technical & Diagnostics**: `IBM Plex Mono` (BIOS keys, blink codes, error logs, model numbers, part specs)

### 1.3 Shapes, Borders & Spacing
- **Border Radius**: `10px - 12px`
- **Borders**: Thin `1px solid #E5E2D9`
- **Shadows**: Soft, natural contact shadows (`0 1px 3px rgba(28, 35, 33, 0.05), 0 4px 12px rgba(28, 35, 33, 0.03)`)
- **Spacing Scale**: Strictly `4px / 8px / 12px / 16px / 24px / 32px / 48px`

---

## 2. Seed Data & Realism Guidelines

### 2.1 Believable Indian Student Context
- **Colleges**: COEP Tech Pune, MIT World Peace University Kothrud, PICT Dhankawadi, Sinhgad College of Engineering Vadgaon.
- **Hardware Models**:
  - Dell Inspiron 15 5567 (i5-7200U, AMD Radeon R7 M445, slow HDD, swollen 42Wh battery)
  - HP Pavilion 15-cs (i5-8265U, MX150, loose barrel charging port, fan grinding)
  - Lenovo IdeaPad 3 15IML05 (i3-10110U, broken hinge plastic mounts, RAM upgrade)
  - Asus VivoBook 15 X512FL (ErgoLift hinge binding, keyboard flex)
  - Acer Aspire 5 A515-51G (dual drive SATA+NVMe cable issue, CMOS battery dead)

### 2.2 Microcopy Rules
- Evidence-based metrics: *"Worked for 14 of 19 similar Dell laptops in COEP hostel"*
- Human outcome prompts: *"Did it work?"* with real options:
  - *Yes, completely fixed*
  - *Helped, but issue partially remains*
  - *Didn't solve it*
  - *Got stuck / felt unsafe to continue*
- Feedback microcopy: *"Thanks. Your report helps 12 students with the same Pavilion."*

---

## 3. Core User Flows & Architecture

```
[Landing Page] ── Live verified repair stats & real Pune case study
      │
      ├──> [Triage Flow] ── Conversational step-by-step
      │          ├── Live Safety Banner (Liquid spill / swollen battery warning)
      │          └── Model & Symptom Selector (Big tap cards)
      │
      ├──> [Interactive Walkthrough]
      │          ├── One step per screen (360px mobile-optimized)
      │          ├── Step timer + Keep Screen Awake
      │          ├── "I'm stuck here" peer escalation
      │          └── Offline cached
      │
      ├──> [Quick Hardware Lookups]
      │          ├── Instant BIOS / Boot key search (Big Mono)
      │          └── LED Blink Code & Beep Code decoder
      │
      └──> [Service-Centre Printable Report] ── Form-style PDF/print sheet
```

---

## 4. Component Structure (`/client/src/components/ui`)
- `Button.tsx` (Teal primary, subtle outline, risk-tinted actions)
- `Card.tsx` (12px radius, thin border, warm tone)
- `RiskBadge.tsx` (Safe / Careful / Advanced signal pills)
- `SafetyBanner.tsx` (Instant amber/red alert on liquid spill or swollen pouch)
- `WalkthroughSlide.tsx` (Slide animations, step timer, large touch targets)
- `SkeletonLoader.tsx` (Content placeholder shapes, no circular spinners)
- `MonoTag.tsx` (IBM Plex Mono key labels e.g. `[F12]`, `[Fn + Esc]`, `Amber 3, White 2`)
