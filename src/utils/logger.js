// utils/logger.js
import winston from "winston";
import chalk from "chalk";

// Console formatter
const consoleFormat = winston.format.printf(({ level, message, timestamp }) => {
    const time = chalk.gray(timestamp);  // timestamp gray
    let coloredMessage;

    switch(level) {
        case 'error':
            coloredMessage = chalk.red(`[${level.toUpperCase()}]: ${message}`);
            break;
        case 'warn':
            coloredMessage = chalk.yellow(`[${level.toUpperCase()}]: ${message}`);
            break;
        case 'info':
            coloredMessage = chalk.green(`[${level.toUpperCase()}]: ${message}`);
            break;
        case 'debug':
            coloredMessage = chalk.blue(`[${level.toUpperCase()}]: ${message}`);
            break;
        default:
            coloredMessage = `[${level.toUpperCase()}]: ${message}`;
    }

    return `${time} ${coloredMessage}`;
});

// File formatter
const fileFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                consoleFormat
            )
        }),
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
            format: winston.format.combine(
                winston.format.timestamp(),
                fileFormat
            )
        }),
        new winston.transports.File({
            filename: "logs/combined.log",
            format: winston.format.combine(
                winston.format.timestamp(),
                fileFormat
            )
        })
    ]
});

export default logger;
