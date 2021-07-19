const express=require("express")
const app=express();
const cors=require("cors")
const port=process.env.PORT || 3000;
const {dbConnection}=require("./db/dbConnection")
const {productRouter}=require("./routes/products");
const {cartRouter}=require("./routes/cartItems.js")
const {wishListRouter}=require("./routes/wishListItems.js")

app.use(cors())
app.use(express.json()) //parses json data

dbConnection(); //connected to DB

app.use("/products",productRouter)
app.use("/cart",cartRouter)
app.use("/wishList",wishListRouter)

app.get("/",(req,res)=>{
    res.send("Welcome Home")
})


app.listen(port,()=>console.log("Successfully connected to Server"))