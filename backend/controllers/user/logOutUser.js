const User=require('../../models/userModel').module

const logOutController=async(req,res)=>{
  
    try {
        
         res.clearCookie('portalToken')
         res.json({
            message:'logOut successfull',
            success:true,
            error:false,
            
        })
    } catch (err) {
        res.json({
            message:err.message || err,
            success:false,
            error:true
        })
    }
}

exports.module=logOutController