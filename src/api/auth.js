import request from '@/utils/request'

export function login (params) {
  return request.post('/auth/login', params)
}

export function logout () {
  return request.get('/auth/logout')
}

export function modifyPassword (params) {
  return request.post('/user/modifyPassword', params)
}
