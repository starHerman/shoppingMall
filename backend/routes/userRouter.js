const router=require("express").Router()
const { userAuth,getUserProfile,userRegister,updateUserProfile, getUsers,deleteUser } = require("../controller/userController")
const { protect,isAdmin}=require("../middleware/authMiddleware")


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
router.delete("/:id",protect,isAdmin,deleteUser)
//desc  update user profile
//@api   PUT /api/users/profile
//@access   private

router.put("/profile",protect,updateUserProfile)

router.get("/",protect,isAdmin,getUsers)






module.exports=router