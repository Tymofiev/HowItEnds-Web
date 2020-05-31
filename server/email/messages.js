const { CONFIRM, CONFIRMED, RESEND, COULD_NOT_FIND, ALREADY_CONFIRMED, FEEDBACK } = require('./statuses')

const messages = {
  [CONFIRM]: 'Email sent, please check your inbox to confirm',
  [CONFIRMED]: 'Your email is confirmed!',
  [RESEND]: 'Confirmation email resent, maybe check your spam?',
  [COULD_NOT_FIND]: 'Could not find you!',
  [ALREADY_CONFIRMED]: 'Your email was already confirmed',
  [FEEDBACK]: 'Email was sent. Thanks for your feedback!',
}

const getMessageByStatus = (status) => {
  return messages[status]
}

module.exports = {
  getMessageByStatus,
}
