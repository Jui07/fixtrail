# FixTrail — AI-Powered Device Repair Intelligence Platform

> **Evidence-Based Hardware Troubleshooting & Community Repair Platform**  
> Built with React 18, Node.js/Express, MongoDB 7.0, Tailwind CSS, and the Wilson Lower Confidence Bound algorithm.

---

## 🛠 Features & Capabilities

1. **Premium Interactive Homepage & Animation System (`/`)**:
   - **Digital Circuit Network Background:** High-performance HTML5 Canvas animation generating orthogonal PCB traces, connection nodes, and moving data packets with interactive mouse illumination.
   - **Hero Intelligence Core Animation:** Interactive 3D perspective card with rotating concentric HUD scanning rings, central multimodal processor, peripheral device nodes, and dynamic diagnostic telemetry stream.
   - **Device to Solution Pipeline:** Interactive 5-stage workflow (`DEVICE → SYMPTOM → AI DIAGNOSIS → COMMUNITY KNOWLEDGE → PROVEN SOLUTION`).
   - **Component Failure Mode Explorer:** Interactive inspection of SO-DIMM RAM, CPU VRM power rails, M.2 NVMe SSDs, lithium batteries, and copper heat-pipes with action protocols.
   - **Topology Network:** Visual pathway tracker showing how hardware, symptoms, tests, and real outcomes connect into verified solution trails.

2. **FixTrail AI Intelligence Engine (`/diagnose`)**:
   - **Interactive Diagnostic Decision Tree:** Step-by-step logic branching (Power LED $\to$ Fan activity $\to$ Display backlight test $\to$ Blink codes $\to$ Terminal fault identification).
   - **Conversational NLP Triage:** Instant hazard detection for liquid spills (*chai*, water), burning smells, or swollen lithium-ion pouch cells.
   - **Visual OCR Inspector:** Error screen OCR decoding and component fault analysis.

2. **Bench Hardware Visualizer & Magnetic Screw Tray (`/workbench`)**:
   - Interactive motherboard schematics (Dell Inspiron 15 5567 BAL20, HP Pavilion 15-cs, Lenovo IdeaPad 3).
   - Component guidelines for RAM SO-DIMM oxidation, battery headers, CMOS coin cells, and copper heat-pipes.
   - Color-coded virtual screw organizer (`M2.5 × 8mm`, `M2.0 × 3mm`, `M2.0 × 4mm`, `M2.5 × 5mm`) to prevent motherboard puncturing.

3. **Printable Service Intake Docket (`/docket`)**:
   - Clean, authentic diagnostic bench sheet with printable barcodes, inspection checklist, and technician/customer sign-off blocks.

4. **Evidence-Based Solution Ranking**:
   - Implements the **Wilson Lower Confidence Bound** algorithm for Bernoulli trials:
     $$S_{\text{Wilson}} = \frac{\hat{p} + \frac{z^2}{2N} - z\sqrt{\frac{\hat{p}(1-\hat{p}) + \frac{z^2}{4N}}{N}}}{1 + \frac{z^2}{N}}$$
   - Prevents small-sample bias (14/19 verified hostel fixes decisively outranks a 1/1 claim).

5. **Community Problem Dockets (Stack Overflow Style)**:
   - Technical questions with model tags, error codes, and observable symptoms.
   - Threaded answers, upvoting/downvoting, accepted answer resolution, and reputation points.

6. **Comprehensive Admin Command Center (`/admin`)**:
   - Real-time MongoDB metrics (users, questions, solutions, verified repair counts).
   - User role governance (`user`, `expert`, `moderator`, `admin`).
   - Device catalog management (add categories, manufacturers, models).
   - Immutable security and platform audit log stream.

---

## 🚀 Live Services & Access

- **Web Application:** [http://localhost:3000](http://localhost:3000)
- **AI Diagnostic Tool:** [http://localhost:3000/diagnose](http://localhost:3000/diagnose)
- **Bench Visualizer & Screw Tray:** [http://localhost:3000/workbench](http://localhost:3000/workbench)
- **Printable Service Docket:** [http://localhost:3000/docket](http://localhost:3000/docket)
- **Admin Command Center:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Backend API:** [http://localhost:5000/api/v1](http://localhost:5000/api/v1)

---

## 🔑 Pre-seeded Accounts

| Role | Username / Email | Password | Privileges |
|---|---|---|---|
| **Administrator** | `admin` / `admin@fixtrail.tech` | `AdminPass123!` | Full admin portal access, role management, catalog CRUD |
| **Expert Technician** | `rajesh_tech` / `rajesh.sharma@fixtrail.tech` | `ExpertPass123!` | Publish verified solutions, review community answers |
| **Student Engineer** | `arjun_engg` / `arjun.patil@fixtrail.tech` | `StudentPass123!` | Post dockets, report real-world repair outcomes |

---

## 📁 Monorepo Folder Structure

```
fixtrail/
├── client/                      # React 18 + Vite Frontend SPA
│   ├── src/
│   │   ├── components/common/   # Navbar, Footer
│   │   ├── context/             # AuthContext (JWT/HttpOnly session)
│   │   ├── pages/               # Home, Explore, Questions, Solutions, Diagnose, Workbench, Docket, Admin
│   │   ├── services/            # API client with credentials support
│   │   └── index.css            # Tailwind design tokens
│   └── vite.config.js           # Proxy configuration to backend
├── server/                      # Node.js + Express Backend
│   ├── src/
│   │   ├── config/              # MongoDB connection with retry
│   │   ├── controllers/         # Auth, Devices, Questions, Solutions, Outcomes, AI, Admin, Stats
│   │   ├── middleware/          # JWT Auth, RBAC, Rate Limiters, Centralized Error Handler
│   │   ├── models/              # Mongoose schemas (User, Category, Model, Question, Solution, Outcome, AuditLog)
│   │   ├── routes/              # Express API v1 route definitions
│   │   └── utils/               # Database seeder with realistic engineering cases
│   └── .env                     # Server environment config
└── docs/                        # Architecture & design system documentation
```
