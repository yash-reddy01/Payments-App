const express = require("express");
const userRouter = express.Router();
import { User } from "../db";
import { signIn, signUp } from "../types";
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");


userRouter.post("/signup", async (req, res) => {
    const userData = req.body;
    const parsedUserData = signUp.safeParse(userData);
    if(!parsedUserData.success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }
    
    const existingUser = User.findOne({
        username: userData.username
    })

    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username: parsedUserData.username,
        password: parsedUserData.password,
        firstName: parsedUserData.firstName,
        lastName: parsedUserData.lastName
    })

    const userId = user._id;

    const token = jwt.sign(userId, JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
	    token: token
    })
    });

userRouter.post("/signin", async (req, res) => {
    const body = req.body;
    const { success } = signIn.safeParse(body);
    if(!success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }
    const isUserExist = await User.find({
        username: body.username,
        password: body.password
    })
    if(!isUserExist) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const token = jwt.sign(isUserExist._id, JWT_SECRET);
    return res.status(200).json({
        token: token
    })
});


module.exports = userRouter;