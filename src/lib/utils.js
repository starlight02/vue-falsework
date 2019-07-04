export class Cookie {

    /**
     *
     * @param name
     * @param value
     * @param expires 过期时间，不设置默认是 7 天后过期
     * @param domain 域名默认是主域名
     * @param path 路径默认是 /
     */
    static setCookie(name, value = name, expires, domain = document.domain, path = '/') {
        if (!expires) {
            const DAYS_OF_WEEK = 7;
            const MILLISECONDS_OF_DAY = 24 * 60 * 60 * 1000;
            expires = new Date(new Date().getTime() + DAYS_OF_WEEK * MILLISECONDS_OF_DAY);
        }
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};domain=${domain};path=${path}`;
    }

    static getCookie(name) {
        const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        const array = document.cookie.match(reg);
        if (array) {
            return decodeURIComponent(array[2]);
        } else {
            return '';
        }
    }

    static deleteCookie(name, domain = document.domain, path = '/') {
        document.cookie = `${name}=0;domain=${domain};path=${path};max-age=0`;
    }
}

/**
 *
 * @param date Date 对象 或者 YYYY/MM/DD 时间字符串
 * @returns {string} YYYY-MM-DD 格式的字符串
 */
export function formatDate(date) {
    let dateObject = date;
    if (typeof date === 'string') {
        dateObject = new Date(date);
    }
    return dateObject.toLocaleDateString('cn', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-');
}
