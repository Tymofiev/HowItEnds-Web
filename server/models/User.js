const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

UserSchema.pre('save', function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.login = function (password) {
  const user = this
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        reject(err)
      }
      resolve(isMatch)
    })
  })
}

module.exports = mongoose.model('User', UserSchema)
