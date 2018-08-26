import express from "express";
import bodyParser from "body-parser";
import {log} from "./util/logger";

import defaultRoutes from "./components/default/defaultRoutes";
import authRoutes from './components/auth/authenticationRoutes';
import userRoutes from "./components/user/UserRoutes";

log.info("Entered app.js");

let app = express();

app.use(bodyParser.json());
app.use('/', defaultRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

export default app;