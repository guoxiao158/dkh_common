import axios from 'axios';
import QS from 'qs';
//安装NutUI，pc端修改未其他
import { Toast } from '@nutui/nutui';

// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = '/api';
// } else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = 'http://api.123dailu.com/';
// }

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
withCredentials: true; // 跨域请求的时候允许带上cookie发送到服务器
let _toast = Toast;
let loading = null;

// 请求拦截器
axios.interceptors.request.use(
    loading = _toast.loading({
        cover: false,
        coverColor: "rgba(0,0,0,0.5)"
    }), config => {
        // 如果需要添加token或者cookie，请在这里添加
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        // return config;
        // 当如果请求中需要cookie的时候
        // let cookie = localStorage.getItem('token');
        // if (!cookie) {
        //     cookie = Utils.getCookie('jxi-m-sid')
        // }
        // cookie && (config.headers['jxi-m-sid'] = cookie);
        // return config;
        return config;
    },
    error => {
        return Promise.error(error);
    });

// 响应拦截器
axios.interceptors.response.use(
    response => {
        const { status, data } = response;
        if (Object.is(status, 200)) {
            if (loading != '') loading.hide();
            const { code, msg } = data;
            switch (code) {
                //根据各项目进行code处理
                case 200:
                    return Promise.resolve(data.data);
                    // 根据各项目进行code值统一处理
                case 304:
                    // 请求过期
                    console.log('跳转到首页');
                    break;
                default:
                    return;
            }
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况    
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                // 401:具体的错误可以在这这里处理。                
                case 401:
                case 403:
                case 404:
                default:
                    Toast.fail(error.response.data.message);
            }
            return Promise.reject(error.response);
        } else {
            // 超时处理
            if (JSON.stringify(error).includes('timeout')) {
                Toast.fail('服务器响应超时，请刷新当前页')
            }
        }
    }
);
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function $get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function $post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}