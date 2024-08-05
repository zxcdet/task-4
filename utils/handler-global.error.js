import {logger} from "../src/common/logger.js";

export function handlerGlobalError() {
    process.on('uncaughtException', (error) => {
        logger.error({
            level: 'error',
            message: `Caught exception: ${error}`,
        });
    });

    process.on('unhandledRejection', (reason) => {
        logger.error({
            level: 'error',
            message: `Unhandled Rejection, reason: ${reason ? reason : '' }`,
        });
    });
}