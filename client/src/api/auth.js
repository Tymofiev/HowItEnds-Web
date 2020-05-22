import request from '../lib/request'

export const login = ({ email, password, remember }) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data: { email, password, remember },
  })
}

export const register = ({ username, email, password }) => {
  return request({
    url: '/auth/register',
    method: 'post',
    data: { username, email, password },
  })
}

export const logout = () => {
  return request({
    url: '/auth/logout',
    method: 'post',
  })
}

export const checkIfLoggedIn = () => {
  return request({
    url: '/auth/logged_in',
    method: 'get',
  })
}

export const sendConfirmationEmail = (to, userId) => {
  return request({
    url: '/auth/sendEmail',
    method: 'post',
    data: {
      to,
      userId,
    },
  })
}
