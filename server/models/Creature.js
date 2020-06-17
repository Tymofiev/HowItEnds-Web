const mongoose = require('mongoose')
const { Schema } = mongoose

const CreatureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    genotype: {
      type: Array,
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

module.exports = mongoose.model('Creature', CreatureSchema)
