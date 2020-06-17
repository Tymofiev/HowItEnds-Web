const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './server/uploads')
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.')
    cb(null, req.params.id + extension[0] + '.' + extension[1])
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

const deleteCurrentFile = (req, res, next) => {
  const { destination, filename } = req.file
  const { _id } = req.user
  console.log(destination)
  fs.readdir(destination, (err, files) => {
    const currentUserAvatars = files.filter((file) => file.includes(_id))
    const oldFile = currentUserAvatars.filter((file) => file !== filename)[0]

    if (oldFile) {
      fs.unlink(path.join(destination, oldFile), (err) => {
        if (err) {
          throw err
        }
        next()
      })
    } else {
      next()
    }
  })
}

const deleteOldImage = (req, res, next) => {
  const destination = './server/uploads'
  const { id } = req.params

  fs.readdir(destination, (err, files) => {
    const currentImage = files.filter((file) => file.includes(id))[0]
    console.log(currentImage)
    if (currentImage) {
      fs.unlink(path.join(destination, currentImage), (err) => {
        if (err) {
          throw err
        }
        next()
      })
    } else {
      next()
    }
  })
}

const FIRST_CREATURE = 0
const SECOND_CREATURE = 1

const CREATURE_IMAGES = {
  [FIRST_CREATURE]: 'server/uploads/firstcreature.jpg',
  [SECOND_CREATURE]: 'server/uploads/secondcreature.jpg',
}

module.exports = {
  upload,
  deleteCurrentFile,
  deleteOldImage,
  CREATURE_IMAGES,
}
