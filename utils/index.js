import mongoose from "mongoose";
 const dbConnection=async()=>{
    try{
     
     await mongoose.connect(process.env.MONGODB_URL,{
     
  

     });

     console.log("connection established")

    }
    catch(error){
    console.log("DB error"+error);
 }
 };

 export default dbConnection;