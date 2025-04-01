const Job=require('../../models/jobModel').module

const getAllJobs=async(req,res)=>{
   
   try {
   //   //we are doing filtering also
   //   const query={
   //      $or:[
   //          {title:{$regex:keyword,$options:'i'}},
   //          {description:{$regex:keyword,$options:'i'}},
   //          {location:{$regex:keyword,$options:'i'}},
   //      ]
   //   }
    //  const jobs=await Job.find(query).populate('company')
    //another way to populate
    
    const jobs=await Job.find({}).populate({
        path:"company"
    }).sort({createdAt:-1})
     if(!jobs){
        throw new Error('jobs not found')
     }
     res.json({
        data:jobs,
        message:'jobs fetched successfully',
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

exports.module=getAllJobs