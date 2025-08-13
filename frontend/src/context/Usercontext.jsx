import React, { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import geminiResponse from '../../../backend/gemini'
import axios from 'axios';

export const userDataContext=createContext()
const Usercontext = ({children}) => {
    const serverUrl="https://virtualassistantbackend-pzif.onrender.com"
    const[userData,setUserData]=useState(null)
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const[selectedImage,setSelectedImage]=useState(null)
    const handleCurrentUser=async ()=>{
      try{
           const result =await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
            setUserData(result.data)
            console.log(result.data)}
      catch{

      }
    }



    const getGeminiResponse = async (command) => {
      try{
      const assistantName = userData?.assistantName || "Assistant";
      const result = await axios.post(`${serverUrl}/api/user/asktoassistant`, { command, assistantName }, { withCredentials: true });
      return result.data;
      }
      catch(error){
        console.error("Error getting Gemini response:", error);
    
      }
    }

    useEffect(()=>{
      handleCurrentUser()
    },[])
const value={

    serverUrl,userData,setUserData,frontendImage, setFrontendImage,backendImage, setBackendImage,selectedImage,setSelectedImage,getGeminiResponse

}




  return (
    <div>
    <userDataContext.Provider value={value}> 
    {children}
     </userDataContext.Provider>
    </div>
  )
}

export default Usercontext
