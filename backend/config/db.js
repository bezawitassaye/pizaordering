import mongoose from "mongoose";

const connectDB=async()=>{
   
    try {
        await mongoose.connect("mongodb+srv://beza1221love:Baba5678@cluster0.243kmf6.mongodb.net/pizza-del")
        console.log("Db connected")
    
    } catch (error) {
        console.log("Db Connection faild",error)
        
    }
}

export default connectDB