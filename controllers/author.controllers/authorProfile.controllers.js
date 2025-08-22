const Author = require('../../models/author.model');
const showAuthorProfile = async (req,res) =>{
        let authorId = req.params.id
        console.log(authorId)
    try {
        const authorInfo = await Author.findById(authorId)
        .populate({
            path : 'Blog',
            select : 'title content'
        })
        .populate({
            path : 'followers',
            select : 'fullName'
        })
        .select('fullName')
        return res.status(200).json({authorInfo});
    }catch(err){
        console.log("Error aagi oyee author ki profile kholte time",err);
        return res.status(500).json({error : "Internal Server Error"});
    }
}

module.exports = {showAuthorProfile};