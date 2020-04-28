import request from '@/utils/request'

export function uploadExcel(data) {
  return request({
    url: '/vue-element-admin/upload',
    method: 'post',
    data
  })
}
