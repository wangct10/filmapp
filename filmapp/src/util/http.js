// 对于数据请求的封装 第一种方法
// import axios from "axios";

// function httpForList() {
//   return axios({
//     url:
//       'https://m.maizuo.com/gateway?cityId=440100&pageNum=1&pageSize=10&type=1&k=5196770',
//     headers: {
//       'X-Client-Info':
//         '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606697250632532718583809","bc":"440100"}',
//       'X-Host': 'mall.film-ticket.film.list'
//     }
//   })
// }

// function httpForDetail(params) {
//   return axios({
//     url: `https://m.maizuo.com/gateway?filmId=${params}&k=6826809`,
//     headers: {
//       "X-Client-Info":
//         '{"a":"3000","ch":"1002","v":"5.2.0","e":"1651110130528272387473409","bc":"120100"}',
//       "X-Host": "mall.film-ticket.film.info",
//     }
//   })
// }

// export default {
//   httpForList,
//   httpForDetail
// }


// 2-对于数据请求的封装 第二种方法
import axios from "axios";
import { Toast } from "vant";
const http = axios.create({
  baseURL: 'https://m.maizuo.com/',
  timeout: 10000,
  headers: {
    'X-Client-Info':
      '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606697250632532718583809","bc":"440100"}',
  }
});

//axios拦截 在发请求之前拦截  --showLoading
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log(config);
  // 设置加载轻提示
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
    duration: 0,
  });
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 在成功后拦截  --hideLoading
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  // 加载完毕后清除加载轻提示
  Toast.clear()
  return {
    ...response,
    aaa: 'wang'
  };
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  Toast.clear()
  return Promise.reject(error);
});

export default http

