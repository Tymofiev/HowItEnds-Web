const express = require('express')

const User = require('../models/User')
const { passport, isAuth } = require('../lib/auth')
const { userExists } = require('../lib/validations')
const { sendEmail } = require('../lib/email')
const { confirmation } = require('../email/templates')
const { getMessageByStatus } = require('../email/messages')
const { CONFIRM } = require('../email/statuses')

const ABSOLUTE_SESSION_LIFE = 24 * 60 * 60 * 1000 // Expires in 1 day
const router = express.Router()

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    new Promise((resolve, reject) => {
      if (err || !user) {
        return reject(err) //res.status(400).send({ err })
      }
      req.login(user, (err) => {
        if (err) {
          return reject(err) //res.status(400).send({ err })
        }

        if (req.body.remember) {
          req.session.cookie.originalMaxAge = ABSOLUTE_SESSION_LIFE
        } else {
          req.session.cookie.expires = false
        }

        return res.json({ user })
      })
    }).catch((err) => {
      console.log(err)
      res.send({ err })
    })
  })(req, res)
})

router.post('/register', (req, res) => {
  const { username, email, password } = req.body

  userExists(username, email)
    .then(() => {
      const newUser = new User({ username, email, password, active: false })

      newUser
        .save()
        .then((user) => {
          sendEmail(user.email, confirmation(user._id)).then((info) => {
            res.send({ user, emailStatus: getMessageByStatus(CONFIRM) })
          })
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => res.send({ err }))
})

router.post('/logout', isAuth, (req, res) => {
  try {
    req.logout()
    res.send('Success')
  } catch (e) {
    console.log(e)
  }
})

router.get('/logged_in', isAuth, (req, res) => {
  res.send({ isLoggedIn: true, data: req.user })
})

module.exports = router
