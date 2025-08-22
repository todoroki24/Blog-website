const User = require('../models/user.model');
const express = require('express');
const {loginUser} = require('../controllers/user.controllers/login.user.constrollers');
const {registerUser} = require('../controllers/user.controllers/register.user.controllers')
const {isAuthenticated} = require('../middlewares/user.auth.middleware');
const {getInfo} = require('../controllers/user.controllers/dashboard.controllers')
const {getAllAuthors} = require('../controllers/user.controllers/getAuthors.controllers');
const {getAuthorsFollowedByUser} = require('../controllers/user.controllers/getAuthorsFollowedByUser.controllders');
const {followUnfollowAuthor} = require('../controllers/user.controllers/followUnfollowAuthor.controllers');
const router = express.Router();

router.get('/api/login',(req,res)=>{
   res.render('user/login');
})
router.post('/api/login',loginUser);

router.get('/api/register',(req,res)=>{
    res.render('user/register');
})

router.post('/api/register',registerUser);

router.get('/api/dashboard',isAuthenticated,getInfo);
router.get('/dashboard',isAuthenticated,(req,res)=>{
    res.render('user/dashboard') //dashboard page of user
})

router.get('/api/getAllAuthors',isAuthenticated,getAllAuthors);
router.get('/dashboard/getAllAuthors',isAuthenticated,(req,res)=>{
    res.render('user/seeAuthors');
})

router.get('/api/getAuthorsFollowedByUser',isAuthenticated,getAuthorsFollowedByUser); // /api/getAuthorsFollowedByUser
router.post('/api/followUnfollow',isAuthenticated,followUnfollowAuthor);
module.exports = router