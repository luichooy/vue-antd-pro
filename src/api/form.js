import request from '@/utils/request'

export function getUsers (params) {
  return request.get(`/users?_page=${params.current}&_limit=${params.pageSize}`)
}

export function deleteAccount (id) {
  return request.delete(`/users/${id}`)
}
