const express = require('express')
const router = express.Router()

const { sendEmail } = require('../lib/email')
const { RESEND } = require('../email/statuses')
const { confirmation } = require('../email/templates')
const { getMessageByStatus } = require('../email/messages')

router.post('/resendEmail', (req, res) => {
  const { to, userId } = req.body

  sendEmail(to, confirmation(userId))
    .then((info) => {
      res.send({ message: getMessageByStatus(RESEND) })
    })
    .catch((e) => console.log(e))
})

module.exports = router
