# Soochana Setu — Unified Inter-Ministry Beneficiary Intelligence System

## 🚨 Problem

Government systems operate in silos:

* Ministries don’t share data
* State and central schemes overlap
* Citizens are duplicated or excluded

*Result:*

* ❌ Duplicate benefits (fraud)
* ❌ Eligible citizens left out
* ❌ No unified visibility

---

## 💡 Solution

*Samanvay AI* is a full-stack, inter-ministry intelligence platform that:

* Unifies fragmented data across ministries
* Detects fraud and duplication
* Identifies excluded citizens
* Simulates policy impact before rollout
* Provides a unified citizen + admin dashboard

---

## 🧠 Core AI Features (Backend)

### 1. AI Data Translator

* Normalizes inconsistent ministry data
* Handles name, address, schema differences

### 2. Entity Resolution Engine

* Detects same person across datasets
* Creates unified profiles with confidence scores

### 3. Fraud Detection Engine

* Identifies duplicate beneficiaries across ministries
* Detects cross-scheme abuse

### 4. Inclusion Gap Detector

* Finds eligible citizens not receiving benefits

### 5. Policy Impact Simulator

* Predicts outcomes of new schemes
* Detects overlap and exclusion before rollout

### 6. Citizen Recommendation Engine

* Suggests schemes across ministries
* Explains eligibility using AI

### 7. Predictive Fraud AI

* Flags high-risk profiles before fraud occurs

---

## 🖥️ Frontend Features

### 👤 Citizen Portal

* Login using ID
* View benefits across ministries
* See missing schemes
* AI explanation: "Why you qualify"
* Estimated benefits (received vs missing)
* Alerts: "You might be overlooked"
* Download eligibility report

### 🏛️ Admin Dashboard

* Inter-ministry analytics
* Fraud detection view
* Inclusion gap view
* Predictive fraud insights
* Policy simulation results
* AI-generated insights and summaries

---

## 🏗️ Architecture

### Backend

* Node.js (Next.js API Routes)
* Supabase (PostgreSQL + Storage)
* Mistral AI (AI layer)

### Frontend

* React / HTML / CSS / JS
* Dashboard UI

---

## 🗄️ Database Tables

* beneficiaries
* unified_profiles
* mappings
* fraud_flags
* inclusion_flags
* citizen_profiles
* documents

---

## 🔌 API Endpoints

### Core APIs

| Endpoint             | Purpose                    |
| -------------------- | -------------------------- |
| /api/upload-data     | Upload CSV                 |
| /api/unify-data      | Normalize + merge data     |
| /api/detect-fraud    | Detect duplicates          |
| /api/find-exclusion  | Find missing beneficiaries |
| /api/simulate-policy | Predict policy impact      |

### Citizen APIs

| Endpoint               | Purpose                       |
| ---------------------- | ----------------------------- |
| /api/citizen-insights  | Recommendations + eligibility |
| /api/citizen-dashboard | Unified citizen view          |

### Admin APIs

| Endpoint                     | Purpose           |
| ---------------------------- | ----------------- |
| /api/interministry-analytics | Regional insights |
| /api/predictive-fraud        | Fraud prediction  |

---

## 🎬 Demo Flow

### Step 1: Upload Data

* Upload Health, Education, Welfare datasets

### Step 2: Unify Data

* AI cleans and merges data
* Creates unified profiles

### Step 3: Detect Fraud

* Shows duplicate beneficiaries

### Step 4: Find Exclusion

* Shows eligible but missing citizens

### Step 5: Simulate Policy

* Predicts impact of new scheme

### Step 6: Citizen Login

* View benefits, missing schemes, AI explanations

### Step 7: Admin Dashboard

* View fraud, inclusion gaps, analytics

---

## 🔄 System Flowchart

mermaid
flowchart TD

A[Upload CSV Data] --> B[AI Data Translator]
B --> C[Entity Resolution Engine]
C --> D[Unified Profiles]

D --> E[Fraud Detection]
D --> F[Inclusion Detection]
D --> G[Policy Simulator]

D --> H[Citizen Insights API]
H --> I[Citizen Dashboard]

E --> J[Fraud Flags]
F --> K[Inclusion Flags]
G --> L[Policy Output]

J --> M[Admin Dashboard]
K --> M
L --> M

M --> N[Inter-Ministry Analytics]
N --> O[Predictive Fraud AI]

O --> P[Insights & Reports]


---

## 🌍 Real-World Impact

* Eliminates duplicate beneficiaries
* Improves welfare distribution
* Identifies excluded citizens
* Enables data-driven policy decisions
* Increases transparency and trust

---

## ⚡ Key Highlights

* Inter-ministry integration
* Fully AI-driven system
* Citizen + Admin dashboards
* Real-world problem solving
* Strong hackathon demo potential

---

## 🧩 Future Scope

* Blockchain audit layer
* Real-time government integration
* Advanced ML fraud detection

---

## 👨‍💻 Team Structure

* Backend + AI
* Frontend
* Integration / Blockchain

---

## 🏁 Conclusion

Samanvay AI transforms fragmented government systems into a unified, intelligent, and transparent ecosystem.

*"Right benefit to the right citizen — exactly once."*
