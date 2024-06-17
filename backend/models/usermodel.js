import mongoose,{Schema} from "mongoose";
import { type } from "os";


const userschema = new  mongoose.Schema ({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}

},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user",userschema)
export default userModel