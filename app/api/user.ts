import request from '../utils/request';

export interface LoginParams {
  email: string;
  password: string;
  language: string;
  remember_me: boolean;
}

export interface UserInfo {
  id: string;
  username: string;
  avatar?: string;
  email?: string;
  role: string;
}

// 用户登录
export const login = (params: LoginParams) => {
  return request.post<UserInfo>('/login', params);
};

// 获取用户信息
export const getUserInfo = () => {
  return request.get<UserInfo>('/user/info');
};

// 退出登录
export const logout = () => {
  return request.post('/user/logout');
};
