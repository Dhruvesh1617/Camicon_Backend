const express=require("express")
const productRouter=express.Router();
const {getAllProducts,postProduct}=require("../controllers/products.controller")


productRouter.route("/").get(getAllProducts).post(postProduct)



module.exports={productRouter}