const express=require("express")
const cartRouter=express.Router()
const {addItemtoCart,getCartItems,removeItemFromCart}=require("../controllers/cart.controller")
const {checkAuthentication}=require("../middleware/checkAuthentication")

cartRouter.route("/:userId/cart").all(checkAuthentication).post(addItemtoCart)
cartRouter.route("/:userId/cart").all(checkAuthentication).get(getCartItems)
cartRouter.route("/:userId/cart/remove").all(checkAuthentication).post(removeItemFromCart)

module.exports={cartRouter}