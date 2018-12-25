import Axios, { AxiosRequestConfig } from 'axios';

interface ApisConfig extends AxiosRequestConfig {
    url: string;
    method?: string;
    restful?: boolean;
    transform?: boolean;
}

const CancelToken = Axios.CancelToken;

const axios = Axios.create({
    baseURL: '/',
    responseType: 'json',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 304;
    },
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

let apis: any = {};
const context = require.context(`./modules`, true, /apis\.js$/);
context.keys().forEach((key: string) => {
    const {default: api} = context(key);
    apis = Object.assign(apis, api);
});

Object.keys(apis).forEach((key: string) => {
    
    const config: ApisConfig = apis[key];
    
    /**
     * 实际发送请求的方法
     * @param restful   restful 参数，在使用 restful 风格的 URL 时需要
     * @param params    请求参数
     * @return {Promise}
     */
    function request(restful: any, params: object) {
    
        if (!config.transform) {
            if (config.restful) {
                const match = config.url.match(/(?<=\{)[^\}]+/g);
            
                if (match && match.length > 0) {
                    match.forEach((str: string) => {
                        if (!restful || (typeof restful) !== 'object' || !Object.keys(restful).includes(str)) {
                            let cancel = (message: string) => {
                            };
                            config.cancelToken = new CancelToken(c => cancel = c);
                            cancel(`${key} 请求中 ${str} 参数未注入`);
                        } else {
                            config.url = config.url.replace(`{${str}}`, restful[str]);
                        }
                    });
                    config.transform = true;
                } else {
                    let cancel = (message: string) => {
                    };
                    config.cancelToken = new CancelToken(c => cancel = c);
                    cancel('你似乎并不需要 restful 风格，请删除 restful:true，或赋值为 false');
                }
            }
        
            const parameter = !params ? restful : params;
            config.method = config.method || 'get';
            if (config.method === 'get' || config.method === 'delete') {
                config.params = parameter;
            } else if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
                config.data = parameter;
            }
        }
        
        return Axios.request(config);
    }
    
    apis[key] = request;
});

export default apis;
