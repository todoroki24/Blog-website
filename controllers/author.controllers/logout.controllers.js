const logOut = (req,res) =>{
    res.clearCookie("token","/");
    res.status(200).json({message:"Successfully Log Out"});
}

module.exports = {logOut}