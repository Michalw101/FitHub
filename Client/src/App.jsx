import { React, createContext, useContext, useState, useEffect, Profiler } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Layout from "./components/Layout"
import HomeLayout from "./components/HomeLayout"
import Enter from "./pages/Enter"
import Login from './pages/LogIn'
import Registration from './pages/Registration'
import UserDetails from './pages/UserDetails'
import TraineeHome from './pages/TraineeHome'
import Profile from "./components/TraineeProfile"
import TrainerRegistration from './pages/TrainerRegistration'
import AdminHome from './pages/AdminHome'
import NewTrainers from './pages/NewTrainers'
import AdminProfile from './components/AdminProfile'
import TrainerClasses from './pages/TrainerClasses'
import TrainerProfile from './components/TrainerProfile'
import TrainerHome from './pages/TrainerHome'
import TraineeClasses from './pages/TraineeClasses'
import MyClasses from './pages/MyClasses'
import TrainersInHome from './pages/TrainersInHome'
import Trainees from './pages/Trainees'
import MyTraineeClasses from './pages/MyTraineeClasses'
import TrainersAdmin from './pages/TrainersAdmin'
import Notifications from './pages/Notifications'
import { serverRequests } from './Api'


export const UserContext = createContext();

function App() {

  const [userData, setUserData] = useState({});

  useEffect(() => {
    serverRequests('GET', `users/current-user`, null)
      .then(response => {
        console.log(response);
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then(data => {
        if (data && data.ok) {
          serverRequests('GET', `users/${data.user.user_id}`, null)
            .then(response => {
              console.log(response);
              if (!response.ok) {
                return;
              }
              return response.json();
            })
            .then(data => {
              if (data) {
                setUserData(data.user);
              }
              else
                setUserData(null);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
        else
          setUserData(null);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);



  return (

    <UserContext.Provider value={userData}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Enter />} />
            <Route path="login" element={<Login setUserData={setUserData} />} />
            <Route path="register" element={<Registration setUserData={setUserData} />} />
            <Route path="user-details" element={<UserDetails setUserData={setUserData} />} />
            <Route path="trainers" element={<TrainersInHome userData={userData} setUserData={setUserData} />} />
            <Route path="trainer-registeration" element={<TrainerRegistration setUserData={setUserData} />} />
          </Route>

          <Route path="/trainee-home" element={<HomeLayout setUserData={setUserData} userData={userData} role={3} />} >
            <Route index element={<TraineeHome userData={userData} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="trainee-classes" element={<TraineeClasses userData={userData} />} />
            <Route path="trainee-my-classes" element={<MyTraineeClasses userData={userData} />} />
            <Route path="notifications" element={<Notifications userData={userData} />} />


          </Route>

          <Route path="/admin-home" element={<HomeLayout setUserData={setUserData} userData={userData} role={1} />} >
            <Route index element={<AdminHome />} />
            <Route path="admin-profile" element={<AdminProfile/>} />
            <Route path="new-trainers" element={<NewTrainers />} />
            <Route path="all-trainees" element={<Trainees />} />
            <Route path="all-trainers" element={<TrainersAdmin />} />
            <Route path="notifications" element={<Notifications userData={userData} />} />

          </Route>

          <Route path="/trainer-home" element={<HomeLayout setUserData={setUserData} userData={userData} role={2} />} >
            <Route index element={<TrainerHome userData={userData} />} />
            <Route path="trainer-profile" element={<TrainerProfile />} />
            <Route path="trainer-classes" element={<TrainerClasses userData={userData} />} />
            <Route path="my-classes" element={<MyClasses userData={userData} />} />
            <Route path="notifications" element={<Notifications userData={userData} />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App








