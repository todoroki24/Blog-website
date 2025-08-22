const User = require('../../models/user.model');
const Author = require('../../models/author.model');
const getAllAuthors = async (req,res) =>{
    const userId = req.user._id;
    try {
        const allAuthors = await Author.find().populate('followers').select("fullName followers _id"); 
        console.log("Sare authors chaiye")
        console.log(allAuthors); // .populate('followers') krnak
        res.status(200).json({allAuthors});
    }catch(err){
        res.status(500).json({error : "Internal server error"});
    }
}


module.exports = {getAllAuthors};