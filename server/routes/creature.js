const express = require('express')
const router = express.Router()

const Creature = require('../models/Creature')
const { CREATURE_IMAGES } = require('../lib/upload')

router.get('/:id', (req, res) => {
  Creature.find({ user: req.params.id })
    .then((creatures) => {
      res.send(creatures)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/', (req, res) => {
  const { name, type, genotype, user } = req.body
  const image = CREATURE_IMAGES[type]
  const newCreature = new Creature({ name, type, image, genotype, user })

  Creature.findOne({ user }).then((result) => {
    if (!result) {
      newCreature
        .save()
        .then((creature) => {
          res.send(creature)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      Creature.findByIdAndUpdate(result._id, {
        name,
        type,
        genotype,
        user,
      })
        .then((creature) => {
          res.send(creature)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
})

router.delete('/:id', (req, res) => {
  Creature.deleteOne({ user: req.params.id })
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
