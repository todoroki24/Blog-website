const User = require('../../models/user.model')
const Author = require('../../models/author.model')

const followUnfollowAuthor = async (req,res) =>{
    let requestType = req.body.request;
    console.log(req.body)
    let authorId = req.body.authorId
    const userId = req.user._id;
    console.log("Kahani database tk poch gyi")
    console.log(requestType)
    if(!requestType){
        return res.status(404).json({error : "Request is not Specified"});
    }
    try {
        if(requestType==='Follow'){
            const addingFollower = await Author.findByIdAndUpdate(authorId,{
                $addToSet : {followers : userId}
            });
            if(!addingFollower){
                return res.status(404).json({error : "Author not Found"});
            }
            const addingFollowing = await User.findByIdAndUpdate(userId,{
                $addToSet : {followingAuthor : authorId}
            })
            if(!addingFollower){
                return res.status(404).json({error : "User not Found"});
            }
        }
        else if(requestType==='Unfollow'){
            const removingFollower = await Author.findByIdAndUpdate(authorId,{
                $pull : {followers : userId}
            })
            if(!removingFollower){
                return res.status(404).json({error : "Author not found"});
            }
            const removingFollowing = await User.findByIdAndUpdate(userId,{
                $pull : {followingAuthor : authorId}
            })
            if(!removingFollowing){
                return res.status(404).json({error : "User not Found"});
            }
        }
    }catch(err){
        console.log("Error While adding/removing follower");
        return res.status(500).json({error : "Internal Server Error"});
    }
}

module.exports = {followUnfollowAuthor};