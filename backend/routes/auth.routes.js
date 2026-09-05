const express = require("express")
const { registerUser, loginUser } = require("../controllers/auth.Controller")
const { protect } = require("../middleware/auth.middleware")
const adminOnly = require("../middleware/admin.middleware")

const router = express.Router()


router.use("/admin-test",protect,adminOnly,(req,res)=>{
    res.json({
        message:"welcome admin ",
        user:req.user,
    })
})

router.post("/register",registerUser)
router.post("/login",loginUser)



module.exports = router