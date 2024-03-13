const express = require("express");
const userRouter = express.Router();
const { Account, User } =  require("../db");
const { signIn, signUp, update } = require("../types");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");


userRouter.post("/signup", async (req, res) => {
    const userData = req.body;
    const { success } = signUp.safeParse(userData);
    console.log(success);
    if(!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username: userData.username
    })

    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

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
    const isUserExist = await User.findOne({
        username: body.username,
        password: body.password
    })

    console.log(isUserExist);
    if(!isUserExist) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const userId = isUserExist._id;

    const token = jwt.sign({userId}, JWT_SECRET);
    return res.status(200).json({
        token: token
    })
});

userRouter.put("/", authMiddleware, async (req, res) => {
    const { success } = update.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({
        _id: req.userId
    }, req.body);

    res.json({
        message: "Updated successfully"
    })
})

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

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