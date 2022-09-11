import axios from 'axios'
import { getToken, getTenant } from '../utils/auth'

// violin-book
const service = axios.create(
  {
    baseURL: import.meta.env.VITE_APP_URL as string,
    timeout: 5000
  }
)

// violin-trader
const trader_service = axios.create(
  {
    baseURL: import.meta.env.VITE_APP_URL2 as string,
    timeout: 5000
  }
)

service.interceptors.request.use(
  config => {
    if (typeof getToken() === 'string') {
      (config as any).headers['Authorization'] = 'Bearer' + getToken()
    }
    const tenant = getTenant()
    if (typeof tenant === 'string') {
      (config as any).headers['id'] = JSON.parse(tenant).id
    }

    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

trader_service.interceptors.request.use(
  config => {
    if (typeof getToken() === 'string') {
      (config as any).headers['Authorization'] = 'Bearer' + getToken()
    }
    const tenant = getTenant()
    if (typeof tenant === 'string') {
      (config as any).headers['id'] = JSON.parse(tenant).id
    }

    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)


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

export { service, trader_service }