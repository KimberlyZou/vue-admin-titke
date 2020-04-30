import request from '@/utils/request'

export function uploadExcel(data) {
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}
