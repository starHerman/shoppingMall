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
            throw new Error("invalid token")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}


module.exports={protect}