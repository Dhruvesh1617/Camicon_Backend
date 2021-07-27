const express=require("express")
const {Product}=require("../models/products.model")

const getAllProducts=async (req,res)=>
{
    try
    {
        const products=await Product.find({}).select("-__v");
        res.status(200).json({success:true,products})
    }
    catch(e)
    {
        console.log(e)
        res.status(500).json({message:"Error occured while fetching the data"})
    }

}

const postProduct= async (req,res) =>
{
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
    
}

module.exports={getAllProducts,postProduct}