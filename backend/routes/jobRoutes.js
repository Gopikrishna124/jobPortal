const express=require('express')
const router=express.Router()

const isAuthenticated=require('../middlewares/isAuthenticated').module
const createJobController=require('../controllers/Job/createJob').module
const getAllJobsController=require('../controllers/Job/getAllJobs').module
const getAdminCreatedJobsController=require('../controllers/Job/getAdminCreatedJobs').module
const getJobByIdController=require('../controllers/Job/getJobById').module
const filterSearch=require('../controllers/Job/FilterJob').module



router.post('/createJob',isAuthenticated,createJobController)
router.get('/alljobs',isAuthenticated,getAllJobsController)
router.get('/singleJob/:id',isAuthenticated,getJobByIdController)
router.get('/allAdminJobs',isAuthenticated,getAdminCreatedJobsController)
router.get('/filterJobs',isAuthenticated,filterSearch)



exports.module=router