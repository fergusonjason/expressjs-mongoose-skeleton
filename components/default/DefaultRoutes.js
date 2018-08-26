import express from "express";
import {log} from "./../../util/logger";

let router = express.Router();

router.get('/', (req, res, next) => {

    log.info("Entered GET /");
    
    res.status(404).end();

    next();
});

export default router;