const express=require("express");
const jwt= require("jsonwebtoken");

 function checkAuthentication(req,res,next)
{
    //first will take token
    const token=req.headers.authorization?.split(" ")[1] || null;
    if(token===null)
    {
        res.status(400).json({message:"SignIn/Register for better user Experience"})
    }
    try
    {
       const decoded=jwt.verify(token,process.env.SECRET_KEY)
       req.user=decoded;
       next()
    }
    catch(err)
    {
        res.status(401).json({errmessage:"session expired please login again"})
    }

}
module.exports={checkAuthentication}