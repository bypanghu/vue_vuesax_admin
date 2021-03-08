import request from '@/utils/request'

export function getQRData() {
  return request({
    url: 'index/qrcode',
    method: 'get',
  })
}

export function qrLogin(data){
  return request({
    url : 'index/qrlogin',
    method : 'post',
    data : data
  })
}