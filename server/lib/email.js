const nodemailer = require('nodemailer')
require('dotenv').config()

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
})

const sendEmail = (to, content) => {
  const email = {
    from: `"HowItEnds 👻" <${process.env.EMAIL}>`,
    to,
    ...content,
  }

  return transporter.sendMail(email)
}

module.exports = {
  sendEmail,
}
