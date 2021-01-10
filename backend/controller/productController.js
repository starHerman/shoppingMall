const Product=require("../model/productModel")



const getProducts=async(req,res)=>{
     try {
        const products=await Product.find({})
        // throw new Error("Product Fetch Failer")
        // console.log(products)
        res.json(products)
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


module.exports={
    getProducts,
    getProductById
}