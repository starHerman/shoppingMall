const express=require('express')
const dotenv=require('dotenv')
const dbConnect=require("./config/db")
const productRoute=require("./routes/productRouter")
const userRoute=require("./routes/userRouter")
const orderRoute=require("./routes/orderRouter")
const {notFound,errorHandler} =require("./middleware/errorHandler")
dotenv.config()

dbConnect()
const app=express()
app.use(express.json())

const PORT=process.env.PORT||5000
const NODE_ENV=process.env.NODE_ENV
app.get("/",(req,res)=>{
    res.send("API is running")
})
app.use("/api/products",productRoute)
app.use("/api/users",userRoute)
app.use("/api/orders",orderRoute)

app.get("/api/config/clientId",(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})
// app.use(notFound)
// app.use(errorHandler)


app.listen(PORT,()=>{
    console.log(`server running in ${NODE_ENV} on PORT ${PORT}`)
})




