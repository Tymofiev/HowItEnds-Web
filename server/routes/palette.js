const express = require('express')
const router = express.Router()

const Palette = require('../models/Palette')

router.get('/:id', (req, res) => {
  Palette.findOne({ user: req.params.id })
    .then((palette) => {
      res.send(palette)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/', (req, res) => {
  const { type, palette, user } = req.body
  const newPalette = new Palette({ type, palette, user })

  Palette.find({ user: req.params.id }).then((palette) => {
    console.log(palette)
    if (palette.length === 0) {
      newPalette
        .save()
        .then((palette) => {
          res.send(palette)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      Palette.findByIdAndUpdate(palette._id, { type, palette, user }, { new: true })
        .then((palette) => {
          res.send(palette)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
})

router.delete('/:id', (req, res) => {
  Palette.deleteOne({ user: req.params.id })
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
