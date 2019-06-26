import request from '@/utils/request'

export function login (params) {
  return request.get('/login')
}

export function logout () {
  return request.get('/auth/logout')
}

export function modifyPassword (params) {
  return request.post('/user/modifyPassword', params)
}
