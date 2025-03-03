const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback", // Ensure this matches with Google Developer Console
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile:", profile);  // Log profile data for debugging

        // Find if user already exists with the email
        let user = await User.findOne({ email: profile.emails[0].value });
        console.log("User found:", user);

        if (!user) {
          // Create a new user if not found
          user = new User({
            username: profile.displayName,  // Use the display name from Google
            email: profile.emails[0].value, // Use the email from Google
            password: null,                  // No password as it's Google login
            role: "User",                    // Default role as User
          });

          await user.save();
          console.log("New user created:", user);  // Log the new user creation for debugging
        }

        // Return the user to be serialized into the session
        return done(null, user);
      } catch (err) {
        console.error("Error during Google authentication:", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


