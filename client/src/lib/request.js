import axios from 'axios'
const config = require('../config.json')

const request = ({ url, method = 'get', data = {} }) => {
  const token = localStorage.getItem('token')
  let headers = {}
  if (token) {
    headers = { ...headers, Authorization: `Bearer ${token}` }
  }

  return axios({
    url: `${config.apiUrl}${url}`,
    method,
    data,
    headers,
  })
    .then(({ data }) => data)
    .catch((err) => {
      console.log(err)
      return Promise.reject(err)
    })
}

export default request
