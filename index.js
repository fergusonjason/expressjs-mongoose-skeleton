
import config from "config";
import {log} from "./util/logger";

if (config.get('https').allowLocalCerts) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

log.info("*** RELEVANT ENVIRONMENT VARIABLES ***");
log.info(`NODE ENV: ${process.env.NODE_TLS_REJECT_UNAUTHORIZED }`);
log.info(`REJECT SELF-SIGNED CERT: ${process.env.NODE_TLS_REJECT_UNAUTHORIZED}`);

import "./mongoose";

import server from "./server";

process.on('SIGINT', () => {
    log.warn('Caught SIGINT, closing server');
    server.close(() => {
        log.info('Shutting down server');
    });
});