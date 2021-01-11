const route=require("express").Router()
const  {protect}=require("../middleware/authMiddleware")
const {addOrderItems} =require('../controller/orderController')

route.post("/",protect,addOrderItems)


module.exports=route