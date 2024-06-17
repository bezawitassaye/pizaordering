import userModel from "../models/usermodel.js";

const add = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData; 
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Add To Cart" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const remove = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Removed From Cart"})
        
    } catch (error) {
       console.log(error)
       res.json({success:false,message:"Error"})
        
    }


}

const get = async(req,res)=>{
    
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData
        res.json({success:true,cartData})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

export {add,remove,get}