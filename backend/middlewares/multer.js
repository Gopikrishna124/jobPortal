const multer=require('multer')
const path=require('path')

// const storage=multer.memoryStorage()

//  const singleUpload=multer({storage}).single('file') 
//  //file is input type=file in frontend

//  exports.module=singleUpload


// Set up multer storage (you can specify destination and file naming convention)
console.log('path',__dirname)

const storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
        const fileType=file.fieldname==='file'?'resumes' :'uplaoded'
        cb(null, `./${fileType}`); // Specify the folder to save the files
    },
    
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the filename
    }
});


const upload=multer({storage:storage})
exports.module=upload
