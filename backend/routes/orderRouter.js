const route=require("express").Router()
const  {protect}=require("../middleware/authMiddleware")
const {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders} =require('../controller/orderController')

route.post("/",protect,addOrderItems)
route.get("/myOrders",protect,getMyOrders)
route.get("/:id",protect,getOrderById)
route.put("/:id/pay",protect,updateOrderToPaid)

module.exports=route