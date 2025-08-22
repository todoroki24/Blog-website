const mongoose = require('mongoose');
const Author = require('./author.model');

const blogSchems = new mongoose.Schema({
    title:{
        type : String,
        required: true,
        trim : true
    },
    content :{
        type : String,
        required : true
    },
    image :{
        type : String,
        required : true,
        require : true,
    },
    createdAt :{
        type : Date,
        default : Date.now
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Author",
        required : true
    }
},{timestamps:true});

const Blog = mongoose.model("Blog",blogSchems);

module.exports = Blog;