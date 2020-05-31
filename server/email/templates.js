const config = require('config')
const CLIENT_ORIGIN = config.get('CLIENT_ORIGIN')

const confirmation = (id) => ({
  subject: 'HowItEnds Confirm Email',
  text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`,
  html: `
      <a href='${CLIENT_ORIGIN}/confirm/${id}'>
        Click to confirm email
      </a>
    `,
})

const feedback = () => ({
  subject: 'HowItEnds Support',
  text: `Thanks for your feedback!`,
  html: `
      <h1>
        Thanks for your feedback!
      </h1>
    `,
})

const contactForm = (message) => ({
  subject: 'New Message from Contact Form',
  text: `New feedback message`,
  html: `
      <p>
        ${message}
      </>
    `,
})

module.exports = {
  confirmation,
  feedback,
  contactForm,
}
