import request from '../lib/request'
import axios from 'axios'

export const login = ({ email, password }) => {
  return request({
    url: '/user/login',
    method: 'post',
    data: { email, password },
  })
}

export const register = ({ username, email, password }) => {
  return request({
    url: '/user/register',
    method: 'post',
    data: { username, email, password },
  })
}

export const logout = () => {
  return request({
    url: '/user/logout',
    method: 'post',
  })
}

export const editAvatar = ({ file, id }) => {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: `/user/updateAvatar/${id}`,
    method: 'put',
    data: formData,
  })
}

export const getProtected = () => {
  return request({
    url: '/user/profile',
    method: 'get',
  })
}
