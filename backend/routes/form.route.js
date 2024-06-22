const router = require("express").Router();
const multer = require("multer");
const { getFormDetail, postFormDetail } = require("../controllers/form.controller");

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

router.get('/:formId', getFormDetail);
// router.post("/upload", upload.single("uploadFile"), uploadFile)
router.post('/postform', upload.single("uploadFile"), postFormDetail);

module.exports = router;

