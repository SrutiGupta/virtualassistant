import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Customize from './pages/Customize.jsx'
import { useContext } from 'react'
import { userDataContext } from './context/Usercontext.jsx'
import Home from './pages/Home.jsx'
import Customize2 from './pages/Customize2.jsx'
const App = () => {
  const {userData,setUserData}=useContext(userDataContext)
  return (
    <Routes>
      <Route path='/' element={(userData?.assistantImage && userData?.assistantName)? <Home />: <Navigate to ={"/customize"}/>} />

      <Route path='/signup' element={!userData?<SignUp />:<Navigate to={"/"}/>} />
      <Route path='/signin' element={!userData?<SignIn /> :<Navigate to={"/"}/>}/>
      <Route path='/customize' element={userData?<Customize />:<Navigate to={"/signup"}/>} />
    <Route path='/customize2' element={userData?<Customize2 />:<Navigate to={"/signup"}/>} />
    </Routes>
    
  )
}

export default App

