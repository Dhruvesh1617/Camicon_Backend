const express=require("express")
const userRouter=express.Router()
const {userRegister,userLogin,loadUser}=require("../controllers/users.controller")
const {checkAuthentication}=require("../middleware/checkAuthentication")
//signup
userRouter.route("/register").post(userRegister)
userRouter.route("/login").post(userLogin)
userRouter.route("/").all(checkAuthentication).get(loadUser)

module.exports={userRouter}