import mongoose, { Schema } from "mongoose";


const fooSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})

const foodModel = mongoose.models.food || mongoose.model("food",fooSchema)
export default foodModel;