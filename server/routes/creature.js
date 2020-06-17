const express = require('express')
const router = express.Router()

const Creature = require('../models/Creature')
const { CREATURE_IMAGES } = require('../lib/upload')

router.get('/:id', (req, res) => {
  console.log(req.params.id)
  Creature.find({ user: req.params.id })
    .then((creatures) => {
      console.log(creatures)
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

router.put('/:id', (req, res) => {
  const { name, genotype } = req.body

  Creature.findByIdAndUpdate(req.params.id, {
    name,
    genotype,
  })
    .then((creature) => {
      res.send(creature)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.delete('/:id', (req, res) => {
  Creature.deleteOne({ _id: req.params.id })
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
