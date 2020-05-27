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

/**
 * 解决 Vue Template 中无法使用可选链的问题
 * @param obj
 * @param rest
 * @returns {*}
 */
export const optionalChaining = (obj, ...rest) => {
    let tmp = obj;
    for (const name of rest) {
        tmp = tmp?.[name];
    }
    return tmp || undefined;
};
