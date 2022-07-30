const {
    CartItem
} = require("../models/cartItems.model");
const {
    User
} = require("../models/user.model");


const getCartItems = async (req, res,next) => {
    const {
        userId
    } = req.params;
    try {
        const cartItems = await CartItem.findOne({
            userId
        }).populate("products.product").select("-__v")
        res.status(201).json({
            item: cartItems
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: "An error Occured while fetching Data"
        })
        next(err)
    }
}



const addItemtoCart = async (req, res,next) => {
    const {userId,product,qty}=req.body;
    const foundUserInCart=await CartItem.findOne({userId}) //it will find userId is present in cart or not
    const foundUser=await User.findById(userId) //it will find userId is present in User model or not
   //console.log(foundUserInCart,foundUser)
    try
    {
        if(foundUserInCart)
        {
        foundUserInCart.products.push({product,qty})  //adding data into existing cart
        const newCartItem= await (await foundUserInCart.save()).populate("products.product").execPopulate();
       return res.status(201).json({success:true,message:"CartItem added successfully",item:newCartItem})
        }
    const addToCart=new CartItem({userId,products:[{product,qty}]}) //adding cart data for user first Time
    foundUser.cart=addToCart; //saving Data in user model
    await foundUser.save();
    console.log("new user Data",foundUser.cart)
    const newCartData=await (await addToCart.save()).populate("products.product").execPopulate()
    res.status(201).json({success:true,message:"CartItem added successfully",item:newCartData})  
}  
catch(err)
{
console.log(err)
next(err)
}
}

const removeItemFromCart = async (req, res) => {
    const {
        userId,
        productId
    } = req.body;
    try {
        const foundUserInCart = await CartItem.findOne({
            userId
        }).select("-__v"); //finding if giving user exist or not in Cart model
        console.log(foundUserInCart.products)
        foundUserInCart.products = foundUserInCart.products.filter((product) => String(product._id) !== String(productId)) //will search if given productId exist or not
        const newCartList = await (await foundUserInCart.save()).populate("products.product").execPopulate();
        console.log(newCartList)
        res.status(201).json({
            message: "CartItem removed Sucessfully",
            item: newCartList
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Something went wrong"
        })
    }

}

module.exports = {
    addItemtoCart,
    getCartItems,
    removeItemFromCart
}