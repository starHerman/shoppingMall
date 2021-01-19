const jwt=require("jsonwebtoken")
const User=require("../model/userModel")
const protect=async (req,res,next)=>{
    try {
        if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
            const token=req.headers.authorization.split(" ")[1]
            const decode=jwt.verify(token,process.env.JWT_SECRET)
            const user=await User.findOne({_id:decode.id}).select("-password")
            req.user=user
            next()
        }
        else{
            throw new Error("user not authorized")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const isAdmin=(req,res,next)=>{
    try {
        if(req.user&&req.user.isAdmin){
            next()
        }
        else{
            throw new Error("user not authorized or not as an admin user")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports={protect,isAdmin}