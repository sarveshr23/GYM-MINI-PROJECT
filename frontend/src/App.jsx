import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'

//import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Trainer from './Trainer'
// import Members from './Members'
import Packages from './Packages'
import Admin from './Admin'
import Homed from './Homed'
import './hp.css'; 
import Membership from './Membership'
import EquipmentManagement from './EquipmentManagement'
import UserManagement from './UserManagement'
import ContactPage from './ContactPage'
import Dashboard from './Dashboard'
import QueriesPage from './QueriesPage'
import TrainersPage from './TrainersPage'
import UserDetailsForm from './UserDetailsForm'
import UserAdminBox from './UserAdminBox'
import AdminMembershipPage from './AdminMembershipPage'
import Payment from './Payment'
// import MembersList from './Members'
import Members from './Members'
import Mmhd from './Mmhd'

function App() {

  return (
    <>
    <BrowserRouter>
   <Routes>
   <Route path="/" element={<Homed/>}></Route>
   <Route path='/login' element={<Login/>}></Route>
   <Route path='/trainer' element={<Trainer/>}></Route>
   <Route path='/Register' element={<Register/>}></Route>
   <Route path='/Admin' element={<Admin/>}></Route>
   <Route path="/admin/equipment" element={<EquipmentManagement/>} />
   <Route path="/admin/users" element={<UserManagement/>} />
   <Route path="/admin/members" element={<Members/>} />
   <Route path="/admin/useradminbox" element={<UserAdminBox/>} />
   <Route path="/admin/trainers" element={<TrainersPage/>} />
   <Route path='/home' element={<Home/>}></Route>
   <Route path='/Membership' element={<Membership/>}></Route>
   <Route path="/homed" element={<Homed />} />
   <Route path='/admin/queries' element={<QueriesPage/>}></Route>
   <Route path='/user-details' element={<UserDetailsForm/>}></Route>
   <Route path='/mmhd' element={<Mmhd/>}></Route>

   <Route path='/contactpage' element={<ContactPage/>}></Route>
   <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
   <Route path='/admin/membership-plans' element={<AdminMembershipPage/>}></Route>
   <Route path='/packages' element={<Packages/>}></Route>
   <Route path='/payment' element={<Payment/>}></Route>
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App;