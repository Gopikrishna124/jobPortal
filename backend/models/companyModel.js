const mongoose=require('mongoose')

const {Schema}=mongoose

const companySchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    logo:{ 
        type:String  //url to company logo
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

const Company=mongoose.model('Company',companySchema)
exports.module=Company