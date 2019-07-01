export default function to(promise) {
    if (!promise || !Promise.prototype.isPrototypeOf(promise)) {
        return new Promise((resolve, reject) => {
            reject(new Error('参数必须是 promise'));
        }).catch((err) => {
            return [err, null];
        });
    }
    return promise.then(data => {
        return [null, data];
    }).catch(err => {
        return [err, null];
    });
}
