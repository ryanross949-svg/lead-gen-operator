Live Demo: https://lead-gen-operator.vercel.app

⚙️ Lead Generation Operator System
This is not just a dashboard; it is a step-by-step decision assistant and learning engine designed for connecting buyers and sellers (TikTok / e-commerce focus). It transitions the user from a "reactive worker" to a "system-driven operator" by enforcing rules, tracking daily execution, and logging feedback loops.

🧠 Core Philosophy
This app is a Hybrid Intelligence System.

Human: Does the real-time reasoning and extraction of insights.
System: Provides structure, memory, pattern detection, and enforces discipline.
✨ Features
1. Daily Execution System (/execute)
Your mission control. Features a daily objective, a trackable checklist, a 30-minute focus session timer, a daily scoreboard, and a rule enforcer to log violations.

2. Operator Cockpit (/)
An action-driven dashboard. Instead of a passive list, it features an "Action Queue" (what to do right now), a simplified pipeline, a "Ready to Connect" panel, and an intelligence snapshot.

3. Deal Assistant (/assistant)
A real-time execution engine. Select "what just happened" (e.g., Seller ghosted, Buyer interested) to instantly get the exact script, the reasoning behind it, and the strict next action.

4. Conversation OS (/scripts)
The intelligence layer. Replaces generic script generators with a system of decision rules, an interpretation table, mental models, and message frameworks.

5. Qualification System (/qualify)
An adaptive, behavior-based filter. Uses intent-first logic for buyers (Intent + Budget required) and cooperation logic for sellers to output: ✅ Qualified, ⚠️ Risky, ❌ Reject, or 🚨 Dangerous.

6. Feedback & Rule Engine (/feedback)
A fast-capture system (<60 seconds) to log conclusions. It automatically extracts your "Rule Updates" into an Active Rule Library and tracks your top failure causes.

7. Operator Playbook (/playbook)
A daily operating manual. Contains non-negotiable foundational rules, common failure patterns, and mental models for operating in the market.

🛠️ Tech Stack
Framework: Next.js 14+ (App Router)
Styling: Tailwind CSS + shadcn/ui
Database: PostgreSQL (Supabase) via Prisma ORM
State Management: Zustand + React Hook Form
Logic: 100% local deterministic algorithms and template literals (No paid AI APIs)
🚀 Getting Started (Local Development)
Clone the repository
git clone https://github.com/yourusername/lead-gen-operator.gitcd lead-gen-operator
Install dependencies
bash

npm install
Set up environment variables
Create a .env file in the root directory and add your Supabase database URL:
env

DATABASE_URL="postgresql://user:password@host:port/dbname?pgbouncer=true&connection_limit=1"
Push the database schema
bash

npx prisma db push
Run the development server
bash

npm run dev
Open http://localhost:3000 in your browser.
☁️ Deployment (Vercel + Supabase)
This application is optimized for deployment on Vercel.

Push your code to GitHub.
Import the repository into Vercel.
Add your DATABASE_URL (including the ?pgbouncer=true parameter) to the Vercel Environment Variables.
Deploy. The postinstall script will automatically run prisma generate during the build process.
text


4. Save the file (`Ctrl + S`).

### Step 2: Push it to GitHub
1. Go to your VS Code terminal.
2. Run these three commands:
   ```powershell
   git add .
   git commit -m "Update README with final architecture and deployment details"
   git push