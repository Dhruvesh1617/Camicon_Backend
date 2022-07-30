const mongoose=require("mongoose")
const {Schema}=mongoose;

const UserSchema=new Schema({
name:{
    type:String,
    required:[true,"name is required"]
},
email:{
    type:String,
    required:[true,"email is required"],
    unique:true
},
password:{
    type:String,
    required:[true,"password is required"]
},
cart:{
    type:Schema.Types.ObjectId,
    ref:"CartItem"
},
wishList:{
    type:Schema.Types.ObjectId,
    ref:"WishListItem"
}
},
{
    timestamps:{
        createdAt:"created_at"
    }
}
)
const User=mongoose.model("User",UserSchema)

module.exports={User}