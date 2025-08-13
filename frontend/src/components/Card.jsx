import React from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/Usercontext'
  
const Card = ({image}) => {
     const {serverUrl,userData,setUserData,frontendImage, setFrontendImage,backendImage, setBackendImage,selectedImage,setSelectedImage}= useContext(userDataContext)
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#242466d1] border-2 border-[blue] rounded-2xl shadow overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white ${selectedImage===image ? "border-4 border-white" : ""}`} onClick={()=>{
        setSelectedImage(image)
        setBackendImage(null)
        setFrontendImage(null)
        
      }}>
           <img src={image} className='h-full object-cover' alt="" />
    </div>
  )
}

export default Card
