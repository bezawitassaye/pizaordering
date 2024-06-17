import foodModel from "../models/foodmodel.js";
import fs from "fs"

const addfood=async(req,res)=>{
   let image_filename = `${req.file.filename}`;
   
   const food = new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
   })

   try {
      await food.save()
      res.json({success:true,message:"Pizaa added"})
   } catch (error) {
     console.log(error)
     res.json({success:false,message:"Pizaa add faild"})
   }
}

const listfood = async(req,res)=>{
   try {
      const foods = await foodModel.find({})
      res.json({success:true,data:foods}) 
   } catch (error) {
      console.log(error)
      res.json({success:false,message:"get the food is falid"})
      
   }

}
const foodremove = async (req, res) => {
   try {
     const food = await foodModel.findById(req.body.id);
     if (!food) {
       return res.status(404).json({ success: false, message: "Food not found" });
     }
 
     fs.unlink(`uploads/${food.image}`, () => {});
 
     await foodModel.findByIdAndDelete(req.body.id);
     
     res.json({ success: true, message: "Food deleted successfully" });
   } catch (error) {
     console.log(error);
     res.status(500).json({ success: false, message: "Failed to delete food" });
   }
 };
 

export  {addfood,listfood,foodremove}