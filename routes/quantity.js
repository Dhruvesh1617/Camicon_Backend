const express=require("express")
const quantityRouter=express.Router()
const {checkAuthentication}=require("../middleware/checkAuthentication")
const {updateQuantity}=require("../controllers/quantity.controller")

quantityRouter.route("/:userId/cart/update").all(checkAuthentication).post(updateQuantity)

module.exports={quantityRouter}