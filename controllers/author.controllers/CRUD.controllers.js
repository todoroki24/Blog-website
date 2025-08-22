const Author = require('../../models/author.model')
const Blog = require('../../models/blog.model')

const getBlogs = async (req,res) =>{
    const authorId = req.user._id
    try{
            const user = await Author.findById(req.user._id).populate("Blog");
            if(!user){
                return res.status(404).json({error:"User not found"});
            }
            console.log(user.Blog)
                return res.status(200).json({
                Blogs : user.Blog,
                user : {
                    fullName : user.fullName,
                    email : user.email,
                }
            });   
    }catch(err)
    {
        console.log("Error ",err);
        return res.status(500).json({error : "Internal Server Error"});
    }
}

const addBlog = async (req,res)=>{
    const {title,content} = req.body;
    const authorId = req.user._id;
    try {
        const user = await Author.findById(authorId)
        if(!user){
            return res.status(404).json({error : "User not found"});
        }
        const newBlog = await Blog.create({
            title,
            content,
            author : authorId
        })
        await user.Blog.push(newBlog._id);
        await user.save();
        await user.populate('Blog');
        res.status(200).json({message : 'Blogs added Successfully',Blogs:user.Blog});
    }catch(err){
        return res.status(500).json({error : 'Internal Server error'});
    }
}

const deleteBlog = async(req,res) =>{
    const blogId = req.params.id;
    try{
        const user = await Author.findById(req.user._id);
        if(!user){
            return res.status(404).json({error:"User not Found"});
        }
        await Blog.findByIdAndDelete(blogId);
        await user.Blog.pull(blogId);
        await user.save();


        return res.status(200).json({message:"Blog Deleted"});
    }catch(err){
        console.log("Some error has occured while deleting the Blog");
        return res.status(500).json({error:"Internal Server error"});
    }
}

const updateBlog = async(req,res)=>{
    const {title,content} = req.body
    const blogId = req.params.id;
    try{
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {title,content},
            {new : true}
        );
        if(!blog){
            return res.status(404).json({error:"Blog not Found"});
        }
        return res.status(200).json({message:"Blog Updated",Blog});
    }catch(err){
        console.log("Some error has occured while updating the blog",err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}

module.exports = {getBlogs,addBlog,updateBlog,deleteBlog};