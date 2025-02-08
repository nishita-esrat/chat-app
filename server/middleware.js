const jwt = require("jsonwebtoken");

const isAuthenticate = (req, res, next) => {
  try {
    const { token } = req.cookies;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.id = decoded._id;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token or authentication failed.",
    });
  }
};

module.exports = isAuthenticate;
