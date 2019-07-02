import Axios from 'axios';

const CancelToken = Axios.CancelToken;

const axios = Axios.create({
    baseURL: '/',
    responseType: 'json',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    validateStatus: status => ((status >= 200 && status < 300) || status === 304)
});

axios.interceptors.request.use(config => {
    /*FIXME*/
    const token = 'qqq';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

let apisConfig = {};
const apis = {};

const context = require.context(`./modules`, true, /apis\.js$/);
context.keys().forEach(key => {
    const {default: api} = context(key);
    apisConfig = Object.assign(apisConfig, api);
});

Object.keys(apisConfig).forEach(key => {
    const config = apisConfig[key];

    /**
     * 实际发送请求的方法
     * @param restful   restful 参数，在使用 restful 风格的 URL 时需要
     * @param params    请求参数
     */
    function request(restful, params) {
        if (!config.transform) {
            config.method = config.method || 'get';
            let parameter = {};
            if (config.restful) {
                const match = config.url.match(/{[^{}]+}/g);

                if (match && match.length > 0) {
                    match.forEach(str => {
                        str = str.slice(1, -1);
                        if (!restful || Object.prototype.toString.call(restful) !== '[object Object]' || !Object.keys(restful).includes(str)) {
                            let cancel;
                            config.cancelToken = new CancelToken(c => cancel = c);
                            cancel(`${key} 请求中 ${str} 参数未注入`);
                            return null;
                        } else {
                            config.url = config.url.replace(`{${str}}`, restful[str]);
                        }
                    });
                    config.transform = true;
                } else {
                    let cancel;
                    config.cancelToken = new CancelToken(c => cancel = c);
                    cancel('你似乎并不需要 restful，请删除 restful 属性，或赋值为 false');
                    return null;
                }
                parameter = params;
            } else {
                parameter = restful;
            }

            if (config.method === 'get' || config.method === 'delete') {
                config.params = parameter;
            } else if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
                config.data = parameter;
            }
        }
        return axios.request(config);
    }

    apis[key] = request;
});

export default apis;
