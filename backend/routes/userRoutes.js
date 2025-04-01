const express=require('express')
const router=express.Router()

const registerController=require('../controllers/user/registerUser').module
const loginController=require('../controllers/user/loginUser').module
const updateProfileController=require('../controllers/user/updateProfile').module
const logOutController=require('../controllers/user/logOutUser').module
const isAuthenticated=require('../middlewares/isAuthenticated').module
const upload=require('../middlewares/multer').module

const cpupload=upload.fields([{name:'file'},{name:'file2'}])

router.post('/register',cpupload,registerController)

router.post('/login',loginController)

router.post('/profile/update',isAuthenticated,cpupload,updateProfileController)
//frontend data is not coming in backend so we use multer


router.get('/logOut',isAuthenticated,logOutController)

exports.module=router

