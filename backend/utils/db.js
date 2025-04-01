const mongoose=require('mongoose')


const Connection=async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URL)
       console.log('mongodb connected successfully')
    } catch (error) {
        console.log(error)
    }
}

exports.module=Connection