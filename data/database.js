
import mongoose from 'mongoose';
export const dbconect=()=>{
    mongoose.connect(process.env.MONGODB_URI,{
    dbname:'backendapi'
}).then((c)=>console.log(`Data base connected with ${c.connection.host}`))
}