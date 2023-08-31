import axios from 'axios'

const instance = axios.create({
  headers: {
    'content-type': 'multipart/form-data'
  }
})

// http request拦截器
instance.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('token')// 此处用这个localStorage 也可以用store，因为一般登录后都会将登录信息存储到vuex中，但是如果不存储到localsStorage的话，当前页面刷新时，vuex中的内容会消失。
    // if (token) {
    config.headers.Authorization = 'bearer;eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiMSIsInVuaXF1ZV9uYW1lIjoid3l6IiwiY3VzdG9tZXJfY29kZSI6IktfS0NaR19DT00iLCJ1c2VyaWQiOjE5ODQsImlzcyI6IiIsImF1ZCI6IkhFTkFOWU9OR0NIRU5HIiwiZXhwIjoxNjg4NTIwNTU2LCJuYmYiOjE2ODg0MzQxNTZ9.vG5h90M4Fu2FPV2fYFmirmCCIFiu529REqWflITjD14' // 请求头加上token
    // }
    return config
  }, err => {
    return Promise.reject(err)
  }
)
export default instance
