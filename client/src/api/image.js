import request from '../lib/request'

export const createImage = (category, title) => {
  return request({
    url: `/images`,
    method: 'post',
    data: {
      category,
      title,
    },
  })
}

export const setImage = ({ file, id }) => {
  const formData = new FormData()
  formData.append('path', file)
  return request({
    url: `/images/setImage/${id}`,
    method: 'put',
    data: formData,
  })
}

export const getAllImages = () => {
  return request({
    url: `/images`,
    method: 'get',
  })
}

export const deleteImage = (id) => {
  return request({
    url: `/images/${id}`,
    method: 'delete',
  })
}
