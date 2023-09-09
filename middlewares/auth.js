import { User } from "../models/user.js"
import jwt from "jsonwebtoken"
export const auth=async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        res.status(404).json({
            success:false,
            message:"login first"
        })
    }
    const decode=jwt.verify(token,process.env.JWT_SCREET)
    req.user=await User.findById(decode._id) 
    next()
}