const express = require("express");

const {registerUser,loginUser} = require("../controllers/authController");
const {protect} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/getuser", protect, (req, res) => {
  res.status(200).json(req.user);
});

router.post("/upload-image", upload.single("image"),(req,res)=>{
    if(!req.file){
        return res.status(400).json({
            message:""
        })
    }
    const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({
        imageUrl
    })
})

module.exports=router;

