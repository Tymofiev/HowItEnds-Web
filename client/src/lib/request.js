import axios from 'axios'

const request = ({ url, method = 'get', data = {} }) => {
  // const apiUrl = `http://localhost:5000${url}`

  return axios({
    // url: apiUrl,
    url,
    method,
    data,
  })
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err)
    })
}

export default request
