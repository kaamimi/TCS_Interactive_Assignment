# TCS Interactive Assignment

A full-stack React + Node.js application with user authentication, protected routes, and a dashboard.

## Overview
This project includes:
- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected dashboard access
- Persistent login via localStorage
- React frontend with Vite and React Router
- Express backend API

## Tech Stack
- Frontend: React, Vite, React Router
- Backend: Node.js, Express
- Authentication: JWT, bcrypt
- State: localStorage for session persistence

## Prerequisites
Make sure you have the following installed:
- Node.js (v18 or newer recommended)
- npm

## Run Locally

### 1. Install backend dependencies
```bash
cd server
npm install
```

### 2. Configure environment variables
Create a `.env` file from the example file:

#### macOS / Linux
```bash
cp .env.example .env
```

#### Windows PowerShell
```powershell
Copy-Item .env.example .env
```

### 3. Start the backend server
```bash
npm run dev
```

The backend should run on: http://localhost:5000

### 4. Install frontend dependencies
Open a new terminal window and run:
```bash
cd client
npm install
```

### 5. Start the frontend
```bash
npm run dev
```

The frontend will usually run at: http://localhost:5173

## Full Setup Commands

### macOS / Linux
```bash
cd server
cp .env.example .env
npm install
npm run dev

cd ../client
npm install
npm run dev
```

### Windows PowerShell
```powershell
cd server
Copy-Item .env.example .env
npm install
npm run dev

cd ../client
npm install
npm run dev
```

## Demo Login
Use the following credentials to access the app:
- Email: demo@demo.com
- Password: pwd123

## Features
- User registration and login
- Secure password hashing with bcrypt
- JWT-protected API routes
- Frontend route protection for authenticated users
- Persistent login state across refreshes

## Project Structure
```text
TCS_Interactive_Assignment/
├── client/            # React frontend
├── server/            # Express/Node.js backend
└── README.md
```

## Known Limitations
- This is a demo application and not intended for production deployment without additional security hardening.
- JWT tokens are stored in the browser and are not invalidated server-side beyond the basic app flow.
- The app uses localStorage for session persistence, which is simpler for demo purposes but less secure than secure cookie-based sessions.
- There is no email verification, password reset flow, or multi-factor authentication.
- The dashboard and protected routes are demo-level access controls and may not cover all real-world authorization scenarios.
- The backend relies on a simple `.env` configuration and does not include advanced deployment, environment validation, or CI setup.
