import request from '../lib/request'

export const login = ({ email, password }) => {
  return request({
    url: '/user/login',
    method: 'post',
    data: { email, password },
  })
}

export const register = ({ email, password }) => {
  return request({
    url: '/user/register',
    method: 'post',
    data: { email, password },
  })
}

export const getProtected = () => {
  return request({ url: '/user/profile', method: 'get' })
}
