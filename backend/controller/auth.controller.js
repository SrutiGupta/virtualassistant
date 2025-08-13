import genToken from "../config/token.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const signUp= async(req,res)=>{
    try{
        const {name,email,password}=req.body
        const existEmail=await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message:"Email already exist"})
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const user=await User.create({
            name,
            email,
            password:hashedPassword
        })
        const token = await genToken(user._id)

        res.cookie("token",token,{
                httpOnly:true,
                maxAge:7*1000*60*60*24,
                secure:True,
                sameSite:"None"
        })


        return res.status(201).json({message:"User created successfully"})

    }
        catch(err){
            return res.status(500).json({message:"Internal Server Error"})
    }
}

export const SignIn= async(req,res)=>{
    try{
        const {email,password}=req.body

        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Email does not exist"})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = await genToken(user._id)

        res.cookie("token",token,{
                httpOnly:true,
                maxAge:7*1000*60*60*24,
                secure:True,
                sameSite:"None"
        })

        
        return res.status(200).json({message:"User created successfully"})

    }
        catch(err){
            return res.status(500).json({message:"login Error"})
    }
}


export const logOut=async (req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"User logged out successfully"})
    }
    catch(err){
        return res.status(500).json({message:"logout Error"})
    }
}
