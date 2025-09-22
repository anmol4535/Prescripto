import axios from "axios";
import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { doctors } from "../../../frontend/src/assets/assets";


export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
    const [doctors, setDoctors] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false);

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/all-doctors',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${aToken}`, // ✅ must use 'Authorization: Bearer <token>'
                    }
                }
            );
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const changeAvailability = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, {
                headers: {
                    Authorization: `Bearer ${aToken}`, // ✅ must use 'Authorization: Bearer <token>'
                }
            })

            if (data.success) {
                toast.success(data.message)
                getAllDoctors();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/appointments', {
                headers: {
                    Authorization: `Bearer ${aToken}`, // ✅ must use 'Authorization: Bearer <token>'
                }
            })

            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            } else {

                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, {
                headers: {
                    Authorization: `Bearer ${aToken}`, // ✅ must use 'Authorization: Bearer <token>'
                }
            })


            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                console.log("Error dekho: ", data.error)
                toast.error(data.error)

            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
                headers: {
                    Authorization: `Bearer ${aToken}`, // ✅ Correct header
                },
            });

  

            if (data.success) {
             
                console.log("DashData Yhea Raha : ", data.dashData)
                setDashData(data.dashData)

            } else {
                console.log(data)
                toast.error(data.message)
            }


        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken, setAToken,
        backendUrl, doctors,
        getAllDoctors, changeAvailability,
        appointments, setAppointments, getAllAppointments,
        cancelAppointment, dashData, getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;