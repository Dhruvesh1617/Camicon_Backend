const mongoose=require("mongoose")



async function dbConnection()
{
try
{
    await mongoose.connect(process.env.uri,{useNewUrlParser:true,useCreateIndex: true,useFindAndModify: false,useUnifiedTopology:true})
    console.log("Successfully connected to DB")
}
catch(err)
{
    console.log("Not connected",err)
}
}

module.exports={dbConnection}