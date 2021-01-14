const express=require("express")
const Product=require("../model/productModel")
const {getProducts,getProductById,createProductReviews, getTopProducts} =require("../controller/productController")
const {protect} =require("../middleware/authMiddleware")
const router=express.Router()

//desc   get All products
//router /api/products
//access public

router.get("/",getProducts)

//desc   get product with id
//router /api/products/:id
//access public
router.get('/top',getTopProducts)
router.get("/:id",getProductById)

router.post("/:id/reviews",protect,createProductReviews)



module.exports=router

