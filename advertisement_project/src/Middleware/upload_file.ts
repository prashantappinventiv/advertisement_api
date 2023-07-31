import multer from 'multer'
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,`${process.cwd()}/src/uploads`)
    },
    filename:function(req,file,cb){
        cb(null,`$(file,fieldname).png`)
    }

})

const upload=multer({storage})
export default upload
    