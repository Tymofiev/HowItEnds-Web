const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')

const User = require('../models/User')
const { passport, isAuth } = require('../lib/auth')
const { userExists } = require('../lib/validations')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './server/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, req.params.id + '_avatar_' + file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Unaccepted file type'), false)
  }
}
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter,
})

router.get('/', (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users)
    })
    .catch(() => {
      res.json([])
    })
})

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err || !user) {
      return res.status(400).send({ err })
    }
    //{ session: false },
    req.login(user, (err) => {
      if (err) {
        return res.status(400).send({ err })
      }

      const token = jwt.sign(user.toJSON(), 'secret')
      return res.json({ user, token })
    })
  })(req, res)
})

router.post('/register', (req, res) => {
  const { username, email, password } = req.body

  userExists(username, email)
    .then(() => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          const user = new User({ username, email, password: hash, active: false })

          user
            .save()
            .then((result) => res.send(result))
            .catch((err) => {
              console.log(err)
            })
        })
      })
    })
    .catch((err) => res.send({ err }))
})

router.put('/updateAvatar/:id', upload.single('avatar'), (req, res) => {
  console.log(req.file)
  User.findByIdAndUpdate(
    req.params.id,
    {
      avatar: req.file.path,
    },
    { new: true },
  )
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err)
    })
})

router.put('/updateEmail/:id', (req, res) => {
  const { email } = req.body

  User.findByIdAndUpdate(
    req.params.id,
    {
      email,
    },
    { new: true },
  )
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(err)
    })
})

router.put('/updatePssword/:id', (req, res) => {
  const { password } = req.body

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      User.findByIdAndUpdate(
        req.params.id,
        {
          password: hash,
        },
        { new: true },
      )
        .then((result) => res.send(result))
        .catch((err) => {
          console.log(err)
        })
    })
  })
})
//passport.authenticate('jwt', { session: false }),
router.get('/profile', isAuth, (req, res) => {
  res.send(req.user)
})

module.exports = router
