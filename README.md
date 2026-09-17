# 💼 JobPulse — Multi-Role Career & Mentorship Ecosystem

> **A modern, full-stack career platform uniting Job Seekers, Employers, Mentors, and Administrators.**  
> Built with **Spring Boot 3 (ORM with Spring Data JPA)**, **Neon Serverless PostgreSQL**, **React 19 with 21st.dev / Shadcn UI aesthetics**, and **React Native (Expo)** mobile application.

---

## 🌟 Key Platform Features

### 👤 1. Job Seekers
- **Discover Opportunities:** Search and filter jobs by location, job type (Remote, Contract, Full-time), and salary ranges.
- **1-Click Application:** Apply with resumes, cover letters, and track application status (`Pending`, `Reviewing`, `Shortlisted`, `Accepted`).
- **Continuous Learning:** Access video courses and mentorship modules published by verified trainers.

### 🏢 2. Employers
- **Talent Acquisition:** Post and manage job openings in a dedicated Employer Portal.
- **Candidate Shortlisting:** Review incoming applicant profiles, download resumes, and update application status in real-time.

### 🎓 3. Trainers & Mentors
- **Course Studio:** Publish learning materials, curriculum details, and track student enrollment progress.
- **Mentorship:** Offer guidance and upskilling resources for career switchers.

### 🛡️ 4. Administrators
- **System Analytics:** Track platform KPIs (total users, active postings, applications, system health metrics).
- **User & Content Governance:** Moderate roles, verify accounts, and maintain platform integrity.

---

## 🏗️ Architecture & Technology Stack

```
+---------------------------------------------------------------------------------------+
|                                    CLIENT LAYER                                       |
|  +--------------------------------------------+  +---------------------------------+  |
|  |     Web App (React 19 / Vite / Vercel)     |  |   Mobile App (React Native/Expo)|  |
|  |   - Glassmorphism & 21st.dev UI Aesthetics  |  |   - Job Search & Applications   |  |
|  |   - Lucide Icons & Responsive Design       |  |   - Course Progress Tracking    |  |
|  +---------------------+----------------------+  +----------------+----------------+  |
+------------------------|------------------------------------------|-------------------+
                         |                                          |
                         +--------------------+---------------------+
                                              | HTTPS / JSON REST APIs
                                              v
+---------------------------------------------------------------------------------------+
|                                  BACKEND REST SERVICES                                |
|  Spring Boot 3.2 (Java 17)                                                            |
|   - Spring Security 6 & JJWT (Role-Based Access Control)                              |
|   - Google OAuth2 SSO & 6-Digit Email OTP Verification                                |
|   - Forgot / Reset Password Engine                                                    |
|   - Spring Data JPA & Hibernate ORM                                                   |
+---------------------------------------------+-----------------------------------------+
                                              | JDBC / HikariCP
                                              v
+---------------------------------------------------------------------------------------+
|                                     PERSISTENCE                                       |
|  Neon Serverless PostgreSQL (Cloud Database with Autoscaling & Connection Pooling)    |
+---------------------------------------------------------------------------------------+
```

---

## 🔐 Authentication Engine

- **Google OAuth2 SSO:** Instant one-click authentication with profile synchronization.
- **Email OTP Verification:** JavaMailSender generates time-expiring 6-digit verification codes.
- **Password Recovery Flow:** Secure `forgot-password` $\rightarrow$ `verify OTP` $\rightarrow$ `reset-password` cycle.
- **RBAC (Role-Based Access Control):** Granular permissions for `JOB_SEEKER`, `EMPLOYER`, `TRAINER`, and `ADMIN`.

---

## 🚀 Quick Start & Deployment

### 1. Backend (Spring Boot & Neon PostgreSQL)
```bash
cd backend
# Set your environment variables in application.properties or shell:
export SPRING_DATASOURCE_URL="jdbc:postgresql://<your-neon-pooler-url>/neondb?sslmode=require"
export SPRING_DATASOURCE_USERNAME="<neon-username>"
export SPRING_DATASOURCE_PASSWORD="<neon-password>"

# Run application
./mvnw spring-boot:run
```

### 2. Web Frontend (React + Vercel)
```bash
cd jobbook-frontend
npm install
npm run dev
```
> **Vercel Free Hosting:** Configured with [vercel.json](file:///Users/aflal/jobseeking-platform/jobbook-frontend/vercel.json) for automatic continuous deployment from GitHub.

### 3. Mobile App (React Native / Expo)
```bash
cd mobile
npm install
npx expo start
```

---

## 📡 REST API Directory

| Endpoint | Method | Role / Access | Description |
| :--- | :---: | :---: | :--- |
| `/api/auth/register` | `POST` | Public | Register new user & dispatch email OTP |
| `/api/auth/verify-otp` | `POST` | Public | Verify 6-digit OTP and activate account |
| `/api/auth/google` | `POST` | Public | Google OAuth SSO token verification |
| `/api/auth/login` | `POST` | Public | Authenticate user & return signed JWT |
| `/api/auth/forgot-password`| `POST` | Public | Send password reset OTP |
| `/api/auth/reset-password` | `POST` | Public | Validate OTP and set new password |
| `/api/jobs` | `GET` | Public | List & filter open job openings |
| `/api/jobs` | `POST` | Employer | Post a new job opportunity |
| `/api/applications/apply` | `POST` | Job Seeker | Submit resume application |
| `/api/applications/{id}/status`| `PUT` | Employer | Shortlist or reject applicant |
| `/api/courses` | `GET` | Public | Browse learning courses |
| `/api/courses/{id}/enroll`| `POST` | Job Seeker | Enroll in course |
| `/api/admin/analytics` | `GET` | Admin | Real-time platform KPI metrics |

---

## 🌿 Git Branching Strategy
- **`main`**: Production-ready releases for Vercel deployment.
- **`development`**: Daily active feature branches and integration.
- **`version-2`**: Next-generation upgrades, AI resume matching, and expanded mobile screens.
