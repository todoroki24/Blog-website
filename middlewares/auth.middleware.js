const jwt = require('jsonwebtoken');

function authmiddleware (req,res,next){
    const token = req.cookies.token;
    if(!token)
    {
        console.log("Unauthorized Accesss");
        return res.status(401).json({error : "Unauthorized Access"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        next()
    }catch(err){
        return res.status(400).json({error : "Invalid Token"});
    }
}

module.exports = {authmiddleware};