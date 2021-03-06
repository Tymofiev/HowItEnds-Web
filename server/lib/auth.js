const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

const localStrategy = new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return done('Incorrect email.', false, { message: 'Incorrect email.' })
      }

      user
        .login(password)
        .then((isMatch) => {
          if (isMatch) {
            return done(null, user)
          } else {
            return done('Incorrect password.', false, { message: 'Incorrect password.' })
          }
        })
        .catch((err) => {
          throw err
        })
    })
    .catch((e) => {
      return done(e)
    })
})

passport.use(localStrategy)

passport.serializeUser((user, done) => {
  console.log('lol')
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.send({ isLoggedIn: false, data: {} })
}

module.exports = {
  passport,
  isAuth,
}
