const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Post', PostSchema)
