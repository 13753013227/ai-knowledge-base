import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
let message: any;
if (typeof window !== 'undefined') {
  import('antd').then((antd) => {
    message = antd.message;
  });
}
import { useRouter } from 'next/navigation';

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
request.interceptors.request.use(
  (config: any) => {
    // 从localStorage获取token
    const token = localStorage.getItem('console_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response; 
    // 这里可以根据后端的响应结构进行调整
    // if (data.code === 200) {
      return data;
    // } else {
    //   message.error(data.message || '请求失败');
    //   return Promise.reject(new Error(data.message || '请求失败'));
    // }
  },
  (error) => {
    console.log("---errorerrorerror--------", error.response);
    if (message) {
      message.error(error.response.data.message);
    }
    if (error.response) {
      switch (error.response.status) {
        case 400:
          if (message) {
      message.error(error.response.data.message);
    }
          break;
        case 401:
          // 未授权，跳转到登录页
          if (message) {
            message.error('登录已过期，请重新登录');
          }
          localStorage.removeItem('console_token');
          window.location.href = '/login';
          break;
        case 403:
          if (message) {
            message.error('没有权限访问');
          }
          break;
        case 404:
          if (message) {
            message.error('请求的资源不存在');
          }
          break;
        case 500:
          if (message) {
            message.error('服务器错误');
          }
          break;
        default:
          if (message) {
            message.error('网络错误');
          }
      }
    } else {
      if (message) {
        message.error('网络连接失败');
      }
    }
    return Promise.reject(error);
  }
);

export default request;
