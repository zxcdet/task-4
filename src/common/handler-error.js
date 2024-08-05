import status from 'http-status';
class ResponseError extends Error {
    constructor(code, ...rest) {
        super(...rest);
        this.statusCode = code;
        this.text = status[code];
    }
}

export {ResponseError}
