import Axios from 'axios';

const CancelToken = Axios.CancelToken;

export const axios = Axios.create({
    baseURL: process.env.VUE_APP_API_BASIC_URL,
    responseType: 'json',
    // withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    validateStatus: status => ((status >= 200 && status < 300) || status === 304)
});

//全局请求拦截器
axios.interceptors.request.use(config => {
    const token = '';
    if (token) {
        config.headers.token = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

//全局响应拦截器
axios.interceptors.response.use(function (response) {
    console.log(response);
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

let apisConfig = {};
const apis = {};

const context = require.context('../modules', true, /apis\.js$/);
context.keys().forEach(key => {
    const { default: api } = context(key);
    apisConfig = Object.assign(apisConfig, api);
});

Object.keys(apisConfig).forEach(key => {
    const config = apisConfig[key];

    function request(restful, params) {
        config.method = config.method?.toLowerCase() || 'get';
        let parameter = {};
        let query = {};
        if (config.restful) {
            config.transform ? config.url = config.original : config.original = config.url;
            const match = config.url.match(/{[^{}]+}/g);
            if (match && match.length > 0) {
                match.forEach(str => {
                    str = str.slice(1, -1);
                    if (!restful || Object.prototype.toString.call(restful) !== '[object Object]' || !Object.keys(restful).includes(str)) {
                        let cancel;
                        config.cancelToken = new CancelToken(c => cancel = c);
                        cancel(`${ key } 请求中 ${ str } 参数未注入`);
                    } else {
                        config.url = config.url.replace(`{${ str }}`, restful[str]);
                    }
                });
                config.transform = true;
            } else {
                let cancel;
                config.cancelToken = new CancelToken(c => cancel = c);
                cancel('你似乎并不需要 restful，请删除 restful 属性，或赋值为 false');
            }
            parameter = params;
            query = arguments[2];
        } else {
            parameter = restful;
            query = arguments[1];
        }

        if (config.method === 'get' || config.method === 'delete') {
            config.params = { ...parameter, ...query };
        } else if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
            config.data = parameter;
            config.params = query;
        }
        return axios.request(config);
    }

    apis[key] = request;
});

export default apis;
