import axios from 'axios'
import { getToken } from '@/auth/token'
import { Message } from 'element-ui';

const service = axios.create({
  baseURL: 'http://192.168.31.156:8001/', 
  timeout: 5000 
})

   //http request 拦截器
   service.interceptors.request.use(
    config => {

        const token =getToken()
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/json',
            'x-token': token,
        }
        return config;
    },
    error => {
        Message({
            showClose: true,
            message: error,
            type: 'error'
        })
        return error;
    }
);


//http response 拦截器
service.interceptors.response.use(
    response => {
        if(response.code == 400){
            Message({
                showClose: true,
                message: '网络错误',
                type: 'error'
            })
        }else{
            return response.data
        }
        
    },
    error => {
        Message({
            showClose: true,
            message: error,
            type: 'error'
        })
        return error
    }
)
export default service
