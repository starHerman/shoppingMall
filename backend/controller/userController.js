const User=require("../model/userModel")
const {generateToken} = require("../util/generateToken")


//@desc  user login
//@route  POST /api/users/login
//@access private

const userAuth=async(req,res)=>{
   try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        console.log(email,password)
        if(user){
             const isAuth=await user.authUser(password)
             if(isAuth){
                 res.send({
                     _id:user._id,
                     name:user.name,
                     email:user.email,
                     isAdmin:user.isAdmin,
                     token:generateToken(user._id)
                 })
             }
             else{
                throw new Error("password is not correct")
             }
        }
        else{
            throw new Error("email not found")
        }  
        
   } catch (error) {
       res.status(401).json({error:error.message})
   }
}

//@desc  user register
//@route  POST /api/users/register
//@access private
const userRegister=async (req,res)=>{
   try {
        const {name,email,password}=req.body
        const existUser=await User.findOne({email})
        if(existUser){
            throw new Error("username exist")
        }
        else{
             const user=await User.create({
                name,
                email,
                password
             })
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user._id)
            })
        }
   } catch (error) {
       res.status(400).send(error.message)
   }
}
//@desc  get user profile
//@route  GET /api/users/profile
//@access private

const getUserProfile=async (req,res)=>{
    try {
        const user=req.user
        if(user){
            res.send({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    })
    }else{
        throw new Error("User not found")
    }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

//@desc  update user profile
//@route  PUT /api/users/profile
//@access private

const updateUserProfile=async (req,res)=>{
    try {
        const user=await User.findOne({_id:req.user._id})
        if(user){
            user.name=req.body.name||user.name
            // console.log(email)
            if(req.body.email){
                user.eamil=req.body.email
            }
            if(req.body.password){
                user.password=req.body.password
            }
            const updateUser=await user.save()
            res.send({
                _id:updateUser._id,
                name:updateUser.name,
                email:updateUser.email,
                isAdmin:updateUser.isAdmin,
                token:generateToken(updateUser._id)
            })
                
    } else{
        throw new Error("User not found")
    }
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

module.exports={userAuth,getUserProfile,userRegister,updateUserProfile}