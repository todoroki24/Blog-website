const User = require("../../models/user.model");

const getAuthorsFollowedByUser = async (req,res) =>{
    const userId = req.user._id;
    try {
        console.log(userId) 
        const authorsFollowedByUser = await User.findById(userId).select('followingAuthor').populate('followingAuthor').select('_id fullName') ;
        console.log("Yha tk request aarhi hai aur fir data ja bhi rha hai");
        console.log(authorsFollowedByUser)
        return res.status(200).json({authorsFollowedByUser});
    }catch(err){
        console.log("Error while fetching authors followed by user");
        return res.status(500).json({error:"Internal Server error"});
    }
}

module.exports = {getAuthorsFollowedByUser};