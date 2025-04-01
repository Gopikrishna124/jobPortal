const DataParser=require('datauri/parser.js')
const path=require('path')

const getDataUri=(file)=>{
    if(file){
    const parser= new DataParser();
    const extName=path.extname(file?.originalname).toString();
    const final= parser.format(extName,file.buffer)
    // console.log('uri',final)
    return final
    }
}

exports.module=getDataUri