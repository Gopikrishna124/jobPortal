const Application=require('../../models/applicationModel').module
const Job=require('../../models/jobModel').module

//admin sees no of users applied for his posted job

const NoOfUsersApplied=async(req,res)=>{
     const jobId=req.params.id
   try {
    //  const Applicants=await Application.find({job:jobId})

    const job=await Job.findById(jobId).populate({
        path:"applications",
        options:{sort:{createdAt:-1}},
        populate:{
            path:'applicant'
        }
    })
    if(!job){
        throw new Error('no job found')
    }
    res.json({
        data:job,
        message:'fetched no of usersapplied for job',
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

exports.module=NoOfUsersApplied
