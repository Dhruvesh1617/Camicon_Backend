const {
    CartItem
  } = require("../models/cartItems.model")
  const {
    User
  } = require("../models/user.model")
  
  const updateQuantity = async (req, res) => {
  
    const {
      cartId,
      productId,
      operation
    } = req.body;
  
    //console.log(updateQuantity)
    try {
      const updateQuantity = await CartItem.findById(cartId).select("-__v");
      if (operation === "increment") {
         updateQuantity.products.map((item) => String(item._id) === String(productId) ? (item.qty = item.qty + 1) : (item)) //updating data-inc
      const updatedQuantity = await (await updateQuantity.save()).populate("products.product").execPopulate() //saving data
       return res.status(201).json({
          success: true,
          message:"Quantity updated successfully",
          item: updatedQuantity
        })
      }
      updateQuantity.products.map((item) => String(item._id) === String(productId) ? (item.qty = item.qty - 1) : item) //updating data for decrement
      const updatedQuantity = await (await updateQuantity.save()).populate("products.product").execPopulate() //saving data
    return  res.status(201).json({
        success: true,
        message:"Quantity updated successfully",
        item: updatedQuantity
      })
    } catch (err) {
      console.log(err)
    } finally {
      console.log("finish")
    }
  
  }
  
  module.exports = {
    updateQuantity
  }
  