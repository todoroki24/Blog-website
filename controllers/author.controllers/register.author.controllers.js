const Author = require('../../models/author.model');
const bcrypt = require('bcrypt');
const {uploadOnCloudinary} = require('../../utils/cloudinary');
const registerUser = async function (req,res){
    // Data Validation
    try{
        console.log(req.body);
        const{fullName,email,password} = req.body;
        const profilePhoto = req.file? req.file.filename : null;
        if(!fullName || !email || !password || !profilePhoto)
        {
            return res.status(400).json({error : "All fields are required"});
        }
        const emailRegex = /^\S+@\S+\.\S+$/;
        if(!emailRegex.test(email))
        {
            return res.status(400).json({error : "Invlaid email address"});
        }

        // Checking for duplicate user
        const existingAuthor = await Author.findOne({email});
        if(existingAuthor)
        {
            console.log("User Already exists");
            return res.status(400).json({error : "User Already Exists"});
        }
        //const hashedPassword = await bcrypt.hash(password,10);  double hashing ho rhi thi backend me bhi kr rha tha na data store krne se phele isiliye
        const uploadResult = await uploadOnCloudinary(req.file); 
        // OR: await uploadOnCloudinary(req.file.path);

        const imageUrl = uploadResult.secure_url || uploadResult.url;
        const newAuthor = new Author({
            fullName,
            email,
            password,
            profilePhoto : imageUrl
        });

        await newAuthor.save();

        console.log("Registerd Successfully",newAuthor);
        return res.status(200).json({message:"Registered successfully"})
        //return res.redirect('/author/dashboard'                                                                                                                                                                                                                                     );
        //res.status(201).json({message:"User Registered Successfully"});
        
    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Server error"});
    }

}

module.exports = {registerUser};