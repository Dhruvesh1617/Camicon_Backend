const express=require("express")
const productRouter=express.Router();
const {Product}=require("../models/products.model")


productRouter.route("/")

.get(async (req,res)=>{
try
{
const products=await Product.find({})
res.status(201).json({success:true,products})
}
catch(e)
{
    res.status(500).json({success:false,message:err})
}
})

.post( async (req,res)=>{
    try{
    const newproduct=req.body; //taken object from body 
    const NewProduct=new Product(newproduct); //passed it in Product
    const savedProduct=await NewProduct.save(); //saved it in Product
    res.status(200).json({success:true,savedProduct})
    }
    catch(e)
    {
        res.status(500).json({success:false,message:e})
    }

})




module.exports={productRouter}