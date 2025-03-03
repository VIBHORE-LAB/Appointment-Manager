const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = express.Router();
const sendOtpEmail = require('../config/nodemailer');
const Business = require("../models/businessModel");

router.use(cookieParser());

// ✅ Configure CORS properly
router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// 🔹 Register
router.post('/sign-up', async (req, res) => {
  try {
    console.log('Received Data:', req.body); // Debugging line

    const { username, email, password, role, firstName, lastName } = req.body;
    if (!username || !email || !password || !role || !firstName || !lastName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already exists' });

    let name= firstName + " " + lastName;
    user = new User({ username, email, password, role, name });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// 🔹 Login
router.post('/log-in', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Check password (use bcrypt.compare to check hashed password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const business = user.role === 'Manager' ? await Business.findOne({ email: user.email }) : null;

    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role, 
        name: user.name, 
        ...(user.role === 'Manager' && business ? { businessId: business._id } : {}) 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
  
    res.cookie('authToken', token, {
      httpOnly: true,
      secure:false,
      SameSite: 'None',
      maxAge: 3600000,  
    });
   
    res.cookie('userId', user._id.toString(), {
      httpOnly: true,
      secure: false,
      SameSite: 'None',
      maxAge: 3600000, // 1 hour
    });


    // Send response with token and user data
    res.json({ 
      message: 'Login successful', 
      token, 
      user,
      businessId: user.role === 'Manager' && business ? business._id : null  // Ensure it's always included
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


//forgot-password

function generateOtp(){
  return Math.floor(100000 + Math.random() * 900000).toString();
}



router.post('/forgot-password', async (req,res) => {
  const {email} =req.body;
  try{
    const user= await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"User Not Found"});
    }
const otp = generateOtp();
user.resetPasswordToken= otp;
const expirationTime = 10;
user.resetPasswordExpires= Date.now() + expirationTime * 60 * 1000;
await user.save();

await sendOtpEmail(user.email, otp,expirationTime);
res.json({Message: 'OTP send to your email'});
  }

  catch(err){
    console.error('Error in forgotPassword:', err );
    res.status(500).json({ message: 'Something went wrong, please try again later.' });
  }

})




//reset-password 


router.post('/reset-password', async(req,res) => {
  const {email,otp,newPassword} = req.body;

  try{
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({message:'User Not Found'});

    }

    if(user.resetPasswordToken !== otp || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({message:'Invalid or Expired OTP'});
    }
      user.password = newPassword;
      user.resetPasswordToken= undefined;
      user.resetPasswordExpires= undefined;
      await user.save();

      res.json({message:'Password Succcessfully Reset'});
     


  }

  catch(err){
console.error('Error in reset password', err);
res.status(500).json({message: 'Something went wrong, please try again later.'});
  }
})
// 🔹 Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    if (!req.user) return res.redirect('http://localhost:3000/login');

    let user = await User.findOne({ email: req.user.email });
    if (!user) {
      user = new User({ username: req.user.displayName, email: req.user.email });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 3600000
    });

    res.redirect('http://localhost:3000/dashboard');
  }
);

// 🔹 Logout
router.post('/logout', (req, res) => {
  res.clearCookie('authToken');
  res.json({ message: 'Logged Out Successfully' });
});




// /check-auth route to verify JWT token
router.get('/check-auth', (req, res) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.json({ authenticated: false, user: null });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ authenticated: false, user: null });
    }
    res.json({ authenticated: true, user: decoded });
  });
});






module.exports = router;























