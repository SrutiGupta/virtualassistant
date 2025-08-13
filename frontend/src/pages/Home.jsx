import React from 'react'
import { useContext,useEffect ,useRef , useState } from 'react'
import { userDataContext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import aiImg from "../assets/ai.gif"
import userImg from "../assets/user3.gif"
const Home = () => {
  const {userData,serverUrl,setUserData,getGeminiResponse} = useContext(userDataContext)
  const navigate=useNavigate()
 const [listening, setListening] = useState(false)
 const [userText,setUserText] = useState("")
 const [aiText,setAiText] = useState("")
 const isSpeakingRef = useRef(false)
 const recognitionRef=useRef(null)
 const isRecognizingRef = useRef(false)
 const synth= window.speechSynthesis

  const handleLogOut=async()=>{
    try{
      const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate('/signin');
      
    }
    catch(error){
      setUserData(null);
      console.log(error);
    }
  }

  const startRecognition=()=>{
    if(!isSpeakingRef.current && !isRecognizingRef.current){
    try{
      recognitionRef.current?.start();

    }
    catch(err){
      if(err.name !== "InvalidStateError") {
        console.error("Error starting speech recognition:", err);
      }
    }
   }
  };

  const speak=(text)=>{
    const utterence=new SpeechSynthesisUtterance(text);
    utterence.lang='hi-IN'
    const voices=window.speechSynthesis.getVoices()
    const hindiVoice=voices.find(voice=>voice.lang==='hi-IN')
    if(hindiVoice)
    {
      utterence.voice=hindiVoice;
    }


    isSpeakingRef.current=true;
    utterence.onend=()=>{
      setAiText("");
      isSpeakingRef.current=false;
      setTimeout(() => {
        startRecognition()
      },800);
      
    }
    synth.cancel();
    synth.speak(utterence);
  }

   const handleCommand= (data)=>{
    const {type,userInput,response}=data
    speak(response);

    if(type === 'google_search')
    {
      const query=encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');    
    }

    if( type === 'youtube_search' || type=== 'youtube_play')
   {
     const query=encodeURIComponent(userInput);
     window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
   }
   if(type === 'wikipedia_search')
   {
     const query=encodeURIComponent(userInput);
     window.open(`https://en.wikipedia.org/wiki/Special:Search?search=${query}`, '_blank');
   }
   if(type === 'google_maps_search')
   {
     const query=encodeURIComponent(userInput);
     window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
   }
   if(type === 'weather_search')
   {
     const query=encodeURIComponent(userInput);
     window.open(`https://www.google.com/search?q=weather+${query}`, '_blank');
   }
   if(type === 'instagram_open')
   {
     window.open('https://www.instagram.com/', '_blank');
   }
   if(type=== 'calculator_open')
   {
     window.open('https://www.google.com/search?q=calculator', '_blank');
   }



  }

      useEffect(()=>{
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognitionRef.current=recognition

        let isMounted = true;

        const startTimeout = setTimeout(() => {
         if(isMounted && !isSpeakingRef.current && !isRecognizingRef.current) {
          try{
          recognition.start();
          }
          catch(err)
          {
            if(err.name !== "InvalidStateError") {
              console.error("Error starting speech recognition:", err);
            }
          }
        }
        }, 1000);

        recognition.onstart = () => {
          isRecognizingRef.current = true;
          setListening(true);
        }

        recognition.onend = () => {
          isRecognizingRef.current = false;
          setListening(false);
          if (isMounted && !isSpeakingRef.current) {
            setTimeout(()=>{
              if(isMounted)
              {
                try{
                   recognition.start();
                }
                catch(e)
                {
                  if(e.name !== "InvalidStateError") {
                    console.error("Error restarting speech recognition:", e);
                  }

                }
                
              }
            }, 1000);
          }
        };

recognition.onerror = (event) => {
  if (event.error === "aborted") {
    // This is expected when we stop recognition intentionally
    return;
  }
  console.warn("Speech recognition error:", event.error);
  isRecognizingRef.current = false;
  setListening(false);
  if (isMounted && !isSpeakingRef.current) {
    setTimeout(() => {
      try {
        recognition.start();
      } catch (e) {
        if (e.name !== "InvalidStateError") {
          console.error("Error restarting speech recognition:", e);
        }
      }
    }, 1000);
  }
};


        recognition.onresult=async (e)=>{
        const transcript=e.results[e.results.length - 1][0].transcript.trim();
           if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
            setAiText("")
            setUserText(transcript)
              recognition.stop();
              isRecognizingRef.current=false;
              setListening(false);
            const data=await getGeminiResponse(transcript)
               handleCommand(data)
               setAiText(data.response)
               setUserText("")
           }
    }
 
const fallback = setInterval(() => {
  if (!isRecognizingRef.current && !isSpeakingRef.current) {
    try {
      recognition.start();
    } catch (err) {
      if (err.name !== "InvalidStateError") {
        console.error("Error starting speech recognition:", err);
      }
    }
  }
}, 5000);

  
   return () => {
    isMounted = false;
    clearTimeout(startTimeout);
     recognition.stop();
     setListening(false);
     isRecognizingRef.current = false;
   };

      }, [])




  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex flex-col items-center justify-center gap-[15px]  '>
          <button className='absolute top-[20px] right-[20px] min-w-[150px] h-[60px] mt-[30px] bg-white cursor-pointer text-black font-semibold rounded-full text-[19px] ' onClick={handleLogOut}>Log Out</button>
      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl flex-col shadow-lg'>
        <img src={userData?.assistantImage} alt="" className='h-full object-cover' />
      </div>
      <h1 className='text-white text-2xl font-semibold '>Hey, I’m {userData?.assistantName}</h1>
      {!aiText && <img src={userImg} alt="" className=' w-[250px] ' />}
      {aiText && <img src={aiImg} alt="" className=' w-[400px] ' />}
     <h1 className='text-white text-[18px] font-semibold text-wrap'>{userText?userText:aiText?aiText:""}</h1>
    </div>
  )
}

export default Home
