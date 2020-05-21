const express = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { passport, isAuth } = require('../lib/auth')
const { userExists } = require('../lib/validations')

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

        const token = jwt.sign(user.toJSON(), 'secret')
        return res.json({ user, token })
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
      const user = new User({ username, email, password, active: false })

      user
        .save()
        .then((result) => res.send(result))
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

//passport.authenticate('jwt', { session: false }),
router.get('/logged_in', isAuth, (req, res) => {
  res.send({ isLoggedIn: true, data: req.user })
})

module.exports = router
