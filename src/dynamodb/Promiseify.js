const Promiseify = (method) => {
    if (typeof method !== 'function') return new Error('Must supply a valid callback to promiseIffy')

    return (params) => {
        return new Promise((res, rej) => {
            method(params, (err, data) => {
                if (err) return rej(err);
                res(data);
            })
        })
    }
}

module.exports = Promiseify;