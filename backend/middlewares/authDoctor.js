// import jwt from 'jsonwebtoken';

// const authDoctor = async (req, res, next) => {
//   try {

//     const dtoken = req.headers['authorization']?.split(" ")[1];

//         if(!dtoken){
//           console.log("I love     you")
//             return res.status(401).json({success:false,message: 'Not authorized login  dcjdb'})
//         }

//     // 2. Verify token
//     const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
//     console.log("Decoded payload:", token_decode);

//      // Attach user info safely (not in body)
//      req.doctor = { id: token_decode.id };

//     // 5. Pass control
//     next();
//   } catch (error) {
//     console.error("Auth error:", error);
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ success: false, message: "Token expired" });
//     }
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

// authDoctor.js

import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ success: false, message: "Not authorized" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach doctor ID safely
    req.doctor = { id: decoded.id };

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authDoctor;

