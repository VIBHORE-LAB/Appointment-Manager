const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log('Cookies:', req.cookies); // ✅ Debugging

  // Extract the token from cookies
  const token = req.cookies.authToken;
  if (!token) {
    console.error('No token found in cookies'); // Debugging
    return res.status(401).json({ message: 'No token found, user not authenticated' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err); // Debugging
      return res.status(403).json({ message: 'Token is invalid' });
    }

    console.log('Decoded User:', decoded); // ✅ Debugging

    // Attach the decoded user to the request object
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;