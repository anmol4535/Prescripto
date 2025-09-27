

import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    // 1. Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const atoken = authHeader.split(" ")[1]; // extract token

    // 2. Verify token
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    console.log("Decoded payload:", token_decode);

    // 3. Check if token belongs to admin
    if (
      token_decode.email !== process.env.ADMIN_EMAIL // email must match
    ) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    // 4. Attach admin info to request for later use
    req.admin = token_decode;

    // 5. Pass control
    next();
  } catch (error) {
    console.error("Auth error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authAdmin;
