const jwt = require("jsonwebtoken");

const verifyUserToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "myjwtsecrectisverygoodandyoucantdecrytpit"); // Replace 'your_secret_key' with your actual secret key

    // Forward the ID inside the token
    req.userId = decoded.id;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Failed to authenticate token" });
  }
};

module.exports = verifyUserToken;
