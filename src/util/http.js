// --对于数据的请求的封装   axios自带封装
import axios from 'axios'
import { Toast } from 'vant'
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16791313601681715919585281"}'
  }
})
// 发请求之前拦截 ---showLoading
// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log(config)
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return {
    ...config,
    xxx: 'liaojie'
  }
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 在成功之后拦截 --hideLoading
// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // 隐藏loading
  Toast.clear()
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default http
