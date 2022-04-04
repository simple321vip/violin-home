import axios from 'axios'

const service = axios.create(
  {
    baseURL: 'http://localhost:8081',
    timeout: 5000
  }
)




// service.interceptors.request.use(
//   config => {
//     if (true) {
//       config.headers['Authorization'] = 'Bearer' + getToken('user-token')
//     }
//     return config
//   },
//   error => {
//     console.log(error)
//     return Promise.reject(error)
//   }
// )

// service.interceptors.response.use(
//   response => {
//     if (response.headers['content-dispostion']
//       && response.headers['content-dispostion'].split(';')[0] === 'attachment') {
//       return response
//     } else {
//       return response.data
//     }
//   },
//   async error => {
//     if (error.code === 'ECONNABORTED') {
//       const error = {
//         message: '通信タイムアウト'
//       }
//       return Promise.reject(error)
//     } else if (!error.response) {
//       const error = {
//         message: 'サーバーエラー'
//       }
//       return Promise.reject(error)
//     } else if (error.response && error.response.status && (error.response.status === 403 || error.response.status === 403)) {

//     } else {
//       return Promise.reject(error.response.data)
//     }
//   }
// )

export default service