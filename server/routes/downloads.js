const express = require('express')
const router = express.Router()

const Downloads = require('../models/Downloads')

router.get('/', (req, res) => {
  Downloads.find()
    .then((downloads) => {
      res.send(downloads)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.put('/', (req, res) => {
  const { date } = req.body
  const newDownload = new Downloads({ date })

  Downloads.findOne({ date }).then((result) => {
    if (!result) {
      newDownload.save().catch((err) => {
        console.log(err)
      })
    } else {
      Downloads.findOneAndUpdate({ date }, { $inc: { count: 1 } }).catch((err) => {
        console.log(err)
      })
    }
  })
})

module.exports = router
