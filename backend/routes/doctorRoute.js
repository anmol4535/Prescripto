import express from "express"
import { clearDoctorSlots, doctorList, loginDoctors } from "../controllers/doctorController.js";


const doctorRouter = express.Router();

doctorRouter.get('/list' , doctorList)
doctorRouter.put("/clear-slots/:id", clearDoctorSlots);
doctorRouter.post("/login", loginDoctors);

export default doctorRouter