const router=require("express").Router()
const { userAuth,getUserProfile,userRegister,updateUserProfile } = require("../controller/userController")
const { protect}=require("../middleware/authMiddleware")


//desc  user login
//@api   /api/users/login
//@access POST  public
 router.post("/login",userAuth)

 //desc  user register
//@api   /api/users/register
//@access POST public
router.post("/register",userRegister)

 //desc  get user profile
//@api   /api/users/profile
//@access GET  private
router.get("/profile",protect,getUserProfile)

//desc  update user profile
//@api   PUT /api/users/profile
//@access   private

router.put("/profile",protect,updateUserProfile)






module.exports=router