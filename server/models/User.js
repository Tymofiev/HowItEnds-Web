const mongoose = require('mongoose')
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

module.exports = mongoose.model('User', UserSchema)
