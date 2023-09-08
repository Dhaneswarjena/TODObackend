import errorhandler from "../middlewares/error.js";
import { User } from "../models/user.js"
import { sendcookies } from "../utils/sendcookies.js"
import bcrypt from 'bcrypt'



export const register=async(req,res,next)=>{
    try {
        const {name,email,password}=req.body;
   let user=await User.findOne({email})
   if(user){
    return next(new errorhandler('user already exist',404))
}
   const hsspassword=await bcrypt.hash(password,10)
   user=await User.create({name,email,password:hsspassword})
   sendcookies(res,user,"Registersuccesfulluy",201)
    } catch (error) {
        next(error)
    }
   
}
export const login=async(req,res)=>{
    try {
        const{email,password}=req.body
const user=await User.findOne({email}).select("+password")
if(!user){
    return next(new errorhandler('invalid username and password',404))
}
const ismatch=await bcrypt.compare(password,user.password)
if(!ismatch){
    return next(new errorhandler('invalid username and password',404))
}
sendcookies(res,user,`welcome back ${user.name}`,200)
    } catch (error) {
        next(error)
    }

}

export const getprofile=(req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user
    })
}
export const logout=(req,res)=>{
    res.status(200).cookie("token","",{
        httpOnly:true,
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
    }).json({
        success:true,
        user:req.user
    })
}