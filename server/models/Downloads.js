const mongoose = require('mongoose')
const { Schema } = mongoose

const DownloadsSchema = new Schema({
  count: {
    type: Number,
    required: true,
    default: 1,
  },
  date: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Downloads', DownloadsSchema)
