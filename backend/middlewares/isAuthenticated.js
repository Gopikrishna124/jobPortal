const jwt=require('jsonwebtoken')

const isAuthenticated=async(req,res,next)=>{
    try {
      const token=req.cookies?.portalToken
      if(!token){
         throw new Error('pls login')
      }
      const verifyToken=await jwt.verify(token,process.env.JWT_SECRET)
      if(!verifyToken){
        throw new Error('invalid token or token expired')
      }
      req.id=verifyToken.userId
      next()
    } catch (err) {
         res.json({
            message:err.message,
            success:false,
            error:true
         })
    }
}

exports.module=isAuthenticated