import {ResponseError} from "../src/common/handler-error.js";
import status from "http-status";
import {logger} from "../src/common/logger.js";

export function errorMiddleware() {
    return (err, req, res, next) => {
        if(err instanceof ResponseError) {
            res.sendStatus(err.statusCode);
        } else {
            logger.error({
                level: 'error',
                message: `Error: ${status[status.INTERNAL_SERVER_ERROR]}`,
            });
            next();
        }
    };
}