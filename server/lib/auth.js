const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

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

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
}

const jwtStrategy = new JwtStrategy(opts, (jwt_payload, done) => {
  User.findOne({ email: jwt_payload.email }).then((user) => {
    return done(null, user)
  })
})

passport.use(localStrategy)
passport.use(jwtStrategy)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
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
