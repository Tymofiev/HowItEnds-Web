const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const Post = require('../models/Post')
const { upload, deleteCurrentFile } = require('../lib/upload')

router.get('/', (req, res) => {
  Post.find({})
    .then((posts) => {
      res.json(posts)
    })
    .catch(() => {
      res.json([])
    })
})

router.post('/', upload.array('files', 3), (req, res) => {
  const { title, body } = req.body
  //   const files = req.files
  //   console.log(files)
  //   const post = new Post({ title, body, image: files[0] })

  //   post
  //     .save()
  //     .then((post) => {
  //       console.log(post)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
})
module.exports = router
