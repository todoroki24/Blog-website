const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Blog = require("./blog.model");
const User = require('./user.model')

const authorSchema = new mongoose.Schema({
    fullName: {
        required : [true, "Fullname is required"],
        type : String,
        trim : true
    },
    email :{
        required : [true,"Email is required"],
        type : String,
        trim : true,
        unique : true,
        lowercase : true,
        validate : {
            validator : validator.isEmail,
            message : "Please enter a valid Email Address"
        }
    },
    password : {
        required : true,
        type : String, 
        minlength : 6
    },
    refreshToken : {
        type : String,
        select : false
    },
    profilePhoto : {
        type : String, // Cloudinary Url
        required : true,
    },
    Blog : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Blog"
    }
    ],
    followers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }]
},{timestamps:true})

authorSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); // hash only if password is changed
    this.password = await bcrypt.hash(this.password,10);
    next();
})

authorSchema.methods.comparePassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword,this.password);
}
// JWT token bacha hai

authorSchema.methods.generateRefreshToken  = function() {
    return jwt.sign(
        {id : this._id},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn : "7D"} // long-lived
    )
};

authorSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {_id : this._id , fullName : this.fullName , email : this.email},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn : "30m"}
    )
}

const Author = mongoose.model('Author',authorSchema);

module.exports = Author;