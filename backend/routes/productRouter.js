const express=require("express")
const Product=require("../model/productModel")
const {getProducts,getProductById,createProductReviews, getTopProducts, createProduct, updateProduct,deleteProduct} =require("../controller/productController")
const {protect, isAdmin} =require("../middleware/authMiddleware")
const router=express.Router()

//desc   get All products
//router /api/products
//access public

router.get("/",getProducts)
router.post("/",protect,isAdmin,createProduct)
//desc   get product with id
//router /api/products/:id
//access public
router.get('/top',getTopProducts)
router.get("/:id",getProductById)
router.delete("/:id",protect,isAdmin,deleteProduct)
router.put("/:id",protect,isAdmin,updateProduct)

router.post("/:id/reviews",protect,createProductReviews)



module.exports=router

