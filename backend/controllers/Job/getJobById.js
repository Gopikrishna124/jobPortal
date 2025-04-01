const Job=require('../../models/jobModel').module

const getSingleJob=async(req,res)=>{
   
   try {
      
    const job=await Job.findById({_id:req.params.id}).populate({
      path:'applications'
    })
    if(!job){
        throw new Error('no job found')
    }
     res.json({
        data:job,
        message:'job fetched successfully',
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

exports.module=getSingleJob