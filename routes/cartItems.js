const express=require('express')

const cartRouter=express.Router();
const {CartItems}=require("../models/cartItems.model.js")
cartRouter.route("/")

.get(async (req,res)=>{
  try
  {
    const cartItemdata=await CartItems.find().populate("_id");
    const CartItem=cartItemdata.map(item=>{
      const {_id,...doc}=item._id._doc;
       return {_id,...doc,qty:item.qty}
    })
    res.status(201).json({success:true,CartItem})
  }
  catch(err)
  {
    res.status(500).json({success:false,message:"not able to fetch Cart Items"})
  }
  })



.post(async (req,res)=>{
  try
{
const product=req.body;
 const cartItem = new CartItems(product);
await cartItem.save()
res.status(201).json({success:true,cartData:cartItem})
}
catch(err)
{
  res.status(500).json({success:false,message:"Cannot add products"})
}
})


cartRouter.param("cartID",async (req,res,next,cartID)=>{
try
{
const cartItem=await CartItems.findById(cartID);
if(!cartItem)
{
  res.json({success:false,message:"Did not find cartItem associated to given ID"})
}
req.cartItem=cartItem;
next();
}
catch(err)
{
  console.log({success:false,message:"Did not find cartItem associated to given ID"})
}

})

cartRouter.route("/:cartID")
.get((req,res)=>{
  const {cartItem}=req;
  res.json({success:true,cartItem})
})

.post(async (req,res)=>{
  try{
  const {_id}=req.params;
  const {qty}=req.body;
  const updatedCartItem=await CartItems.findByIdAndUpdate(_id,{qty})
  res.json({success:true,updatedCartItem})
  }
  catch(err)
  {
    console.log(err)
  }

})

.delete(async (req,res)=>{
  let {cartItem}=req;
  await cartItem.remove()
  res.json({success:true,message:"got deleted",cartItem})
})



module.exports={cartRouter}