const express=require('express')
const router=express.Router()


const isAuthenticated=require('../middlewares/isAuthenticated').module
const applyJobController=require('../controllers/application/ApplyJob').module
const getAlljobsController=require('../controllers/application/getAppliedJobs').module
const getNoOfUsersAppliedController=require("../controllers/application/getNoOfApplicants").module
const updateApplicationStatusController=require('../controllers/application/updateApplicationStatus').module


router.get('/applyJob/:id',isAuthenticated,applyJobController)
router.get('/allApplications',isAuthenticated,getAlljobsController)
router.get('/noOfUsersApplied/:id',isAuthenticated,getNoOfUsersAppliedController)
router.post('/updateStatus/:id',isAuthenticated,updateApplicationStatusController)

exports.module=router

