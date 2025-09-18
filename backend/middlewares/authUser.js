// // import jwt from 'jsonwebtoken'

// // const authAdmin = async(req, res, next) => {
// //     try {
// //        // const {atoken} = req.headers
// //        const atoken = req.headers.authorization.split(" ")[1];
// //         if(!atoken){
// //           console.log("I love you")
// //             return res.json({success:false,message: 'Not authorized login  dcjdb'})
// //         }
// //     const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)
// //     console.log("Token:", atoken);
// //     console.log("Decoded:", token_decode);
// //     console.log("Anmol")
// //     if(token_decode!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
// //     {
// //         return res.json({success:false,message: 'Not authorized login djnsdnd nnnnn'})
// //     }
    
// //     next();
// //     } catch (error) {
// //         console.error(error)
// //         res.status(500).json({ message:error.message })
// //     }   
// // }


// //  export default authAdmin

// // import jwt from 'jsonwebtoken';

// // const authUser = async (req, res, next) => {
// //   try {
// //     // 1. Get token from header
// //     // const authHeader = req.headers.authorization;
// //     // if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //     //   return res.status(401).json({ success: false, message: "No token provided" });
// //     // }

// //     // const token = authHeader.split(" ")[1]; // extract token

// //     const token = req.headers['authorization']?.split(" ")[1];

// //         if(!token){
// //           console.log("I love you")
// //             return res.json({success:false,message: 'Not authorized login  dcjdb'})
// //         }

// //     // 2. Verify token
// //     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
// //     console.log("Decoded payload:", token_decode);

// //     req.body.userId = token_decode.id

// //     // 5. Pass control
// //     next();
// //   } catch (error) {
// //     console.error("Auth error:", error);
// //     if (error.name === "TokenExpiredError") {
// //       return res.status(401).json({ success: false, message: "Token expired" });
// //     }
// //     return res.status(401).json({ success: false, message: "Invalid token" });
// //   }
// // };

// // export default authUser;


// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// const authUser = async (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     if (!authHeader) {
//       return res.status(401).json({ success: false, message: "No token provided" });
//     }

//     const token = authHeader.startsWith("Bearer ")
//       ? authHeader.split(" ")[1]
//       : authHeader;

//     if (!token) {
//       return res.status(401).json({ success: false, message: "Token missing" });
//     }

//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded payload:", token_decode);
//     req.body.userId = token_decode.id;

//     req.user = { id: token_decode.id };

//     next();
//   } catch (error) {
//     console.error("Auth error:", error);
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ success: false, message: "Token expired" });
//     }
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

// export default authUser;


// import jwt from 'jsonwebtoken'

// const authAdmin = async(req, res, next) => {
//     try {
//        // const {atoken} = req.headers
//        const atoken = req.headers.authorization.split(" ")[1];
//         if(!atoken){
//           console.log("I love you")
//             return res.json({success:false,message: 'Not authorized login  dcjdb'})
//         }
//     const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)
//     console.log("Token:", atoken);
//     console.log("Decoded:", token_decode);
//     console.log("Anmol")
//     if(token_decode!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
//     {
//         return res.json({success:false,message: 'Not authorized login djnsdnd nnnnn'})
//     }
    
//     next();
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message:error.message })
//     }   
// }


//  export default authAdmin

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

