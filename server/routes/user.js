const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/User')
const { upload, deleteCurrentFile } = require('../lib/upload')
const { sendEmail } = require('../lib/email')
const { confirmation } = require('../email/templates')
const { CONFIRM } = require('../email/statuses')
const { getMessageByStatus } = require('../email/messages')

router.get('/', (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users)
    })
    .catch(() => {
      res.json([])
    })
})

router.get('/:id', (req, res) => {
  User.find({ _id: req.params.id })
    .then((user) => {
      res.send(user)
    })
    .catch(() => {
      res.json([])
    })
})

router.put('/updateAvatar/:id', upload.single('file'), deleteCurrentFile, (req, res) => {
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
  const { id } = req.params

  User.findByIdAndUpdate(
    id,
    {
      email,
      active: false,
    },
    { new: true },
  )
    .then((result) => {
      sendEmail(email, confirmation(id)).then(() => {
        res.send({ user: result, emailStatus: getMessageByStatus(CONFIRM) })
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.put('/updatePassword/:id', (req, res) => {
  const { oldPassword, password } = req.body
  new Promise((resolve, reject) => {
    bcrypt.compare(password, req.user.password, (err, isMatch) => {
      if (isMatch) {
        reject({ code: 400, message: 'New password should not match the old one' })
      }

      bcrypt.compare(oldPassword, req.user.password, (err, isMatch) => {
        if (err) {
          console.log(err)
        }

        if (isMatch) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                console.log(err)
              }

              User.findByIdAndUpdate(
                req.params.id,
                {
                  password: hash,
                },
                { new: true },
              )
                .then((result) => res.send({ user: result }))
                .catch((err) => {
                  console.log(err)
                })
            })
          })
        } else {
          reject({ code: 422, message: 'Old password is incorrect' })
        }
      })
    })
  }).catch((err) => {
    res.status(err.code).send({ message: err.message })
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
    .then((result) => {
      res.send({ success: true })
    })
    .catch((err) => {
      res.status(400).send({ err })
    })
})

module.exports = router
