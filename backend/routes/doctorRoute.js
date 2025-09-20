import express from "express"
import { clearDoctorSlots, doctorList } from "../controllers/doctorController.js";


const doctorRouter = express.Router();

doctorRouter.get('/list' , doctorList)
doctorRouter.put("/clear-slots/:id", clearDoctorSlots);

export default doctorRouter