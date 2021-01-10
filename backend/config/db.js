const mongoose=require("mongoose")

const dbConnect=async ()=>{
    try {
        const con=await mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true,useUnifiedTopology: true})
        console.log("mongodb connected",con.connection.host)
    } catch (error) {
        console.error(error)
    }
}

module.exports=dbConnect