const express = require('express')
const router = express.Router()

const { sendEmail } = require('../lib/email')
const { RESEND, FEEDBACK } = require('../email/statuses')
const { confirmation, contactForm, feedback } = require('../email/templates')
const { getMessageByStatus } = require('../email/messages')

router.post('/resendEmail', (req, res) => {
  const { to, userId } = req.body

  sendEmail(to, confirmation(userId))
    .then((info) => {
      res.send({ message: getMessageByStatus(RESEND) })
    })
    .catch((e) => console.log(e))
})

router.post('/feedback', (req, res) => {
  const { email, message } = req.body
  const MANAGER_EMAIL = process.env.EMAIL

  sendEmail(MANAGER_EMAIL, contactForm(message))
    .then(() => {
      sendEmail(email, feedback()).then((info) => {
        res.send({ success: true, message: getMessageByStatus(FEEDBACK) })
      })
    })
    .catch((e) => console.log(e))
})

module.exports = router
