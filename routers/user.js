import express from "express";
import {register,getprofile,login,logout} from '../controllers/usercontrol.js'
import { auth } from "../middlewares/auth.js";
const router=express.Router();


router.post('/new',register)
router.post('/login',login)
router.get('/me',auth,getprofile)
router.get('/logout',logout)

export default router;