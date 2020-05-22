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

module.exports = {
  confirmation,
}
