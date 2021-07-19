const express=require("express")
const wishListRouter=express.Router();
const {WishListItem}=require("../models/wishlist.model.js")
wishListRouter.route("/")

.get(async(req,res)=>{
  try{
  const wishListData=await WishListItem.find().populate("_id")
  const wishListItem=wishListData.map((item)=>{
    const {_id,...doc}=item._id._doc;
    return {_id,...doc};
  })
  res.status(201).json({success:true,wishListItem})
  }
  catch(err)
  {
    console.log(err)
  }
})

.post(async (req,res)=>{
  try
{
const product=req.body;
const wishListItem=new WishListItem(product);
await wishListItem.save()
res.status(201).json({success:true,wishListItem})
}
catch(err)
{
  console.log(err)
  res.status(500).json({success:false,message:"not able to send product"})
}
})

wishListRouter.param("wishListID",async (req,res,next,wishListID)=>{
try
{
const wishListItem=await CartItems.findById(wishListID);
if(!wishListItem)
{
  res.json({success:false,message:"Did not find wishListItem associated to given ID"})
}
req.wishListItem=wishListItem;
next();
}
catch(err)
{
  console.log({success:false,message:"Did not find cartItem associated to given ID"})
}

})
wishListRouter.route("/:wishListID")

.get((req,res)=>
{
  const {wishListItem}=req;
   res.json({success:true,wishListItem})
})

.delete(async (req,res)=>
{
let {wishListItem}=req;
  await wishListItem.remove()
  res.json({success:true,message:"got deleted",wishListItem})
})

module.exports={wishListRouter}