const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
require('dotenv').config()

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
})

router.post('/send', (req, res) => {
  const { email, subject, msg } = req.body

  let options = {
    from: `"HowItEnds 👻" <${process.env.EMAIL}>`,
    to: 'ilia.tumofiev@gmail.com',
    subject: subject,
    text: msg,
    html: `    
    <h2>Question</h2>
    <p>${msg}</p>
    <b>Email to respond: ${email}</b>
    `,
  }

  transporter.sendMail(options).then((info) => {
    res.status(200).send('Email successfuly sent!')
    console.log('Email sent: ' + info.response)
  })
})

module.exports = router
