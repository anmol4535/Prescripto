import express from "express"
import { appointmentCancel, appointmentComplete, appointmentDoctor, clearDoctorSlots, doctorDashboard, doctorList, doctorProfile, loginDoctors, updateDoctorProfile } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";


const doctorRouter = express.Router();

doctorRouter.get('/list' , doctorList)
doctorRouter.put("/clear-slots/:id", clearDoctorSlots);
doctorRouter.post("/login", loginDoctors);
doctorRouter.get('/appointments' , authDoctor ,appointmentDoctor )
doctorRouter.post('/complete-appointment' , authDoctor ,appointmentComplete )
doctorRouter.post('/cancel-appointment' , authDoctor ,appointmentCancel)
doctorRouter.get('/dashboard' , authDoctor , doctorDashboard)
doctorRouter.get('/profile' , authDoctor , doctorProfile)
doctorRouter.post('/update-profile' , authDoctor , updateDoctorProfile)


export default doctorRouter