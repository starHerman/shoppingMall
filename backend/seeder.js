const mongoose=require("mongoose")
const dotenv=require("dotenv")
const users=require('./data/users')
const products=require("./data/products")
const User=require("./model/userModel")
const Product=require("./model/productModel")
const Order=require("./model/orderModel")
const dbConnect=require("./config/db")

dotenv.config()
dbConnect()


const importData=async()=>{
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const createUsers=await User.insertMany(users)
        const adminUser=createUsers[0]._id
        const sampleProdcuts=products.map(product=>{
            return {...product,user:adminUser}
        })
        await Product.insertMany(sampleProdcuts)
        console.log("data import")
        process.exit()
        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const destroyData=async()=>{
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log("data destroy")
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

console.log(process.argv[2])
if(process.argv[2]=="-d"){
    destroyData()
}
else{
    importData()
}