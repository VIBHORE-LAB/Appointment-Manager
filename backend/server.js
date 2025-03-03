require('dotenv').config({ path: '.env.local' });
const express = require('express');
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const businessRoutes = require('./routes/business');
const appointmentRoutes = require('./routes/appointment'); 
const slotRoutes = require('./routes/slots');
const multer = require('multer');

require('./config/passport');


const app = express();
app.use(express.json());

// ✅ Configure CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser());

// ✅ Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

connectDB();


app.use('/api/auth', authRoutes);
app.use('/api', businessRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/slots', slotRoutes);


app.get('/', (req, res) => {
  res.send('API is running');
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: "File size too large. Max 5MB allowed." });
      }
      return res.status(400).json({ error: err.message });
  } else if (err) {
      return res.status(500).json({ error: "An unknown error occurred" });
  }
  next();
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log("Registered Routes:");
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(r.route.path);
    }
});
