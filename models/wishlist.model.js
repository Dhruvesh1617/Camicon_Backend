const mongoose=require("mongoose")
const {Schema}=mongoose;

const WishListSchema=new Schema({
userId:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
products:[{
    type:Schema.Types.ObjectId,
    ref:"Product"
}]
},
{
    timestamps:{
        createdAt:"created_at"
    }
}
)

const WishListItem=mongoose.model("WishListItem",WishListSchema)

module.exports={WishListItem}