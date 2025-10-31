# Savings Management System Admin side
a web app for saving management admi portal to manage customers,transactions,and verify user's devices
## Features
- List all registered user
- Search and filter devices transactions
- Verify or reject devices
- View user and device details

## Technologies
- Frontend: React, Redux, Tailwind CSS, Lucide Icons
- Backend: Node.js, Express, Sequelize, PostgreSQL
- Others: Axios for HTTP requests, dotenv for environment variables

##  Dependencies & Prerequisites
- for fronted : React 19.xRedux / @reduxjs/toolkitTailwind CSS,Lucide ,Icons,Axios,React Router DOM
- for backend : Node.js Node.js / Express,PostgreSQL / Sequelize,JWT Authentication
,Swagger for API documentation,Helmet and Express-rate-limit for security

##  inatallation and setup
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your database and JWT secrets
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/devices_db
JWT_SECRET=your_secret_key

# Run database migrations
npx sequelize-cli db:migrate

# Start backend server
npm run dev

## Backend will run at: http://localhost:5000/api
