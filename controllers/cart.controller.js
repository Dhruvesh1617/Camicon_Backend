const {CartItem}=require("../models/cartItems.model");
const {User}=require("../models/user.model");


const getCartItems=async (req,res)=>
{
    const {userId}=req.params;
    try
    {
    const cartItems=await CartItem.findOne({userId}).populate("products.product").select("-__v")
    res.status(201).json({item:cartItems})
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message:"An error Occured while fetching Data"})
    }
}



const addItemtoCart=async (req,res)=>
{
    const {userId,product}=req.body; //taken Id and product from body
    const foundUserInCart=await CartItem.findOne({userId}) //will find cartItem Object in Cart with given userId
    const foundUser=await User.findById(userId) //will find user object in Usermodel with given ID
    try
    {
    if(foundUserInCart)
    {
        foundUserInCart.products.push({product}); //push product
        const newCartList=await (await foundUserInCart.save()).populate("products.product").execPopulate();//save and populate
        res.status(201).json({message:"Item added to Cart",item:newCartList})
    }
    const addItemInCart=new CartItem({userId,products:[{product}]})
    foundUser.cart=addItemInCart;
    await foundUser.save();
    const savedItem=await (await addItemInCart.save()).populate("products.product").execPopulate();
    res.status(201).json({message:"Item added to Cart",item:savedItem})
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message:"Something went wrong"})
    }

}

const removeItemFromCart=async (req,res)=>
{
    const {userId,productId}=req.body;
    try
    {
    const foundUserInCart=await CartItem.findOne({userId}).select("-__v"); //finding if giving user exist or not in Cart model
    console.log(foundUserInCart.products)
    foundUserInCart.products=foundUserInCart.products.filter((product)=>String(product._id)!==String(productId))//will search if given productId exist or not
    const newCartList=await (await foundUserInCart.save()).populate("products.product").execPopulate();
    console.log(newCartList)
    res.status(201).json({mesage:"Item removed Sucessfully",item:newCartList})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }

}

module.exports={addItemtoCart,getCartItems,removeItemFromCart}