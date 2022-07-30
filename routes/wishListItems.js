
const express=require("express")
const {addItemToWishList,getWishList,removeItemFromWishList}=require("../controllers/wishList.controller")
const wishListRouter=express.Router()
const {checkAuthentication}=require("../middleware/checkAuthentication")

wishListRouter.route("/:userId/wishlist").all(checkAuthentication).post(addItemToWishList) //post a product
wishListRouter.route("/:userId/wishlist").all(checkAuthentication).get(getWishList) //get wishlist
wishListRouter.route("/:userId/wishlist/remove").all(checkAuthentication).post(removeItemFromWishList) //remove Item

module.exports={wishListRouter}