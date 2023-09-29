const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const cryptjs = require("bcryptjs");    
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async  (req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All feilds must be mandatory");
    };
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("Email already present");
    };  

    const hashPassword = await cryptjs.hash(password, 8);
    console.log(`Hashed password is ${hashPassword}`);
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });

    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("User not created");
    }
    res.json({message: "Register the user"});
});

const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All feilds are mandatory");
    }
    const user = await User.findOne({email});
    if(user && (await cryptjs.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id, 
            },
        }, 
        process.env.ACCESSTOKEN,
        {expiresIn: "1m"}
    );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("email or password not valid")
    }
});

const currentUser = asyncHandler(async (req,res)=>{
    res.json({message:"Current user informantion"});
});

module.exports = {registerUser, loginUser, currentUser};