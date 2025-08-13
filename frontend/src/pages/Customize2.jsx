import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/Usercontext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const Customize2 = () => {
    const {userData,backendImage,selectedImage,serverUrl,setUserData} = useContext(userDataContext)
    const[assistantName,setAssistantName]=useState(userData?.assistantName || "")
     const navigate=useNavigate()
    const handleUpdateAssistantName = async () => {
         try{
            const formData = new FormData();
            formData.append("assistantName",assistantName)
            if(backendImage) {
                formData.append("assistantImage",backendImage)

            }
            else{
                formData.append("imageUrl",selectedImage)
            }
               const result =await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials: true} )
               console.log(result.data)
                setUserData(result.data)
                navigate('/')   
         }
         catch(error){
      console.error("Error updating assistant name:", error.response?.data || error.message);
         }
    }
    return (
    
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[rgba(11,11,173,0.89)] flex flex-col items-center justify-center p-[20px] '>
      <h1 className='text-white text-2xl mb-[40px] text-center'>Enter Your <span className='text-blue-400'>Assistant Name</span> </h1><h1></h1>
    <input type="text" placeholder="eg.Ayra " className='px-[20px] py-[20px] w-full max-w-[600px] h-[60px] text-white placeholder-white-500  outline-none border-2 border-blue-900 bg-transparent rounded-full text-[18px]
         'required onChange={(e) => setAssistantName(e.target.value)} value={assistantName} />
         {assistantName &&  <button className='min-w-[150px] h-[60px] mt-[30px] bg-white cursor-pointer text-black font-semibold rounded-full text-[19px] ' onClick={() => {
            handleUpdateAssistantName()
         }}>Let’s Get Started</button>}
    </div>
  )
}

export default Customize2
