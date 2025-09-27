import React , {useContext} from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import { Route , Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllApointment from './pages/Admin/AllApointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ?  (
    <div className='bg-[#F8F9FD]' >
      <ToastContainer/>
      <Navbar/>
      <div className=' flex items-start'>
        <Sidebar/>
        <Routes>
          {/* Admin Route */}
          <Route path='/' element = {<Dashboard/>} />
          <Route path='/admin-dashboard' element = {<Dashboard/>} />
          <Route path='/all-appointment' element = {<AllApointment/>} />
          <Route path='/add-doctor' element = {<AddDoctor/>} />
          <Route path='/doctor-list' element = {<DoctorsList/>} />

          {/* Doctor Route */}
          <Route path='/doctor-dashboard' element = {<DoctorDashboard/>} />
          <Route path='/doctor-appointments' element = {<DoctorAppointments/>} />
          <Route path='/doctor-profile' element = {<DoctorProfile/>} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
    <Login/>
      <ToastContainer/>
    </>
  )

}

export default App