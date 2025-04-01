const  jwt = require('jsonwebtoken')
const bcrypt=require('bcrypt')

const User=require('../../models/userModel').module

const loginUser=async(req,res)=>{
    const{email,password,role}=req.body
    try {
         const existingEmail=await User.findOne({email})
         if(!existingEmail){
            throw new Error('no such emaail exists')
         }
         const matchingPassword=await bcrypt.compare(password,existingEmail.password)
         if(!matchingPassword){
             throw new Error('invalid credentials')
         }
         if(role!==existingEmail.role){
            throw new Error('account doesnot exists with current role')
         }

         const tokenData={
            userId:existingEmail._id
         }
         const payload={
           _id:existingEmail._id,
           fullName:existingEmail.fullName,
           email:existingEmail.email,
           phoneNumber:existingEmail.phoneNo,
           role:existingEmail.role,
           profile:existingEmail.profile

         }
         const token=await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'1d'})
         res.cookie('portalToken',token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'})
         .json({
            data:payload,
            message:`welcome back ${existingEmail.fullName}`,
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

exports.module=loginUser