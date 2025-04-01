const Application=require('../../models/applicationModel').module
const Job=require('../../models/jobModel').module


const applyJob=async(req,res)=>{
   try {
      const userId=req.id
      console.log('userId',userId)
      const jobId=req.params.id
      if(!jobId){
        throw new Error('jobId is required')
      }
      //check if job is already applied

      const alreadyAppliedJob=await Application.findOne({job:jobId,applicant:userId})
      if(alreadyAppliedJob){
        throw new Error('you already Applied to job')
      }

      //check if job is  existing in database
  
      const job=await Job.findById(jobId)
      if(!job){
        throw new Error('no such job exists')
      }


      ///////////////////////////////////////
      const payload={
         job:jobId,
         applicant:userId
      }
      const apply=new Application(payload)
      const newApplication=await apply.save()
      
      // we are pushing this created application Id to job model in which we have application column
        
      job.applications.push(newApplication._id)
      await job.save()
       
      res.json({
        data:newApplication,
        message:'job Applied successfully',
        success:true,
        error:false
    })
   } catch (err) {
    res.json({
        message:err.message,
        success:false,
        error:true
    })
   }
}

exports.module=applyJob