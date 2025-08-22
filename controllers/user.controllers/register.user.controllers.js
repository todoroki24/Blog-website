const User = require('../../models/user.model');

const registerUser = async(req,res) =>{
    console.log('kahani')
    const {fullName,email,password} = req.body;
    if(fullName==="" || email==="" || password===""){
        console.log("sb khali")
        return res.status(400).json({error:"All fields are mandatory"});
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if(!emailRegex.test(email)){
        console.log("Email galat");
        return res.status(400).json({error:"Invalid Email address"});
    }
    if(password.length<6){
        console.log("password dikkat")
        return res.status(400).json({error:"Password must be of atleat 6 characters"});
    }
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            console.log("user phele ka hai")
            return res.status(400).json({error:"User Already Exists"});
        }
        const newUser = new User({
            fullName,
            email,
            password
        })
        await newUser.save();
        console.log("Register ho gya oye")
        res.status(200).json({message:"Successfully Login in"})
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"});
    }

}

module.exports = {registerUser};