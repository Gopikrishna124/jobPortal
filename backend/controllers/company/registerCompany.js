const Company=require('../../models/companyModel').module


const registerCompany=async(req,res)=>{
    const {name}=req.body
      try {
         
        if(!name){
            throw new Error('Company Name is required')
        }
        const company=await Company.findOne({name})
        if(company){
         throw new Error('you cant register same company again')
        }
        const payload={
          ...req.body,
          userId:req.id
        }
        const companyresult=new Company(payload)
        const Finalresult=await companyresult.save() 
        res.json({
         data:Finalresult,
         message:"company registered successfully",
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

exports.module=registerCompany