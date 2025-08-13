import React, { useContext, useState } from 'react'
import bg from '../assets/authBg1.jpg'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/Usercontext'

import axios from 'axios'




const SignUp = () => {
   const {serverUrl,userData,setUserData}=useContext(userDataContext)
  const navigate=useNavigate()
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const [loading,setLoading]=useState(false)
  const[password,setPassword]=useState("")
  const [err,setErr]=useState("")
 const handleSignup = async (e) => {
  e.preventDefault()
  setErr("")
  setLoading(true)
    try{

      let result=await axios.post(`${serverUrl}/api/auth/signup`,{
        name,
        email,
        password
      },{withCredentials:true})
      setUserData(result.data)
      setLoading(false)
      navigate('/customize')

    }
    catch(error){

      console.log(error)
      setUserData(null)
      setLoading(false)
      setErr(error.response.data.message)
       
    }

 }
  return (
    <div className='w-full bg-cover h-[100vh] flex justify-center items-center  ' style={{backgroundImage: `url(${bg})`}} >
      <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000035] backdrop-blur-md rounded-lg shadow-lg shadow-black flex flex-col items-center px-[20px] justify-center gap-[20px]' onSubmit={handleSignup}>
        <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Regiter to
        <span className='text-blue-700 text-[30px]'>  Virtual Assistant</span>
        </h1>
        <input type="text" placeholder="Enter your name" className='px-[20px] py-[20px] w-full h-[60px] text-white placeholder-white-500  outline-none border-2 border-blue-900 bg-transparent rounded-full text-[18px]
         ' required onChange={(e)=> setName(e.target.value)} value ={name}/>
         <input type="text" placeholder="Email" className='px-[20px] py-[20px] w-full h-[60px] text-white placeholder-white-500  outline-none border-2 border-blue-900 bg-transparent rounded-full text-[18px]
          ' required onChange={(e)=>setEmail(e.target.value)} value ={email}/>
         <div className='w-full h-[60px] border-2 border-blue-900 bg-transparent text-white rounded-full text-[18px]'>
          <input type="password" placeholder="Password" className='w-full h-full outline-none bg-transparent placeholder-white-700 px-[20px] py-[10px] '
          required onChange={(e)=>setPassword(e.target.value)} value ={password}/>
        </div>
        {err.length>0 && <p className='text-red-500 text-[16px]'> 
              *{err}
        </p>}
        <button className='min-w-[150px] h-[60px] mt-[30px] bg-white text-black font-semibold rounded-full text-[19px]  'disabled={loading}>Sign Up</button>
        <p className='text-white cursor-pointer' onClick={() => navigate('/signin')}>Already have an account? <span className='text-blue-400 font-bold'>Sign In</span></p>
        </form>
     
    </div>
  )
}

export default SignUp
