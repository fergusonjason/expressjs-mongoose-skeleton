import winston, {createLogger, format} from "winston";
import dailyRotate from "winston-daily-rotate-file";
import fs from "fs";

const loggingDir = "logs";

if (!fs.existsSync(loggingDir)) {
    fs.mkdirSync(loggingDir);
}

const log = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new (winston.transports.Console)({level: "debug", colorize: true, timestamp: true, json: false}),
        new (dailyRotate)({
            dirname: loggingDir,
            filename: `application-%DATE%.log`,
            zippedArchive: true,
            datePattern: "YYYYMMDD",
            maxSize: "20m",
            maxFiles: "14d"
        }),
        new (dailyRotate)({
            level: "error",
            dirname: loggingDir,
            filename: `application-error-%DATE%.log`,
            zippedArchive: true,
            datePattern: "YYYYMMDD",
            maxSize: "20m",
            maxFiles: "14d"
        })        
    ],
    exitOnError: false
});

const accesslog = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new (dailyRotate)({
            dirname: loggingDir,
            filename: `access-%DATE%.log`,
            zippedArchive: true,
            datePattern: "YYYYMMDD",
            maxSize: "20m",
            maxFiles: "14d"
        }) 
    ],
    exitOnError: false
});

export {log, accesslog};