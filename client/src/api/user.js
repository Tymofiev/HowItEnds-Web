import request from '../lib/request'

export const editAvatar = ({ file, id }) => {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: `/user/updateAvatar/${id}`,
    method: 'put',
    data: formData,
  })
}
