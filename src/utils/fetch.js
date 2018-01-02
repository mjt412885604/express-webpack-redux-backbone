import axios from 'axios'
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: '../',
    timeout: 30000
});

service.interceptors.request.use(function (config) {
    if (getToken()) {
        config.headers['Authorization'] = getToken() // 让每个请求携带token--['Authorization']
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

service.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    console.error(error.response)
    if (error.response.status == 401) {
    }

    return Promise.reject(error);
});

export default service;