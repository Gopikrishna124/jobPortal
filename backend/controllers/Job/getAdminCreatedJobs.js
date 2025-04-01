const Job=require('../../models/jobModel').module

const getAdminCreatedJobs=async(req,res)=>{
    const adminId=req.id
   try {
    const adminJobs=await Job.find({createdBy:adminId}).populate({
      path:'company'
    }).sort({createdAt:-1})
    if(!adminJobs){
        throw new Error('admin jobs not found')
    }
     res.json({
        data:adminJobs,
        message:'Admin jobs fetched successfully',
        success:true,
        error:false

     })
   } catch (err) {
      res.json({
        message:err.message || err,
        success:false,
        error:true
      })
   }
}

exports.module=getAdminCreatedJobs