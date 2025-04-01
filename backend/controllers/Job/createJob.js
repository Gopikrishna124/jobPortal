const Job=require('../../models/jobModel').module

const createJob=async(req,res)=>{
    const {title,description,requirements,salary,location,jobType,experienceLevel
        ,positions,company}=req.body

    const userId=req.id
   try {
      if(!title || !description || !requirements || !salary || !location || !jobType  || !experienceLevel
        || !positions || !company){
            throw new Error('something is missing')
        }

        const payload={
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel,
            company:company,
            positions,
            createdBy:userId
        }
       const job= new Job(payload)
       const result=await job.save()
       res.json({
        data:result,
        success:true,
        error:false,
        message:'New job created successfully'
       })
   } catch (err) {
      res.json({
        message:err.message || err,
        success:false,
        error:true
      })
   }
}

exports.module=createJob