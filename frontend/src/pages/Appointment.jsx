// import React, { useContext,useState, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';
// import verified_icon from '../assets/verified_icon.svg';
// import info_icon from '../assets/info_icon.svg';
// import RelatedDoctors from '../components/RelatedDoctors';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const Appointment = () => {

//   const {docId} = useParams();
//   const {doctors , currencySymbol , backendUrl , token , getDoctorsData} = useContext(AppContext);
//   const [docInfo , setDocInfo] = useState(null);
//   const daysOfWeek = ['SUN' , 'MON' , 'TUE' , 'WED', 'THES', 'FIR' , 'SAT']

//   const navigate = useNavigate();

//   const [docSlots , setDocSlots] = useState([]);
//   const [slotIndex , setSlotIndex] = useState(0);
//   const [slotTime , setSlotTime] = useState('');


//   const fetchDocInfo = async () => {
//     const docInfo = doctors.find(doc => doc._id === docId)
//     setDocInfo(docInfo);
//     console.log(docInfo);
//   }

//   // const getAvailableSlots = async () => {
//   //   setDocSlots([]);

//   //   //getting current date
//   //   let today = new Date();

//   //   for(let i = 0 ; i< 7 ; i++) {

//   //     //getting date with index
//   //     let currentDate = new Date(today);
//   //     currentDate.setDate(today.getDate()+i);

//   //     //setting end time of the date with index
//   //     let endTime = new Date();
//   //     endTime.setDate(today.getDate() + i);
//   //     endTime.setHours(21, 0 ,0 , 0);

//   //     //setting hours
//   //     if(today.getDate() === currentDate.getDate()) {
//   //       currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
//   //       currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);

//   //     } else {
//   //       currentDate.setHours(10);
//   //       currentDate.setMinutes(0);
//   //     }

//   //     let timeSlots = []

//   //     while(currentDate < endTime) {
//   //       let formattedTime = currentDate.toLocaleTimeString([] ,{ hour:'2-digit', minute:'2-digit'})
//   //       console.log(formattedTime)
     

//   //       let day = currentDate.getDate()
//   //       let month = currentDate.getMonth() + 1
//   //       let year = currentDate.getFullYear()

//   //       const slotDate = day +"_" + month + "_" + year
//   //       const slotTime = formattedTime
//   //       console.log("docIndo yhea Raha: ", docInfo);
//   //       console.log("SlotDate : " , slotDate);
//   //       console.log("SlotTime : " , slotTime);
        
//   //       //const isSlotAvailable = docInfo?.slots_booked[slotDate] && docInfo?.slots_booked[slotDate]?.includes(slotTime) ? false : true;
//   //       const isSlotAvailable = !(docInfo?.slots_booked?.[slotDate]?.includes(slotTime));
//   //       console.log(isSlotAvailable)
        
//   //       if(isSlotAvailable ) {
//   //         //add slot to array
//   //         timeSlots.push({
//   //         datetime : new Date(currentDate),
//   //         time: formattedTime
//   //         })
//   //       }

//   //       // Incremant current time by 30 minutes
//   //       currentDate.setMinutes(currentDate.getMinutes() + 30)
//   //     }

//   //     setDocSlots(prev => ([...prev , timeSlots]))
//   //   }
//   // }

// //   const getAvailableSlot = () => {
// //         if (!docInfo?.slots_booked) return;
    
// //         const today = new Date();
// //         const newSlots = []; // Temporary array to batch updates
    
// //         for (let i = 0; i < 7; i++) {
// //             const currentDate = new Date(today);
// //             currentDate.setDate(today.getDate() + i);
    
// //             const endTime = new Date(currentDate);
// //             endTime.setHours(21, 0, 0, 0);
    
// //             // Adjust start time based on the current day
// //             if (i === 0) {
// //                 if (i === 0) {
// //   currentDate.setMinutes(currentDate.getMinutes() + 30 - (today.getMinutes() % 30));
// // }

// //             } else {
// //                 currentDate.setHours(10, 0, 0, 0);
// //             }
    
