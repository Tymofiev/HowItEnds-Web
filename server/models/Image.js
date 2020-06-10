const mongoose = require('mongoose')
const { Schema } = mongoose

const ImageSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
})

module.exports = mongoose.model('Image', ImageSchema)
