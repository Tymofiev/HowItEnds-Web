import request from '../lib/request'

export const updateAvatar = ({ file, id }) => {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: `/user/updateAvatar/${id}`,
    method: 'put',
    data: formData,
  })
}

export const updateEmail = (email, id) => {
  return request({
    url: `/user/updateEmail/${id}`,
    method: 'put',
    data: {
      email,
    },
  })
}

export const updatePassword = (oldPassword, password, id) => {
  return request({
    url: `/user/updatePassword/${id}`,
    method: 'put',
    data: {
      oldPassword,
      password,
    },
  })
}

export const confirmEmail = (id) => {
  return request({
    url: `/user/emailConfirm/${id}`,
    method: 'post',
  })
}
