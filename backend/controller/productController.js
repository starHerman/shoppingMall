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
        res.json({products,pageNum,pages})
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


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
        const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        throw new Error('Product not found')
    }
  } catch (error) {
      res.json(error.message)
  }
}

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
 try {
      const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    throw new Error('Product not found')
  }
 } catch (error) {
     res.status(400).json(error.message)
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
    getTopProducts,
    deleteProduct,
    createProduct,
    updateProduct
}