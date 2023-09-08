import { app } from "./app.js";
import { dbconect } from './data/database.js';


dbconect()
app.listen(process.env.PORT,()=>{
    console.log(`server is working on PORT ${process.env.PORT} in ${process.env.NODE_ENV} Mode`)
})