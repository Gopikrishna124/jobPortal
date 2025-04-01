const Application=require('../../models/applicationModel').module

const updateStatus=async(req,res)=>{
    try {
        const userId=req.id
        const ApplicationId=req.params.id
        const status=req.body.status
       if(!status){
        throw new Error('status is required')
       }
        const requiredApplication=await Application.findOne({_id:ApplicationId})
        if(!requiredApplication){
            throw new Error('no Application found')
        }
        requiredApplication.status=status.toLowerCase()
        await requiredApplication.save()
        
        res.json({
             data:requiredApplication,
             message:'status updated sucessfully',
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

exports.module=updateStatus