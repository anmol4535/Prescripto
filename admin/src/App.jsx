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

const App = () => {

  const {aToken} = useContext(AdminContext)


  return aToken ?  (
    <div className='bg-[#F8F9FD]' >
      <ToastContainer/>
      <Navbar/>
      <div className=' flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element = {<></>} />
          <Route path='/admin-dashboard' element = {<Dashboard/>} />
          <Route path='/all-appointment' element = {<AllApointment/>} />
          <Route path='/add-doctor' element = {<AddDoctor/>} />
          <Route path='/doctor-list' element = {<DoctorsList/>} />
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