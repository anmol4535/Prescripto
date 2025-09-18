import validator from "validator";
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken';

//API for adding  doctor
export const addDoctor = async (req , res) => {
    try{
        const {name , email , password , speciality ,  degree, experience , about , fees , address} = req.body;
        const imageFile = req.file;

       
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({success:false , message:"Missing Details"});
        }

        //validating email 
        if(!validator.isEmail(email)) {
            return res.json({success:false , message:"Enter a valid email"}); 
        }

        //validating strong password
        if(password.length < 8) {
            return res.json({success:false , message:"Please enter a strong password"})

        }

        //hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        
        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url;

        let parsedAddress;
        try {
            parsedAddress = JSON.parse(address);
        } catch {
            parsedAddress = address; // fallback if it's just a string
        }

        const doctorData = {
            name , email , image:imageUrl , 
            password: hashedPassword, speciality,
            degree , experience , about , fees , 
            address: parsedAddress,
            date:Date.now()
        }
        // console.log("a");
        const newDoctor = new doctorModel(doctorData);
        // console.log("b")
        await newDoctor.save();
        // console.log("c")
        res.json({success:true, message:"Doctor Added"});

    } catch (error) {
        console.log("Error aaya hai:", error);  // ✅ logs full error object
        res.status(500).json({ success: false, message: error.message });
    }
}

export const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
           // const token = jwt.sign(email+password, process.env.JWT_SECRET)
        const token = jwt.sign(
        { email:email, role: "admin" },          // payload as an object
        process.env.JWT_SECRET,
        { expiresIn: "7d" }                // set validity (e.g., 1 hour)
        );
        return  res.json({success: true, token})
        }
        return    res.status(403).json({message:"Invalid email or password"})
        
    } catch (error) {
        console.log("LoginErro: " ,error)
        res.status(500).json({ message: error.message })
    }
}

// API to get all doctors list for admin panel 
export const allDoctors = async (req,res)=>{
    try{
        const doctors = await doctorModel.find({}).select('-password')
        // console.log(doctors)
        res.json({success:true,doctors})
    }catch(err){
        console.log(err)
        res.status(500).json({message: err.message})
    }
}
