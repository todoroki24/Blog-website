const jwt = require('jsonwebtoken');
const isAuthenticated = (req,res,next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.status(404).json({error: "User is not Authorized"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_ACCESS_SECRET);
        req.user = decoded
        next();
    }catch(err){
        return res.status(400).json({error:"Token does not match"});
    }
}
module.exports = {isAuthenticated};