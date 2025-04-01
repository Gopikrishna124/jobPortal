const mongoose=require('mongoose')

const {Schema}=mongoose

const userSchema=new Schema({
     fullName:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     phoneNo:{
        type:Number,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     role:{
        type:String,
        enum:['student','recruiter'],
        required:true
     },
     profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, //url to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePhoto:{type:String,default:''}
     }
},{timestamps:true})

const User=mongoose.model("User",userSchema)
exports.module=User