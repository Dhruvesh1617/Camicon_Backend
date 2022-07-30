const { User } = require("../models/user.model");
const validator=require("email-validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");

const userRegister=async (req,res)=>
{
    const {name,email,password}=req.body; //taking data from body
    const checkValidation=validator.validate(email); //checking email format 
    if(!name || !email || !password)
    {
        return res.status(400).json({message:'Please enter All Fields'})
    }
    try
    {
        if(checkValidation===false)
        {
        return  res.status(400).json({message:"Please enter Email in valid format"}) //email check
        }
        else
        {
            //checking new user
            const user=await User.findOne({email:email})
            if(user)
            {
                return res.status(400).json({message:"User already exists"})
            }
            const newUser=new User({name:name,email:email,password:password})
            //this function will generate salt using saltrounds Obj.genSalt(saltround,(err,salt)=>{})
            bcrypt.genSalt(10,(err,salt)=> 
            {
                //this function will generated hash using salt,password Obj.genSalt(passwd,salt,async funct(err,hash){})
                bcrypt.hash(newUser.password,salt,async (err,hash)=>{ 
                    if(err)
                    {
                        throw new Error(err)
                    }
                    newUser.password=hash;
                    const savedUser=await newUser.save() //saved user data
                    jwt.sign({_id:savedUser._id},process.env.SECRET_KEY,{expiresIn:"12h"},(err,token)=>
                    {
                            if(err)
                            {
                                throw new Error(err)
                            }
                            savedUser.password=undefined;
                            savedUser.__v=undefined;
                        res.status(201).json(
                            {
                            message:"User Registered Successfully",
                            token,
                            user:savedUser
                        })
                    })
                })
            })
        }
    

    }
    catch(err)
    {
        res.status(500).json({message:"Registration unsuccessful",err})
    }
}

const userLogin=async (req,res)=>
{
    const {email,password}=req.body; //took email and password
    const checkValidate=validator.validate(email); //check email format
    if(!email || !password) //checker for checking all Details filled or not
    {
        return res.status(400).json({message:"Please Enter all Details"})
    }
    if(checkValidate===false) //checker for checking email is in valid format or not
    {
        return res.status(400).json({message:"Please enter Email in valid format"})
    }
    try
    {
       
            const user=await User.findOne({email}).select("-__v")
            .populate({path:"cart",model:"CartItem",populate:{path:"products.product",model:"Product"}})
            .populate({path:"wishList",model:"WishListItem",populate:{path:"products",model:"Product"}})
             //to find user with given mailId in Db
            

            if(!user) //if user dont exist
            {
                return res.status(400).json({message:"User do not Exist"})
            }
            const checkPassword= await bcrypt.compare(password,user.password) //password compared
            if(!checkPassword)//checked pasword
            {
                return res.status(400).json({message:"Invalid credentials"})
            }
            jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:"24h"},(err,token)=>
            {
                if(err)
                {
                    throw new Error(err)
                }
                user.password=undefined;
                res.status(200).json({message:"User Logged In Successfully",token,user:user})
            })
        }
    
    catch(err)
    {
        console.error(err);
        res.status(500).json({message:"Login Unsuccessful"})
    }
}


const loadUser=async (req,res)=>
{
    try
    {
    let user_id=req.user._id
    console.log(req.user._id)
    const user=await User.findById(user_id).select("-password -__v -created_at -updatedAt")
    .populate({path:"wishList",model:"WishListItem",populate:{path:"products",model:"Product"}})
    .populate({path:"cart",model:"CartItem",populate:{path:"products.product",model:"Product"}})
    console.log(user)
     return res.status(201).json({user})
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message:"Something went Wrong"})
    }
}


module.exports={userRegister,userLogin,loadUser}