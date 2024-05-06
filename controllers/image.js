const multer = require(`multer`)
const path = require(`path`)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./image`) //foto disimpen kemana
    },

    filename: (req, file, cb) => {
        cb(null, `img-${Date.now()}${path.extname(file.originalname)}`) //name file
    }
})

const upload = multer({
    storage: storage, //storage nya dimana
    fileFilter: (req, file, cb) => {
        const acceptedType = [`image/jpg`, `image/jpeg`, `image/png`] //tipenya image yang di input
        if (!acceptedType.includes(file.mimetype)) { //ga sesuai tipe 
            cb(null, false) 
            return cb(`Invalid file type (${file.mimetype})`)

        }
        const fileSize = req.headers[`content-length`] //ukuran file
        const maxSize = (1 * 2048 * 2048) //max 2 mb
        if(fileSize > maxSize){ //klo file nya kebesaran
            cb(null, false) 
            return cb(`File size is too large`)
        }

        cb(null, true) 
    }
})
module.exports = upload
