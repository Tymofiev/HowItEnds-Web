import request from '../lib/request'

export const updateDownloadsCount = (date) => {
  return request({
    url: `/downloads`,
    method: 'put',
    data: {
      date,
    },
  })
}

export const getDownloads = () => {
  return request({
    url: `/downloads`,
    method: 'get',
  })
}
