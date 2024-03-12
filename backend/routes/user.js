const express = require("express");
const userRouter = express.Router();
import { Account, User } from "../db";
import { signIn, signUp, update } from "../types";
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");


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

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

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

userRouter.put("/", authMiddleware, async (res, req) => {
   const { success } = update.safeParse(req.body);
   if(!success) {
    return res.status(411).json({
        message: "Error while updating information"
    });
   }

   await User.updateOne({_id: req.userId}, req.body);

   return res.status(200).json({
        message: "Updated successfully"
   })
});

userRouter.get("/bulk", async (req, res) => {
    const filter = req.body.filter;

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            },
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.status(200).json({
        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = userRouter;