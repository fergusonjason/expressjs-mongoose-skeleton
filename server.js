import https from "https";
import app from "./app";
import fs from "fs";
import {log} from "./util/logger";

log.info("Entered server.js");

let server = https.createServer({
    key: fs.readFileSync("./config/localhost.key"),
    cert: fs.readFileSync("./config/localhost.cert")
}, app);

server.listen(3443, () => {
    log.info("HTTPS server listening on port 3443");
}).on('error', (err, socket) => {
    log.error(`Error on startup, Code: ${err.code}`);
});

// TODO: gracefully shut down the server on error!!!

export default server;