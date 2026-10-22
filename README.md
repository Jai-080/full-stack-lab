# Full Stack Web Development Lab 🚀

A comprehensive collection of Full Stack Web Development laboratory exercises, projects, and experiments covering frontend and full-stack MERN architectures.

---

## 📁 Repository Overview

| Directory | Experiment / Project | Tech Stack | Description |
| :--- | :--- | :--- | :--- |
| **`ex1/`** | **Personal Portfolio Website** | React.js, CSS3 | Multi-section developer portfolio with Header, Intro, About, Projects, Contact, and Footer. |
| **`ex2/`** | **Interactive Task Manager / To-Do** | React.js, State & Hooks | To-do application featuring dynamic status cycling (`Pending` ➔ `In Progress` ➔ `Completed`), filtering, and task removal. |
| **`ex3/`** | **Interactive Quiz App** | React.js, Conditional Rendering | Multi-step interactive survey/quiz application with real-time state tracking and summary results. |
| **`ex4/`** | **Multi-Page Web Portal** | React.js, Routing | Multi-view web portal featuring Registration, User Details, and Home components. |
| **`ex5/`** | **Leave Management Form** | React.js, Controlled Components | Employee leave application form with comprehensive validation and structured submission handling. |
| **`ex6/`** | **Microblogging / Post Feed** | Node.js, Express, React.js | Full-stack feed application with Express REST API and responsive React frontend. |
| **`ex7/`** | **Restaurant & Menu Explorer** | Node.js, Express, React.js | Full-stack dining explorer featuring restaurant listings, detailed menu views, and cart/order management. |
| **`ex8/`** | **Online Classifieds Marketplace** | Node.js, Express, MongoDB, Mongoose, React | Full-stack marketplace for listing and discovering products with persistent MongoDB storage and auto-seeding. |

---

## 🛠️ Prerequisites

- **Node.js**: `v16+` or higher recommended
- **npm**: `v8+`
- **MongoDB** (for `ex8`): Local instance running on port `27017` or MongoDB Atlas URI

---

## 🚀 Getting Started

### Running Single-Directory React Projects (`ex1` to `ex5`)

```bash
cd ex1   # or ex2, ex3, ex4, ex5
npm install
npm start
```
The app will launch in your browser at `http://localhost:3000`.

### Running Full-Stack Projects (`ex6` to `ex8`)

For full-stack exercises, start both the backend and frontend services:

#### 1. Backend Server
```bash
cd ex6/backend   # or ex7/backend, ex8/backend
npm install
node server.js
```
The backend server runs on `http://localhost:5000`.

#### 2. Frontend Client
```bash
cd ex6/frontend  # or ex7/frontend, ex8/frontend
npm install
npm start
```
The frontend client runs on `http://localhost:3000`.

---

## 👨‍💻 Author

- **GitHub:** [@Jai-080](https://github.com/Jai-080)
