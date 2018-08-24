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
    log.info("Listening on port 3443");
});

// const shutdown = () => {
//     server.close(() => {
//         log.info("Closing out server connections");
//         process.exit(0);
//     });
// }

// process.on('SIGTERM', shutdown);
// process.on('SIGNINT', shutdown);

export default server;