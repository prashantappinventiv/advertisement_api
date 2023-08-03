import multer from 'multer'
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,`${process.cwd()}/src/upload`)
    },
    filename:function(req,file,cb){
        cb(null,`${file.filename}.png`);
    }

})

const upload=multer({storage})
export  {upload}
    