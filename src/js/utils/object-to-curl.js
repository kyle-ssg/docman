module.exports = (url, options) => {
    var curl = `curl `
    if (options.headers) {
        Object.keys(options.headers).map((key) => {
            curl += ` -H "${key}: ${options.headers[key]}"`
        });
    }

    if (options.body) {
        curl += ` -d '${JSON.stringify(options.body, null, 2)}'`
    }

    curl += ` '${url}'`;
    return curl;
}