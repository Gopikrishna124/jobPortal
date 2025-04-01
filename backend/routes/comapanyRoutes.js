const express=require('express')
const router=express.Router()
const isAuthenticated=require('../middlewares/isAuthenticated').module
const upload=require('../middlewares/multer').module

const registerCompanyController=require('../controllers/company/registerCompany').module
const getAllCompaniesController=require('../controllers/company/getAllCompanies').module
const getCompanyByIdController=require('../controllers/company/getCompanyById').module
const updateCompanyController=require('../controllers/company/UpdateCompany').module

const ccupload=upload.fields([{name:'file'}])

router.post('/registerCompany',isAuthenticated,registerCompanyController)
router.get('/allCompanies',isAuthenticated,getAllCompaniesController)
router.get('/SingleCompany/:id',isAuthenticated,getCompanyByIdController)
router.put('/update/:id',isAuthenticated,ccupload,updateCompanyController)

exports.module=router