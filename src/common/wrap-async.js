const wrapAsync = fn => async(req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        next(err);
    }
}

export {
    wrapAsync
};