import request from '../lib/request'

export const getAllUsers = (page, limit) => {
  return request({
    url: `/users?page=${page}&limit=${limit}`,
    method: 'get',
  })
}

export const getUser = (id) => {
  return request({
    url: `/users/${id}`,
    method: 'get',
  })
}

export const updateAvatar = ({ file, id }) => {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: `/users/updateAvatar/${id}`,
    method: 'put',
    data: formData,
  })
}

export const updateEmail = (email, id) => {
  return request({
    url: `/users/updateEmail/${id}`,
    method: 'put',
    data: {
      email,
    },
  })
}

export const updatePassword = (oldPassword, password, id) => {
  return request({
    url: `/users/updatePassword/${id}`,
    method: 'put',
    data: {
      oldPassword,
      password,
    },
  })
}

export const confirmEmail = (id) => {
  return request({
    url: `/users/emailConfirm/${id}`,
    method: 'post',
  })
}
