import Cookies from 'js-cookie';
import axios from 'axios';
import { Notification } from 'element-ui';
import { Hex } from 'hui-vue';

const req = {};

req.redirectToSso = () => {
  if (window.location.href.indexOf('#/signin') > -1) {
    return;
  }
  // 记录当前页面地址
  Cookies.set('urlBeforeSso', window.location.href);
  window.location.href = window.location.origin + window.location.pathname + '#/signin';
};
const service = axios.create({
  timeout: 50000,
  maxRedirects: 0,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
});

// http request 拦截器
service.interceptors.request.use(
  config => {
    // 全部设置为ajax请求
    config.headers['x-requested-with'] = 'XMLHttpRequest';

    // 没有获取到token,跳向SSO认证
    const accessToken = Cookies.get('access-token') || localStorage.getItem('session');
    config.headers['access-token'] = accessToken;
    return config;
  },
  err => Promise.reject(err)
);

// http response 拦截器
service.interceptors.response.use(
  res => {
    const code = res.data.code;
    if (code !== 0) {
      Notification.error({
        message: res.data.message
      });
      if (code === -2) {
        Cookies.remove('access-token');
        localStorage.setItem('session', null);
        req.redirectToSso();
      }
    }
    return res.data;
  },
  err => {
    if (err && err.response) {
      Notification.error({
        message: err.response.statusText
      });
      if (err.response.status === 401) {
        Cookies.remove('access-token');
        localStorage.setItem('session', null);
        req.redirectToSso();
      }
    }
    return Promise.reject(err);
  }
);

req.get = (url, params, cb) => {
  if (cb === undefined) {
    cb = params;
    params = undefined;
  }
  if (params !== undefined) {
    url = url + '?' + Hex.toQuery(params);
  }
  return service.get(url).then(res => {
    cb(res.data);
    return res.data;
  });
};

req.post = (url, params, cb) => service.post(url, params).then(res => {
  cb(res.data);
  return res.data;
});

req.put = (url, params, cb) => service.put(url, params).then(res => {
  cb(res.data);
  return res.data;
});

req.patch = (url, params, cb) => service.patch(url, params).then(res => {
  cb(res.data);
  return res.data;
});

req.delete = (url, cb) => service.delete(url).then(res => {
  cb(res.data);
  return res.data;
});

req.service = service;
req.axios = axios;
export default req;
