import { createContext, useEffect, useState } from "react";

import axios from 'axios'
import { toast } from "react-toastify";


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = '$'
   // const [userData,setUserData] = useState(false)
   const backendUrl = process.env.REACT_APP_BACKEND_URL;
   console.log("Backend URL:", backendUrl); // debug
    const [doctors,setDoctors] = useState([]);
    const [token , setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);

     const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: { line1: "", line2: "" },
    gender: "",
    dob: "",
    image: "",
  });


   

    const getDoctorsData = async () => {
        try {
            // const {data} = await axios.get(backendUrl + '/api/doctor/list');
            console.log("hii")
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            console.log("HHOO")

            if(data.success) {
                setDoctors(data.doctors);
            } else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    const loadUserProfileData = async (req,res)=>{
        try{
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ correct format
      },
    });

     console.log("Profile API response:", data); // 👈 log it

            if(data.success){
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

     const value = {
        doctors,getDoctorsData,
        currencySymbol,
        token, 
        setToken,
        backendUrl,
        setUserData,
        userData,
        loadUserProfileData
    }

    useEffect(()=> {
        getDoctorsData()
    },[])
    useEffect(()=> {
        if(token) loadUserProfileData();
        else {
             // reset to empty object instead of false
      setUserData({
        name: "",
        email: "",
        phone: "",
        address: { line1: "", line2: "" },
        gender: "",
        dob: "",
        image: "",
      });
        }
    },[token])
    return (
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