// //             const daySlots = [];
// //             while (currentDate < endTime) {
// //                 const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    
// //                 const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
    
// //                 // Check availability
// //                 const isSlotAvailable = !docInfo.slots_booked[slotDate]?.includes(formattedTime);
    
// //                 if (isSlotAvailable) {
// //                     daySlots.push({
// //                         datetime: new Date(currentDate),
// //                         time: formattedTime,
// //                     });
// //                 }
    
// //                 // Increment by 30 minutes
// //                 currentDate.setMinutes(currentDate.getMinutes() + 30);
// //             }
    
// //            newSlots.push(daySlots);
// //         }
    
// //         setDocSlots(newSlots); // Batch state update
// //     };


// const getAvailableSlot = () => {
//   if (!docInfo?.slots_booked) return;

//   const today = new Date();
//   const newSlots = [];

//   const toMinutes = (timeStr) => {
//     const [time, modifier] = timeStr.split(' ');
//     let [hours, minutes] = time.split(':').map(Number);
//     if (modifier.toUpperCase() === 'PM' && hours !== 12) hours += 12;
//     if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;
//     return hours * 60 + minutes;
//   };

//   for (let i = 0; i < 7; i++) {
//     const currentDate = new Date(today);
//     currentDate.setDate(today.getDate() + i);
//     const endTime = new Date(currentDate);
//     endTime.setHours(21, 0, 0, 0);

//     currentDate.setHours(i === 0 ? Math.max(today.getHours() + 1, 10) : 10, 0, 0, 0);

//     const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;

//     const daySlots = [];
//     while (currentDate < endTime) {
//       const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
//       const currentMinutes = toMinutes(formattedTime);

//       const bookedTimes = docInfo.slots_booked[slotDate] || [];
//       const isSlotAvailable = !bookedTimes.some(t => toMinutes(t) === currentMinutes);

//       if (isSlotAvailable) {
//         daySlots.push({ datetime: new Date(currentDate), time: formattedTime });
//       }

//       currentDate.setMinutes(currentDate.getMinutes() + 30);
//     }

//     newSlots.push(daySlots);
//   }

//   setDocSlots(newSlots);
// };







//   const bookAppointment = async (req,res) => {
//     if(!token) { 
//       toast.warn('Login to book appointment')
//       return navigate('/login');
//     }

//     try {
//       const date = docSlots[slotIndex][0].datetime

//       let day = date.getDate()
//       let month = date.getMonth()
//       let year = date.getFullYear()

//       const slotDate = day +"_" + month + "_"+ year
      
//       const {data} = await axios.post(backendUrl + '/api/user/book-appointment' , {docId,slotDate, slotTime} , {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ correct format
//       },
//       })

//       if(data.success) {
//         toast.success(data.message)
//         getDoctorsData()
//         navigate('/my-appointments')
//       } else{
//         toast.error(data.message)

//       }
//     } catch (error) {
//       console.log("Yhea Raha Error: ",error)
//       toast.error(error.message);
//       return res.json({ success: false, message: error.message });
//     }
//   }

//   useEffect(() => {
//     getAvailableSlot()
//   },[docInfo]);

//   useEffect(() => {
//     fetchDocInfo()
//   } ,[doctors , docId])

//   useEffect(() => {
//     console.log(docSlots);
//   },[docSlots])


//   return (
//     <div>
//       {/* Doctors Details */}
//       <div className='flex flex-col sm:flex-row gap-4'>
//         <div>
//           <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo?.image} alt="" />
//         </div>

//         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 '>
//           {/* Doc INfo : name , degree , experience */}
//           <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo?.name} 
//             <img className='w-5' src={verified_icon} alt="" />
//             </p>
//             <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//               <p>{docInfo?.degree} - {docInfo?.speciality}</p>
//               <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo?.experience}</button>
//             </div>

//             {/* Doctor About */}
//             <div>
//               <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3 '>About <img src={info_icon} alt="" />
//               </p>
//               <p className='text-sm text-gray-500 max-w-[700px] mt-1 '> {docInfo?.about}</p>
//              </div>
//              <p className='text-gray-500 font-medium mt-4'>
//               Appointment fee : <span className='text-gray-600'>{currencySymbol}{docInfo?.fees}</span>
//              </p>

