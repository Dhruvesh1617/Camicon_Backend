const express=require("express")
const app=express();
const dotenv=require("dotenv")
dotenv.config()
const cors=require("cors")
const port=3001;
const {dbConnection}=require("./db/dbConnection")
const {productRouter}=require("./routes/products");
const {cartRouter}=require("./routes/cartItems.js")
const {wishListRouter}=require("./routes/wishListItems.js")
const {userRouter}=require("./routes/users")
const {quantityRouter}=require("./routes/quantity")
app.use(cors())
app.use(express.json()) //parses json data

dbConnection(); //connected to DB

app.use("/products",productRouter)
app.use("/users",wishListRouter)
app.use("/users",cartRouter)
app.use("/users",userRouter)
app.use("/users",quantityRouter)

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: "An error occurred, see the errorMessage key for more details",
		errorMessage: err.message,
	});
}); 
app.get("/",(req,res)=>{
    res.send("Welcome Home")
})


app.listen(process.env.PORT || port,()=>console.log("Successfully connected to Server"))