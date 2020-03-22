const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { passport } = require('../lib/auth')

const User = require('../models/User')

router.get('/', function(req, res) {
  User.find({})
    .then((users) => {
      res.json(users)
    })
    .catch(() => {
      res.json([])
    })
})

router.post('/login', function(req, res) {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: err,
        user: user,
      })
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err)
      }

      const token = jwt.sign(user.toJSON(), 'secret')
      return res.json({ user, token })
    })
  })(req, res)
})

router.post('/register', function(req, res) {
  const { email, password } = req.body

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      const user = new User({ email, password: hash })

      user
        .save()
        .then((result) => res.send(result))
        .catch((err) => {
          console.log(err)
        })
    })
  })
})

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user)
})

module.exports = router
