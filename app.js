const express=require("express")
const app=express();
const port=process.env.port || 3000;
const {dbConnection}=require("./db/dbConnection")
const {productRouter}=require("./routes/products");
const products=[{id:1,name:"chai",price:10},{id:2,name:"nan-cutai",price:20}] //Dummy data

app.use(express.json()) //parses json data

dbConnection(); //connected to DB

app.use("/products",productRouter)

app.get("/",(req,res)=>{
    res.send("Welcome Home")
})
/*get data
app.get("/products",(req,res)=>{
    res.json({success:true,products})
}) 
//get data by id
app.get("/products/:id",(req,res)=>{
    const {id}=req.params;
    const productfind=products.find(product=>product.id==id)
    productfind?res.status(200).json({success:true,productfind}):res.status(500).json({success:false,msg:"cannot find given id"})
})
//post data
app.post("/products",(req,res)=>{
    const {name,price}=req.body;
    const newProduct=[...products,{id:products.length+1,name,price}]
    res.json({success:true,newProduct})

})

//update any value
app.post("/products/:id",(req,res)=>{
    const {id}=req.params;
    const newProduct=req.body;
    products.forEach((product)=>{
        if(product.id==id)
        {
            Object.keys(newProduct).map(key=>{
                if(key in product)
                {
                    product[key]=newProduct[key]
                }
            })
        }
    })
    res.json({success:true,products})
})*/

app.listen(port,()=>console.log("Successfully connected to Server"))