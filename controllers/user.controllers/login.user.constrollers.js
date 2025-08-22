const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const loginUser = async (req,res) =>{
    const {email,password} = req.body;
    const emailRegex = /^\S+@\S+\.\S+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({error:"Invalid Email Format"});
    }
    if(password.length<6){
        return res.status(400).json({error:"Password must be of 6 characters"});
    }
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({error:"User not Found"});
        }
        const isMatch = await bcrypt.compare(password,existingUser.password);
        if(!isMatch){
            return res.status(401).json({error:"Password does not Match"});
        }
        const token = existingUser.generateAccessToken();
        if(token){
            console.log("Access Token generated, User Side pe");
        }
        res.cookie("token",token,{httpOnly:true,path:"/"});
        res.status(200).json({messge:"Successfully Log in"})
    }catch(err){
        return res.status(500).json({error:"Internal Server Error"});
    } 
}

module.exports = {loginUser};