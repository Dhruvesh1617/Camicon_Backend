const {CartItem}=require("../models/cartItems.model")

const updateQuantity=async (req,res)=>
{
    const {cartId,productId,operation}=req.body; //will take cartId and prdct Id from body
    
    try
    {
    const itemToUpdate=await CartItem.findById(cartId).select("-__v"); //it will cartItem with specified ID
    if(operation==="increment")
    {
        itemToUpdate.products=itemToUpdate.products.map((product)=>String(product._id)===String(productId)?(product.qty=product.qty+1):(product)) //increment
        const newQuantity=await (await itemToUpdate.save()).populate("products.product").execPopulate() //save and populate
      return  res.status(201).json({message:"Quantity Updated",item:newQuantity})
    }
    itemToUpdate.products=itemToUpdate.products.map((product)=>String(product._id)===String(productId)?(product.qty=product.qty-1):(product)) //decrement
    const newQuantity=await (await itemToUpdate.save()).populate("products.product").execPopulate() //save and populate
  return  res.status(201).json({message:"Quantity Updated",item:newQuantity})
}
catch(err)
{
    console.error(err)
    res.status(500).json({message:"Something went wrong"})
}


}

module.exports={updateQuantity}