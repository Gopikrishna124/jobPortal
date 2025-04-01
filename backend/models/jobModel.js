 const mongoose=require('mongoose')

 const {Schema}=mongoose

 const jobSchema=new Schema({
       title:{
        type:String,
        required:true
       },
       description:{
        type:String,
        required:true
       },
       requirements:[{
         type:String
       }],
       salary:{
        type:Number,
        required:true
       },
       experienceLevel:{
         type:Number,
         required:true
       },
       location:{
        type:String,
        required:true
       },
       jobType:{
         type:String,
         required:true
       },
       positions:{
        type:Number,
        required:true
       },
       company:{
        type:mongoose.Schema.Types.ObjectId,ref:'Company'
       },
       createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
       },
       applications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Application'
        }
       ],
       saved:{type:Boolean,default:false}
 },{timestamps:true})

 const Job=mongoose.model('Job',jobSchema)
 exports.module=Job