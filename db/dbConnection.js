const mongoose=require("mongoose")

const uri="mongodb+srv://DhruveshShetty:Dexter%40162O17@neog-cluster.wcltu.mongodb.net/inventory"

async function dbConnection()
{
try
{
    await mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
    console.log("Successfully connected to DB")
}
catch(err)
{
    console.log("Not connected",err)
}
}

module.exports={dbConnection}