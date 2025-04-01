
const Company=require('../../models/companyModel').module

const getSingleCompany=async(req,res)=>{
   try {
     const companyId=req.params.id
     const result=await Company.findOne({_id:companyId})
     if(!result){
        throw new Error('company not found')
     }
     res.json({
        data:result,
        success:true,
        error:false,
        message:'company fetched successfully'
     })
   } catch (err) {
     res.json({
       message:err.message || err,
       success:false,
       error:true
     })
   }
}

exports.module=getSingleCompany