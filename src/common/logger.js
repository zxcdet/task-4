import winston from "winston";

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.label({label: 'right now!'}),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.Console({ level: 'info', format:   winston.format.printf(({ message,timestamp  }) => `${timestamp} ${message}`)}),
        new winston.transports.File({filename: 'logs/error.log',  level: 'error'}),
        new winston.transports.File({ filename: 'logs/http.log', level: 'info', format: winston.format.combine(
                winston.format.printf(({ message,timestamp  }) => `${timestamp} ${message}`),
                winston.format((info) => {
                    if (info.level === 'info') {
                        return info;
                    }
                    return false;
                })()) }),
    ],
})