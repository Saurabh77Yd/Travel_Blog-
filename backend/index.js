require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const express = require("express");
const cors  = require("cors");
const jwt  = require ("jsonwebtoken");

const User = require("./models/user.model");
const TravelStory = require("./models/travelStory.model");
const { authenticateToken } = require("./utilities");

mongoose.connect(config.connectionString);



const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));

//Create Account 
app.post("/create-account", async(req, res)=>{
    const {fullName, email, password} = req.body;
     if(!fullName|| !email || !password) {
        return res.status(400).json({
            error:true, message:"All fields are require"
        })
    }

    const isUser = await User.findOne({email});
    if(isUser){
        return res.status(400).json({
            error:true,
            message:"USer alredy exists"
        })
    }

    const hashPassword = await bcrypt.hash(password,10);
    const user = new User({
        fullName,
        email,
        password:hashPassword
    })

    await user.save();
    const accessToken = jwt.sign(
        {userId: user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h"
        }
    );

    return res.status(201).json({
        error: false,
        user:{ fullName:user.fullName, email:user.email },
        accessToken,
        message:"Registration Successful"
    })
})

//Login
app.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"Email and Password are required"
        })
    }

    const user =  await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"User Not found"
        });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid Credentails"
        })
    }

    const accessToken = jwt.sign(
        {userId: user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h"
        }
    );

    return res.status(200).json({
        error: false,
        message : "Login Successful",
        user: {fullName: user.fullName, email:user.email},
        accessToken,
    });

})

//Get User
app.get("/get-user", authenticateToken, async(req, res)=>{
    const {userId} = req.user;
    const isUser = await User.findOne({_id:userId})
    if(!isUser){
        return res.sendStatus(401);
    }
    return res.json({
        user: isUser,
        message:"",
    });
});

//Add Travel Story
app.post("/add-travel-story", authenticateToken, async(req,res)=>{
    const { title, story, visitedLocation, imageUrl, visitedDate} = req.body;
    const { userId } = req.user;

    //validate required field
    if(!title || !story || !visitedLocation || !imageUrl || !visitedDate){
        return res.status(400).json({
            error : true,
            message : "All fields are required"
        })
    }
})

app.listen(8000);
module.exports = app;