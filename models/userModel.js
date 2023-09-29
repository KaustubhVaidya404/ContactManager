const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter username"]
    },
    email:{
        type: String,
        required: [true, "Enter email address"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Enter password"]
    }
},
{
    timestamps: true
});


module.exports = mongoose.model("User", userSchema);