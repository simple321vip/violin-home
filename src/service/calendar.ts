import axios from 'axios'

const service = axios.create()

const get_holiday = () => {
  return service({
    url: 'https://holidays-jp.github.io/api/v1/2023/date.json',
    method: 'GET'
  })
}

export {
  get_holiday
}