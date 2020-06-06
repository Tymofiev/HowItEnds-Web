import request from '../lib/request'

export const createPost = ({ title, snippet, body }) => {
  return request({
    url: `/posts`,
    method: 'post',
    data: {
      title,
      snippet,
      body,
    },
  })
}

export const setImage = ({ file, id }) => {
  const formData = new FormData()
  formData.append('image', file)
  return request({
    url: `/posts/setImage/${id}`,
    method: 'put',
    data: formData,
  })
}

export const getAllPosts = (page, limit) => {
  return request({
    url: `/posts?page=${page}&limit=${limit}`,
    method: 'get',
  })
}

export const getPost = (id) => {
  return request({
    url: `/posts/${id}`,
    method: 'get',
  })
}

export const updateData = (id, title, snippet, body) => {
  return request({
    url: `/posts/${id}`,
    method: 'put',
    data: {
      title,
      snippet,
      body,
    },
  })
}

export const deletePost = (id) => {
  return request({
    url: `/posts/${id}`,
    method: 'delete',
  })
}
