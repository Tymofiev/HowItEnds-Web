const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const { upload, deleteOldImage } = require('../lib/upload')

router.get('/', async (req, res) => {
  const { page = 1, limit = 4 } = req.query

  try {
    const posts = await Post.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Post.countDocuments()

    res.send({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.send(post)
    })
    .catch((err) => console.log(err))
})

router.post('/', (req, res) => {
  const { title, snippet, body } = req.body
  const post = new Post({ title, snippet, body })

  post
    .save()
    .then((post) => {
      res.send(post)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

router.put('/setImage/:id', deleteOldImage, upload.single('image'), (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      image: req.file.path,
    },
    { new: true },
  )
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err)
    })
})

router.put('/:id', (req, res) => {
  const { title, snippet, body } = req.body

  Post.findByIdAndUpdate(
    req.params.id,
    {
      title,
      snippet,
      body,
    },
    { new: true },
  )
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err)
    })
})

router.delete('/:id', (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
