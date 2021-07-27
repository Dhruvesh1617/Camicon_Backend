const mongoose=require("mongoose")
const {Schema}=mongoose;

const ProductSchema=new Schema(
{
name:{type:String,required:true},
image:{type:String,required:true},
price:{type:Number,required:true},
brand:{type:String,required:true},
inStock:{type:Boolean,required:true},
fastDelivery:{type:Boolean,required:true},
ratings:{type:String,required:true}
})

const Product=mongoose.model("Product",ProductSchema)

module.exports={Product}