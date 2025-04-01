const Company=require('../../models/companyModel').module

const getAllCompanies=async(req,res)=>{
   try {
     const userId=req.id
     const companies=await Company.find({userId})
     if(!companies){
        throw new Error('companies not found')
     }
     res.json({
      data:companies,
      success:true,
      error:false,
      message:'companies fetched successfully'
   })
   } catch (err) {
     res.json({
       message:err.message || err,
       success:false,
       error:true
     })
   }
}

exports.module=getAllCompanies