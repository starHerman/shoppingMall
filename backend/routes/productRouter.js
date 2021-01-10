const express=require("express")
const Product=require("../model/productModel")
const {getProducts,getProductById} =require("../controller/productController")
const router=express.Router()

//desc   get All products
//router /api/products
//access public

router.get("/",getProducts)

//desc   get product with id
//router /api/products/:id
//access public

router.get("/:id",getProductById)

module.exports=router

