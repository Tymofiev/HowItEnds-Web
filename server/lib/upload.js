const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './server/uploads')
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.')
    cb(null, req.params.id + '.' + extension[1])
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Unaccepted file type'), false)
  }
}
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter,
})

module.exports = upload
