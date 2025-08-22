const express = require("express");
const router = express.Router();
const Author = require('../models/author.model');
const {registerUser} = require('../controllers/author.controllers/register.author.controllers');
const {loginUser} = require('../controllers/author.controllers/login.author.controllers');
const {authmiddleware} = require('../middlewares/auth.middleware');
const {getBlogs,addBlog,updateBlog,deleteBlog} = require('../controllers/author.controllers/CRUD.controllers')
const {logOut} = require('../controllers/author.controllers/logout.controllers')
const {isAuthenticated} = require('../middlewares/user.auth.middleware');
const {showAuthorProfile} = require('../controllers/author.controllers/authorProfile.controllers')
const upload = require('../middlewares/upload/multer.middleware');
// Routes for registration of User
router.get('/api/register',(req,res)=>{
    res.render('author/register');
})
router.post('/api/register',upload.single('profile'),registerUser);

// Routes for login of User
router.get('/api/login',(req,res)=>{
    res.render('author/login');
})
router.post('/api/login',loginUser);

// Home Route

router.get('/dashboard/api/myBlogs',authmiddleware,getBlogs);
router.get('/dashboard/myBlogs',authmiddleware,(req,res)=>{
    res.render('myBlogs');
})
router.post('/dashboard/addBlog',authmiddleware,addBlog);
router.get('/dashboard/addBlog',authmiddleware,(req,res)=>{
    res.render('addBlogs');
})
router.put('/dashboard/edit/:id',authmiddleware,updateBlog);
router.delete('/dashboard/delete/:id',authmiddleware,deleteBlog);
router.get('/logout',logOut);
router.get('/api/profile/:id',isAuthenticated,showAuthorProfile);
router.get('/profile/:id',isAuthenticated,(req,res)=>{
    res.render('author/profile');
})
module.exports = router;