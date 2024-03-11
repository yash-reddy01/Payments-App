const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:Yash%402001@cluster0.rkdvdjf.mongodb.net/paytm");
console.log("success");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const User = mongoose.model("User", userSchema);
module.exports = {
    User: User
}