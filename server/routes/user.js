const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const multer = require('multer')

const User = require('../models/User')

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

router.get('/', (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users)
    })
    .catch(() => {
      res.json([])
    })
})

router.put('/updateAvatar/:id', upload.single('file'), (req, res) => {
  console.log(req.file)

  User.findByIdAndUpdate(
    req.params.id,
    {
      avatar: req.file.path,
    },
    { new: true },
  )
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err)
    })
})

router.put('/updateEmail/:id', (req, res) => {
  const { email } = req.body

  User.findByIdAndUpdate(
    req.params.id,
    {
      email,
    },
    { new: true },
  )
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err)
    })
})

router.put('/updatePssword/:id', (req, res) => {
  const { password } = req.body

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      User.findByIdAndUpdate(
        req.params.id,
        {
          password: hash,
        },
        { new: true },
      )
        .then((result) => res.send(result))
        .catch((err) => {
          console.log(err)
        })
    })
  })
})

module.exports = router
