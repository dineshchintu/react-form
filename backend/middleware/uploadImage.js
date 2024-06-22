const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "./imgupload" )
    },

    filename: function(req, file, cb){
        const uniqueFileName = Date.now();
        return cb(null, `${uniqueFileName}_${file.originalname}`)
    }  
})

const upload = multer({ storage: storage });

module.exports = upload