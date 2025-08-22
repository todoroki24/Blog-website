const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const Author = require('./author.model')
const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : [true,"Full Name is mandatory"],
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    followingAuthor : [{
        type : mongoose.Schema.ObjectId,
        ref:"Author"
    }]
},{timestamps:true})


userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {_id:this._id,fullName:this.fullName,email:this.email},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn:"15m"}
    )
}


const User = mongoose.model("User",userSchema);
module.exports = User;