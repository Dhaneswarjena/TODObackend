import express from 'express'
import userouter from './routers/user.js'
import Taskrouter from './routers/task.js'
import {config} from 'dotenv'
import cookieParser from 'cookie-parser';
import { errormiddle } from './middlewares/error.js';
import cors from 'cors'
export const app=express();
config({
    path:'./data/config.env'
})
app.use(cookieParser())
app.use(express.json())

app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
  app.use("/api/v1/users",userouter)
  app.use("/api/v1/task",Taskrouter)
app.get('/',(req,res)=>{
    res.send('Nice working')
})
app.use(errormiddle)
