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

  Palette.findOne({ user }).then((result) => {
    if (!result) {
      newPalette
        .save()
        .then((palette) => {
          res.send(palette)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      Palette.findByIdAndUpdate(result._id, {
        type,
        palette,
        user,
      })
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
