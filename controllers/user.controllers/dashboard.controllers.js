const User = require('../../models/user.model')
const Blog = require('../../models/blog.model');
const getInfo = async (req,res) =>{
    const userId = req.user._id;
    try{
        const user = await User.findById(userId).select('followingAuthor').lean()
        if(!user){
            return res.status(404).json({error:"User not Found"});
        } 
        const followingAuthorIds = Array.isArray(user.followingAuthor)?user.followingAuthor : [user.followingAuthor];
        //const followingAuthor = user.followingAuthor;
        //console.log(user);
        const Blogs = await Blog.find({
            author:{$in:followingAuthorIds}
        })
        .populate("author","fullName profilePhoto")
        
        console.log(Blogs[0].author);
        //console.log(Blogs.author?.Blog);
        console.log("Everything ok on backend");
        return res.status(200).json({message : "Successfull", Blogs});
    }catch(err){
        return res.status(500).json({error:"Internal Server error"});
    }
}

module.exports = {getInfo};