const mongoose = require('mongoose')
const { Schema } = mongoose

const PalleteSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    palette: {
      type: Object,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Palette', PalleteSchema)
