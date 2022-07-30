const {WishListItem}=require("../models/wishList.model")
const {User}=require("../models/user.model")

const getWishList=async (req,res)=>
{
    const {userId}=req.params;
    try
    {
        const wishlist=await WishListItem.findOne({userId}).populate("products")
        .select("-__v -created_at -updatedAt")
        res.status(200).json({
            items:wishlist
        })
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message:"An error Occured while fetching Data"})
    }
}


const addItemToWishList=async (req,res)=>
{
    const {userId,product}=req.body;
    //it will find given UserId exist or not in wishlist model
    const foundUserWishList=await WishListItem.findOne({userId}) 
    //it will find userId exist or not in User model
    const foundUserData=await User.findById(userId)
    try
    {
        if(foundUserWishList)
        {
            foundUserWishList.products.push(product) //pushing given product 
            //will save the data
            const wishListUpdate=await (await foundUserWishList.save()).populate("products").execPopulate();
            return res.status(201).json({message:"Item added to wishList",item:wishListUpdate})
        }
        const addItemToWishList=new WishListItem({userId,products:[product]})
        foundUserData.wishList=addItemToWishList;
        await foundUserData.save() //storing data on user model
        const savedItem=await (await addItemToWishList.save()).populate("products").execPopulate();
        res.status(201).json({message:"Item added to wishList successfully",item:savedItem})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }


}

const removeItemFromWishList=async (req,res)=>
{
        const {userId,productId}=req.body;
        try
        {
        const item=await  WishListItem.findOne({userId})
        item.products=item.products.filter((product)=>String(product)!==String(productId))
        const newWishList=await (await item.save()).populate("products").execPopulate();
        res.status(201).json({message:"Item Removed from wishList",item:newWishList})
        }
        catch(err)
        {
            console.error(err)
            res.status(500).json({message:"failed to remove Item"})
        }

}

module.exports={addItemToWishList,getWishList,removeItemFromWishList}