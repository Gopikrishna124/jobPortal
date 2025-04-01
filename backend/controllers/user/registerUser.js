const User=require('../../models/userModel').module
const bcrypt=require('bcrypt')
const getDataUri=require('../../utils/DataUri').module
const cloudinary=require('../../utils/Cloudinary').module

const registerUser=async(req,res)=>{
  const file=req.files?.file? (req.files.file):''
  console.log('register files',file)
  
   try {
      const {fullName,email,phoneNo,role,password}=req.body
      console.log('body',req.body)

      if(!fullName || !email || !phoneNo || !password || !role){
        throw new Error('all fields must be filled')
      }
      const existedEmail=await User.findOne({email})
      
      if(existedEmail){
        throw new Error('user already exists with this email')
      } 

       const hashedPassword=await bcrypt.hash(password,10)
    
      const payload={
        ...req.body,
        password:hashedPassword,
      }
      const user=new User(payload)

    
      if(file){
        
        const cloudinaryResponse=await cloudinary.uploader.upload(file[0]?.path)
        user.profile.profilePhoto=cloudinaryResponse.secure_url
      }

      const result=await user.save()



      res.json({
        data:result,
        success:true,
        error:false,
        message:'user registered successfully'
      })
   } catch (error) {
       res.json({
        message:error.message || error,
        success:false,
        error:true
       })
   }
}

exports.module=registerUser