

import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {

    const token = req.headers['authorization']?.split(" ")[1];

        if(!token){
          console.log("I love     you")
            return res.status(401).json({success:false,message: 'Not authorized login  dcjdb'})
        }

    // 2. Verify token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded payload:", token_decode);

     // Attach user info safely (not in body)
    req.user = { userId: token_decode.id };

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

export default authUser;

