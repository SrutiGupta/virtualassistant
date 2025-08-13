import User from "../model/user.model.js"
import uploadOnCloudinary from "../config/cloudinary.js"
import geminiResponse from "../gemini.js";
import moment from "moment";
import { response } from "express";

export const getCurrentUser=async(req,res) => {
try{
    const userId =req.userId
    const user=await User.findById(userId).select("-password")
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    return res.status(200).json(user)
}
catch(error){
    return res.status(400).json({message:"get current user error"})
}
}

export const UpdateAssistant=async(req,res) => {
    try{
         const{assistantName,imageUrl}=req.body
         let assistantImage = imageUrl;
         if(req.file)
         {
            assistantImage = await uploadOnCloudinary(req.file.path)
         }
         else
         {
            assistantImage = imageUrl
         }

         const user=await User.findByIdAndUpdate(req.userId,{
            assistantName,
            assistantImage
         },{ new:true}).select("-password")
         return res.status(200).json(user)

    }
catch (error){
        console.error("Error updating assistant:", error);
        return res.status(400).json({message:"update assistant error", error: error.message})
    }
}


export const askToAssistant = async (req, res) => {
    try{
        const {command}=req.body
         const user= await User.findById(req.userId);
         user.history.push(command)
         user.save()

         const userName=user.name;
         const assistantName=user.assistantName
          
         const result=await geminiResponse(command,assistantName)

        const jsonMatch = result.match(/{[\s\S]*}/);
        if (!jsonMatch) {
            return res.status(400).json({response:"Sorry I can't understand"});
        }
        const gemResult= JSON.parse(jsonMatch[0]);
         const type=gemResult.type;
         
         switch(type)
         {
            case 'get_date':
                return res.json({
                    type:"general",
                    userInput:gemResult.userInput,
                    response:`Today is ${moment().format("DD/MM/YYYY")}`
                });
                case 'get_time':
                    return res.json({
                        type:"general",
                        userInput:gemResult.userInput,
                        response:`Current time is ${moment().format("HH:mm:ss")}`
                    });
            case 'get_day':
                return res.json({
                    type:"general",
                    userInput:gemResult.userInput,
                    response:`Today is ${moment().format("dddd")}`
                });
                case 'get_month':
                    return res.json({
                        type:"general",
                        userInput:gemResult.userInput,
                        response:`Current month is ${moment().format("MMMM")}`
                    });
                    case 'greeting':
                    return res.json({
                      type: 'general',
                     userInput: gemResult.userInput,
                     response: 'Hello! How can I help you today?'
                     });
                    case 'general':
                    case 'google_search':
                    case 'youtube_search':
                    case 'wikipedia_search':
                    case 'google_maps_search':
                    case 'weather_search':
                    case 'instagram_open':
                    case 'calculator_open':
                    return res.json({
                        type,
                        userInput: gemResult.userInput,
                        response: gemResult.response
                    })
                    default:
                    return res.json({
                        type: "general",
                        userInput: gemResult.userInput || "",
                        response: "Sorry I can't understand"
                    });

                

         }
         
    }
    catch(error){
        return res.status(500).json({
                        response:"Ask assistant error"})

    }
}