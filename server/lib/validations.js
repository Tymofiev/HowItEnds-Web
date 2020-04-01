const User = require('../models/User')

const userExists = (username, email) => {
  return User.findOne({ username }).then((result) => {
    if (result) {
      return Promise.reject('Username is busy')
    }

    return User.findOne({ email }).then((result) => {
      console.log(result)
      if (result) {
        return Promise.reject('Email is busy')
      }

      return Promise.resolve()
    })
  })
}

module.exports = {
  userExists,
}
