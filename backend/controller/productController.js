const Product=require("../model/productModel")



const getProducts=async(req,res)=>{
     try {
         const pageSize=2
         const pageNum=Number(req.query.pageNum)||1
        const products=await Product.find({}).limit(pageSize).skip(pageSize*(pageNum-1))
        const productCount=await Product.countDocuments({})
        const pages=Math.ceil(productCount/pageSize)
        console.log(pages)
        // throw new Error("Product Fetch Failer")
        // console.log(products)
        res.json({products,pages})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const getProductById=async(req,res)=>{
     try {

        const product=await Product.findOne({_id:req.params.id})
        // throw new Error("product not found")
        // console.log(product+"product")
        if(product)
            res.json(product)
        else
            throw new Error("Product Not Found")
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


// @desc    create product reviews
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReviews = async (req, res) => {
    try {
        const {rating,comment}=req.body;
        console.log(rating)
        const product=await Product.findOne({_id:req.params.id})
        if(product){
            const existReview=product.reviews.find(r=>r.user.toString()===req.user._id.toString())
            if(existReview){
                throw new Error("you have already review")
            }
            else{
                const review={
                    name:req.user.name,
                    rating:Number(rating),
                    comment,
                    user:req.user._id
                }
                product.reviews.push(review)
                product.rating=product.reviews.reduce((acc,cur)=>cur.rating+acc,0)/product.reviews.length
                product.numReviews = product.reviews.length
                await product.save()
                res.send("comment added")
            }
        }else{
            throw new Error("product not found")
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = async (req, res) => {
  try {
      const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
  } catch (error) {
      res.status(400).send(error.message)
  }
}

module.exports={
    getProducts,
    getProductById,
    createProductReviews,
    getTopProducts
}