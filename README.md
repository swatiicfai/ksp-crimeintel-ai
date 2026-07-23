# 🚓 KSP CrimeIntel AI — Intelligent Conversational AI for KSP Crime Database

> **Official Repository:** [https://github.com/swatiicfai/ksp-crimeintel-ai](https://github.com/swatiicfai/ksp-crimeintel-ai)  
> **Developed for Karnataka State Police Datathon 2026 (KSPH26 / Hack2Skill)**  
> **Deployed Exclusively on Zoho Catalyst Platform (Project: Project-Rainfall, ID: 48882000000013025)**

---

## 📌 Overview
**KSP CrimeIntel AI** is a state-of-the-art Conversational AI and Crime Intelligence Platform designed to transform how investigators, crime analysts, and senior police officials interact with state crime databases.

By converting natural language queries into automated spatial heatmaps, offender network graphs, and criminological insights, KSP CrimeIntel AI enables **proactive, evidence-based law enforcement**.

---

## 🛠️ Native Zoho Catalyst Cloud Architecture

| Capability | Catalyst Required Service | Implementation Detail |
| :--- | :--- | :--- |
| **Frontend Web Hosting** | Catalyst Web Client Hosting | React 18 SPA + Leaflet + Vis.js Network Canvas |
| **Serverless Backend** | Catalyst Serverless Functions | Text-to-SQL logic, intent routing, and spatial calculations |
| **LLM & RAG Engine** | Catalyst QuickML (LLM Serving, RAG) | Semantic search over FIRs and MO pattern recognition |
| **Voice Services** | Catalyst Zia Services | Speech-to-Text & English-Kannada translation |
| **Report Generation** | Catalyst SmartBrowser | Headless browser rendering of executive SCRB PDF briefs |
| **Relational DB** | Catalyst Data Store | Structured crime records, suspect metadata, & coordinates |
| **Authentication** | Catalyst Authentication | Role-based officer access (Station Officer vs. SCRB Admin) |

---

## ✨ Key Features
- 🗣️ **Multilingual Query Support:** Natural language search in English and Kannada (Text & Voice).
- 🗺️ **Geospatial Crime Hotspots:** Interactive maps visualizing crime density, time-of-day patterns, and station jurisdictions.
- 🕸️ **Criminal Network & MO Analysis:** Node-edge graph visualization of suspects, accomplices, and modus operandi similarity.
- 📊 **Socio-Demographic Profiling:** Offender age groups, recidivism risk scores, and socio-economic driver analysis.
- ⚡ **Proactive Risk Intelligence:** Predictive risk mapping for strategic patrol allocation.
- 📄 **1-Click Executive Reports:** Instant PDF generation for SCRB and senior officer briefings.

---

## 🚀 Setup & Catalyst Deployment

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/swatiicfai/ksp-crimeintel-ai.git
   cd ksp-crimeintel-ai
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

4. **Deploy to Zoho Catalyst:**
   ```bash
   npm run build
   catalyst deploy
   ```

---

## 📄 License
Developed for Karnataka State Police Datathon 2026 evaluation.
