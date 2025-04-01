const cloudinary=require('cloudinary').v2
const env=require('dotenv').config()

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

console.log('cloudinary_name',process.env.CLOUD_NAME)
exports.module=cloudinary