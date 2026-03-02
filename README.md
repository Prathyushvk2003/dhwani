# College Arts Fest Website

A complete full-stack College Arts Fest website with a RED, BLACK and FIRE theme design.

## Tech Stack
- **Frontend**: React
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Styling**: CSS with custom theme

## Features
- **Google Form Registration**: Registration done exclusively through Google Form
- **Student Login**: Using registration number only
- **Student Dashboard**: Shows registered events and results
- **Results Section**: Public display of event results
- **Leaderboard**: Team points calculation with dynamic updates
- **Photo Gallery**: With upload/delete capabilities
- **Brochure Section**: PDF viewer with download option
- **Admin Panel**: Full CRUD operations for events, results, and gallery

## Theme Design
- Dark black background
- Red accents
- Fire glow effects on buttons
- Smooth animations
- Bold typography
- Premium college fest look
- Fully responsive

## Installation

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following:
```env
MONGODB_URI=mongodb://localhost:27017/artsfest
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory with the following:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend server:
```bash
npm start
```

## Folder Structure

### Frontend
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── auth/
│   │   ├── events/
│   │   ├── dashboard/
│   │   ├── results/
│   │   ├── gallery/
│   │   ├── leaderboard/
│   │   └── admin/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── utils/
├── package.json
└── README.md
```

### Backend
```
backend/
├── models/
│   ├── Student.js
│   ├── Event.js
│   ├── Result.js
│   ├── Team.js
│   ├── Gallery.js
│   └── Admin.js
├── routes/
│   ├── auth.js
│   ├── students.js
│   ├── events.js
│   ├── results.js
│   ├── gallery.js
│   └── admin.js
├── middleware/
│   └── auth.js
├── controllers/
│   ├── authController.js
│   ├── studentController.js
│   ├── eventController.js
│   ├── resultController.js
│   ├── galleryController.js
│   └── adminController.js
├── services/
│   ├── leaderboardService.js
│   └── resultService.js
├── config/
├── utils/
├── server.js
└── package.json
```

## API Endpoints

### Authentication
- POST `/api/auth/student/login` - Student login with registration number
- POST `/api/auth/admin/login` - Admin login

### Students
- GET `/api/students/:regNumber` - Get student by registration number
- PUT `/api/students/:regNumber/events` - Register for events
- GET `/api/students/:regNumber/dashboard` - Get student dashboard data

### Events
- GET `/api/events` - Get all events
- GET `/api/events/:id` - Get specific event
- POST `/api/events` - Create event (admin only)
- PUT `/api/events/:id` - Update event (admin only)
- DELETE `/api/events/:id` - Delete event (admin only)

### Results
- GET `/api/results` - Get all results
- GET `/api/results/event/:eventId` - Get results for specific event
- POST `/api/results` - Add result (admin only)
- PUT `/api/results/:id` - Update result (admin only)
- DELETE `/api/results/:id` - Delete result (admin only)

### Gallery
- GET `/api/gallery` - Get all gallery images
- POST `/api/gallery` - Upload image (admin only)
- DELETE `/api/gallery/:id` - Delete image (admin only)

### Admin
- GET `/api/admin/stats` - Get dashboard statistics (admin only)
- GET `/api/admin/leaderboard` - Get current leaderboard (admin only)

## Points System
- **Group Events**: 1st (10 pts), 2nd (5 pts), 3rd (3 pts)
- **Individual Events**: 1st (5 pts), 2nd (3 pts), 3rd (1 pt)
- Points are calculated automatically in the backend when results are added/updated

## Teams
- BTECH 1st Year
- BTECH 2nd Year
- BTECH 3rd Year
- BTECH 4th Year
- MCA

## Admin Capabilities
- Add/Edit/Delete Events
- Set Event Type (Group or Individual)
- Add Event Date & Time
- Add Students (from Google Form export)
- Add Winner (only 1 per position)
- Update results
- Recalculate leaderboard automatically
- Upload gallery photos
- Delete gallery photos
- Edit or update results anytime

## Student Dashboard
- Shows Student Name
- Registration Number
- Team (BTECH1, BTECH2, BTECH3, BTECH4, MCA)
- Events Registered
- Event Date & Time
- Event Status: Upcoming/Completed
- Result Status: Winner/Runner Up/Participated