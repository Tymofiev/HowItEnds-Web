const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/User')
const upload = require('../lib/upload')

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

router.put('/updatePassword/:id', (req, res) => {
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

router.post('/emailConfirm/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      active: true,
    },
    { new: true },
  )
    .then((result) => res.send({ success: true }))
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
