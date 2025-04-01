const Application=require('../../models/applicationModel').module

const getAllAppliedJobs=async(req,res)=>{
      const userId=req.id
  try {

    //checking applied jobs  by userId only those  you have applied 
    const AppliedJobs=await Application.find({applicant:userId}).sort({createdAt:-1})
    .populate({
        path:'job',
        options:{sort:{createdAt:-1}},
        populate:{
          path:'company'
        }
    })
    if(!AppliedJobs){
        throw new Error('No applications')
    }
    res.json({
        data:AppliedJobs,
        message:'All Applications fetched successfully',
        success:true,
        error:false
    })

  } catch(err) {
     res.json({
        message:err.message || err,
        success:false,
        error:true
     })
  }
}

exports.module=getAllAppliedJobs