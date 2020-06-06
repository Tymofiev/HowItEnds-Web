const express = require('express')
const router = express.Router()

const Palette = require('../models/Palette')

router.get('/:id', (req, res) => {
  Palette.find({ user: req.params.id })
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

  newPalette
    .save()
    .then((palette) => {
      res.send(palette)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.put('/:id', (req, res) => {
  const { type, palette } = req.body

  Palette.findOneAndUpdate(
    { user: req.params.id },
    {
      type,
      palette,
      user: req.params.id,
    },
    { new: true },
  )
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err)
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
