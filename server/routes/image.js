const express = require('express')
const router = express.Router()

const Image = require('../models/Image')
const { upload } = require('../lib/upload')

router.get('/', async (req, res) => {
  Image.find({})
    .then((images) => {
      res.send(images)
    })
    .catch((err) => console.log(err))
})

router.post('/', (req, res) => {
  const { category, title } = req.body
  const image = new Image({ category, title })

  image
    .save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

router.put('/setImage/:id', upload.single('path'), (req, res) => {
  Image.findByIdAndUpdate(
    req.params.id,
    {
      path: req.file.path,
    },
    { new: true },
  )
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err)
    })
})

router.delete('/:id', (req, res) => {
  Image.deleteOne({ _id: req.params.id })
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
