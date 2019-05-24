import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/clients/list',
    method: 'get',
    params: query
  })
}

export function fetchCllients(id) {
  return request({
    url: '/clients/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/clients/pv',
    method: 'get',
    params: { pv }
  })
}

export function createCllients(data) {
  return request({
    url: '/clients/create',
    method: 'post',
    data
  })
}

export function updateCllients(data) {
  return request({
    url: '/clients/update',
    method: 'post',
    data
  })
}