//         </div>
//       </div>

//       {/* Booking slots */}
//       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
//         <p>Booking slots</p>
//         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//           {
//             docSlots.length && docSlots.map((item,index) => (
//               <div onClick= {() => setSlotIndex(index) } className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? `bg-primary text-white` : `border border-gray-200`}`} key = {index}>
//                 <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>

//                 <p>{item[0] && item[0].datetime.getDate()}</p>

//               </div>
//             ))
//           }
//         </div>

//         <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
//          {/* {
//           docSlots.length && docSlots[slotIndex].map((item,index) => (
//             <p onClick={() => setSlotTime(item.time) } className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white ' : 'text-gray-400 border border-gray-300'}`} key= {index}>
//               {item.time.toLowerCase()}
//             </p>
//           ))
//          }  */}
//          {docSlots.length > 0 && Array.isArray(docSlots[slotIndex]) && 
//   docSlots[slotIndex].map((item, index) => (
//     <p
//       onClick={() => setSlotTime(item.time)}
//       className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
//         item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'
//       }`}
//       key={index}
//     >
//       {item.time}
//     </p>
//   ))
// }
//         </div>
//         <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 '>Book an appointment</button>
//       </div>
//       {/* Listing related Doctors */}
//       <RelatedDoctors docId= {docId} speciality = {docInfo?.speciality}/>
//     </div>
//   )
// }

// export default Appointment







import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import verified_icon from '../assets/verified_icon.svg';
import info_icon from '../assets/info_icon.svg';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const navigate = useNavigate();
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Fetch doctor info and preserve slots_booked
  const fetchDocInfo = () => {
    const doc = doctors.find(d => d._id === docId);
    if (!doc) return;

    const parsedDoc = {
      ...doc,
      docData: typeof doc.docData === 'string' ? JSON.parse(doc.docData) : doc.docData,
    };

    setDocInfo(parsedDoc);
    console.log('Fetched docInfo:', parsedDoc);
  };

  // Convert date to HH:MM 24-hour string
  const formatTime24 = date => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  // Generate available slots excluding booked ones
  const getAvailableSlots = () => {
  if (!docInfo?.slots_booked) return;

  const today = new Date();
  const newSlots = [];

  // Helper: convert "hh:mm AM/PM" to minutes
  const timeToMinutes = timeStr => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    const endTime = new Date(currentDate);
    endTime.setHours(21, 0, 0, 0);

    // Start time
    currentDate.setHours(i === 0 ? Math.max(today.getHours() + 1, 10) : 10, 0, 0, 0);

    const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
    const bookedTimes = (docInfo.slots_booked[slotDate] || []).map(t => timeToMinutes(t));

    const daySlots = [];
    while (currentDate < endTime) {
      const slotTimeStr = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      const slotMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();

      // Skip booked slots
      if (!bookedTimes.includes(slotMinutes)) {
        daySlots.push({ datetime: new Date(currentDate), time: slotTimeStr });
      }

      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    newSlots.push(daySlots);
  }

  setDocSlots(newSlots);
};


  // Book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    try {
      if (!docSlots[slotIndex]?.length || !slotTime) {
        toast.error('Select a valid time slot');
        return;
      }

      const date = docSlots[slotIndex][0].datetime;
      const slotDate = `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Fetch doctor info on mount or when doctors array changes
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  // Generate slots whenever docInfo changes
  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return (
    <div>
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo?.image} alt="" />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo?.name} <img className="w-5" src={verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo?.degree} - {docInfo?.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo?.experience}</button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo?.about}</p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo?.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>

        {/* Day selection */}
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length > 0 &&
            docSlots.map((daySlots, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
                }`}
              >
                <p>{daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}</p>
                <p>{daySlots[0] && daySlots[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        {/* Time slots */}
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length > 0 &&
            Array.isArray(docSlots[slotIndex]) &&
            docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'
                }`}
              >
                {item.time}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo?.speciality} />
    </div>
  );
};

export default Appointment;
