
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generatetoken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"});
};

//register user
exports.registerUser= async (req , res)=>{
    const {fullName , email , password , profileImageUrl} = req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }

    try{
        const existinguser = await User.findOne({email});
        if(existinguser){
            return res.status(400).json({
                message:"Email already in use"
            })
        }

        //create user
        const user=await User.create({
            fullname: fullName,
            email,
            password,
            profileImageUrl
        });

        return res.status(200).json({
            id:user._id,
            user,
            token:generatetoken(user._id),
        })
    }catch(err){
        return res.status(400).json({
            message:"Error in registering the user",
            error:err.message
        });
    }
};


//login user
exports.loginUser= async (req , res)=>{
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"Email and password are required"
        })
    }

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }

        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }

        return res.status(200).json({
            id:user._id,
            user,
            token:generatetoken(user._id),
        })
    }catch(err){
        return res.status(400).json({
            message:"Error in logging in the user",
            error:err.message
        });
    }
};

