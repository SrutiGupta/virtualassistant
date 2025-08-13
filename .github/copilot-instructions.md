# Virtual Assistant Project - AI Coding Guide

## Architecture Overview
Full-stack MERN application with **backend** (Express/Node.js) and **frontend** (React/Vite) in separate directories. The app creates customizable AI virtual assistants with user authentication and image uploads.

### Key Components
- **Backend**: Express server with MongoDB, JWT auth, Cloudinary integration
- **Frontend**: React SPA with React Router, Context API, Tailwind CSS
- **Database**: MongoDB with User model containing assistant customization fields
- **File Uploads**: Cloudinary for assistant avatar images via Multer middleware

## Development Workflow

### Starting the Application
```bash
# Backend (from /backend)
npm run dev          # Runs nodemon index.js on port 5000

# Frontend (from /frontend) 
npm run dev          # Runs Vite dev server on port 5173
```

### Project Structure Patterns
```
backend/
├── config/         # Database, Cloudinary, JWT token utilities
├── controller/     # Route handlers with try/catch error patterns
├── middlewares/    # isAuth JWT verification, multer file uploads
├── model/          # Mongoose schemas
└── routes/         # Express routers

frontend/src/
├── pages/          # Route components (SignUp, SignIn, Home, Customize)
├── context/        # Global state with React Context API
└── assets/         # Static images
```

## Critical Conventions

### Authentication Flow
1. **Sign up/in**: Sets httpOnly cookie with JWT token
2. **Context**: `userDataContext` manages global auth state via `userData`
3. **Protected routes**: Navigate based on `userData` presence and assistant setup
4. **Backend auth**: `isAuth` middleware verifies JWT from cookies

### API Patterns
- **Backend**: All routes prefixed `/api/auth` or `/api/user`
- **Frontend**: Uses `serverUrl="http://localhost:5000"` from context
- **CORS**: Configured for `credentials: true` with frontend origin
- **Error handling**: Controllers return JSON with `message` field

### State Management
- **Global context**: `userDataContext` provides `{serverUrl, userData, setUserData}`
- **Route protection**: Check `userData?.assistantImage && userData?.assistantName` for full setup
- **Navigation flow**: SignUp → Customize → Home (based on user completion state)

### File Upload Integration
- **Multer**: Handles multipart uploads in `/public` directory
- **Cloudinary**: Processes and stores images, returns secure_url
- **Cleanup**: `fs.unlinkSync()` removes local files after cloud upload

## Known Issues & Patterns
- **Case sensitivity**: Import paths must match exact file casing (SignUp vs signUp)
- **Route typos**: Watch for `/sigin` vs `/signin` mismatches
- **Missing imports**: `axios` import missing in `Usercontext.jsx`
- **Error responses**: Backend consistently uses `res.status().json({message: "..."})`

## Database Schema
User model includes assistant customization:
```javascript
{
  name, email, password,        // Auth fields
  assistantName, assistantImage, // Customization
  history: [String]             // Chat history array
}
```

## Component Patterns
- **Form handling**: useState for inputs, async/await for API calls
- **Loading states**: `loading` boolean for button disabled states  
- **Error display**: Conditional render error messages with `err.length>0`
- **Styling**: Tailwind with backdrop-blur glassmorphism effects
