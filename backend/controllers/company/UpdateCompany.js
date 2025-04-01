
const Company=require('../../models/companyModel').module
const cloudinary=require('../../utils/Cloudinary').module

const updateCompany=async(req,res)=>{
    const {name,description,location,website}=req.body
    const id=req.params.id
    console.log('id',id)
   try {
      const files=req.files?.file
       

      const company=await Company.findById(req.params.id)
      company.name=name
      company.description=description
      company.website=website
      company.location=location

      if(files){
         const cloudinaryResponse=await cloudinary.uploader.upload(files[0]?.path)
         console.log('cloudinaryResponse',cloudinaryResponse)
         if(cloudinaryResponse){
          company.logo=cloudinaryResponse.secure_url
         }
      }

      await company.save()
      const result=await Company.findByIdAndUpdate(req.params.id,company,{new:true})
      console.log('result',result)


      if(!result){
        throw new Error('company not found')
     }
     res.json({
        data:result,
        success:true,
        error:false,
        message:'company updated successfully'
     })
   } catch (err) {
     res.json({
       message:err.message || err,
       success:false,
       error:true
     })
   }
}

exports.module=updateCompany