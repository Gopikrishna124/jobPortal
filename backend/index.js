const express=require('express')
const cookieParser=require('cookie-parser')
const app=express()
const cors=require('cors')
const env=require('dotenv').config()
const connection=require('./utils/db').module
const userRouter=require('../backend/routes/userRoutes').module
const companyRouter=require('../backend/routes/comapanyRoutes').module
const jobRouter=require('../backend/routes/jobRoutes').module
const applicationRouter=require('../backend/routes/ApplicationRoutes').module


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOptions={
    origin:'http://localhost:5173',
     credentials:true,
     
}
app.use(cors(corsOptions))
// jWWGRwJJIUGrsjCt

const PORT=process.env.PORT || 5001;


//apis //

app.use('/api/v1/user',userRouter)

app.use('/api/v1/company',companyRouter)

app.use('/api/v1/job',jobRouter)

app.use('/api/v1/application',applicationRouter)


 app.listen(PORT,()=>{
    connection()
    console.log(`app listening on  port ${PORT}`)
 })