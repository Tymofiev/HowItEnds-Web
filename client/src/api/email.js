import request from '../lib/request'

export const sendFeedbackEmail = (email, message) => {
  return request({
    url: `/email/feedback`,
    method: 'post',
    data: {
      email,
      message,
    },
  })
}
