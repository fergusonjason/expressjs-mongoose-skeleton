import express from "express";
import bodyParser from "body-parser";
import {log} from "./util/logger";

import defaultRoutes from "./components/default/defaultRoutes";

log.info("Entered app.js");

let app = express();

app.use(bodyParser.json());
app.use('/', defaultRoutes);

export default app;