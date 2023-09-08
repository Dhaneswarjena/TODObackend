import errorhandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const createtask=async(req,res,next)=>{
    try {
        const {title,description}=req.body;
        await Task.create({
         title,
         description,
         user:req.user
        })
     
        res.status(201).json({
         success:true,
         message:"task created"
        })
    } catch (error) {
        next(error)
    }
  
}
export const gettask=async(req,res,next)=>{
    try {
        const userid=req.user._id
        const task=await Task.find({user:userid});
      res.status(200).json({
          success:true,
          task
      })
    } catch (error) {
        next(error)
    }
   
}

export const updatetask=async(req,res,next)=>{
    try {
        const {id}=req.params
    const task=await Task.findById(id)
    if(!task){
        return next(new errorhandler('invalid id',404))
    }
    task.isCompleted=!task.isCompleted
    await task.save()
    res.status(200).json({
        success:true,
        message:"task updated"
    })
    } catch (error) {
        next(error)
    }
    
}
export const deletetask=async(req,res,next)=>{
    try {
        const {id}=req.params
        const task=await Task.findById(id)
        if(!task){
            return next(new errorhandler('invalid id',404))
        }
        await task.deleteOne()
        res.status(200).json({
            success:true,
            message:"task deleted"
        })
    } catch (error) {
        next(error)
    }
   
}