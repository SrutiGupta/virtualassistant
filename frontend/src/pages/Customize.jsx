import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/Usercontext'

import Card from '../components/Card'
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/image3.jpg'
import image4 from '../assets/image4.jpg'
import image5 from '../assets/image5.jpg'
import image6 from '../assets/image6.jpg'
import image7 from '../assets/image7.jpg'
import { BiImageAdd } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'
const Customize = () => {
    const {serverUrl,userData,setUserData,frontendImage, setFrontendImage,backendImage, setBackendImage,selectedImage,setSelectedImage}= useContext(userDataContext)

    const handleImage = (e) => {
        const file= e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    }
    const navigate=useNavigate()
    const inputImage = useRef();
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#0b0bade2] flex flex-col items-center justify-center p-[20px] '>
        <h1 className='text-white text-2xl mb-[40px] text-center'>Select Your <span className='text-blue-400'>Assistant Image</span> </h1>
    <div className='w-full max-w-[900px] flex flex-wrap justify-center items-center gap-[15px]'>
    <Card image={image1}/>
    <Card image={image3}/>
    <Card image={image4}/>
    <Card image={image5}/>
    <Card image={image2}/>
    <Card image={image6}/>
    <Card image={image7}/>
     <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px]  bg-[#242466d1] border-2 border-[blue] rounded-2xl shadow overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center${selectedImage==="input" ? "border-4 border-white" : ""}`}onClick={() =>
        {inputImage.current.click()
            setSelectedImage("input")
        }
        }>
          {!frontendImage &&<BiImageAdd className='w-[25px] h-[25px] text-white flex items-center justify-center' />}
          {frontendImage && <img src={frontendImage} className='h-full object-cover' alt="Selected" />}
           <div>
              <input type="file" accept="image/*" hidden ref ={inputImage} onChange={handleImage}/>
           </div>
    </div>
    </div>
    {selectedImage && <button className='min-w-[150px] h-[60px] mt-[30px] bg-white cursor-pointer text-black font-semibold rounded-full text-[19px] ' onClick={() => navigate("/customize2")}>Next</button>}
    </div>
  )
}

export default Customize
