import { React, createContext, useContext, useState, useEffect, Profiler } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Layout from "./components/Layout"
import HomeLayout from "./components/HomeLayout"
import Enter from "./pages/Enter"
import Login from './pages/LogIn'
import Blogs from './pages/Blogs'
import Trainers from './pages/Trainers'
import Registration from './pages/Registration'
import UserDetails from './pages/UserDetails'
import TraineeHome from './pages/TraineeHome'
import Profile from "./components/Profile"
import Classes from './pages/Classes'
import TrainerRegistration from './pages/TrainerRegistration'
import AdminHome from './pages/AdminHome'
import NewTrainers from './pages/NewTrainers'
import AdminProfile from './components/AdminProfile'


export const UserContext = createContext();

function App() {

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    setUserData(dataFromLocalStorage)
  }, []);


  const [userData, setUserData] = useState({});

  return (

    <UserContext.Provider value={userData}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Enter />} />
            <Route path="login" element={<Login setUserData={setUserData} />} />
            <Route path="register" element={<Registration setUserData={setUserData} />} />
            <Route path="user-details" element={<UserDetails setUserData={setUserData} />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="trainers" element={<Trainers setUserData={setUserData} />} />
            <Route path="trainer-registeration" element={<TrainerRegistration setUserData={setUserData} />} />
          </Route>

          <Route path="/trainee-home" element={<HomeLayout setUserData={setUserData} userData={userData} />} >
            <Route index element={<TraineeHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="classes" element={<Classes />} />
            <Route path="trainers" element={<Trainers />} />
          </Route>

          <Route path="/admin-home" element={<HomeLayout setUserData={setUserData} userData={userData} />} >
            <Route index element={<AdminHome />} />
            <Route path="admin-profile" element={<AdminProfile />} />
            <Route path="new-trainers" element={<NewTrainers />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App








