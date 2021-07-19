const mongoose=require("mongoose")

const {Schema}=mongoose;

const CartItemsSchema=new Schema({
_id:{type:Schema.Types.ObjectId,ref:"Product"},
qty:{type:Number,required:true},
},
{ timestamps: true }
)

const CartItems=mongoose.model("CartItems",CartItemsSchema)

module.exports={CartItems}