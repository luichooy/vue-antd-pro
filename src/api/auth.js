import request from '@/utils/request'

export function login (params) {
  return request.get('/login')
}

export function logout () {
  return request.get('/logout')
}

export function modifyPassword (params) {
  return request.post('/modifyPassword', params)
}
