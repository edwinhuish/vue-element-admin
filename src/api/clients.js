import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/clients/list',
    method: 'get',
    params: query
  })
}

export function fetchClient(id) {
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

export function updateClient(data) {
  if (data.id) {
    return request({
      url: '/clients/' + data.id,
      method: 'put',
      data
    })
  } else {
    return request({
      url: '/clients',
      method: 'post',
      data
    })
  }
}
