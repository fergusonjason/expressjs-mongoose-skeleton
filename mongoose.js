import mongoose from "mongoose";
import config from "config";
import {log} from "./util/logger";

// connect to mongo
const mongooseConfig = config.get('mongoose');

log.info(`MongoURL: ${mongooseConfig.mongoUrl}`);

mongoose.connect(mongooseConfig.mongoUrl, (error) => {

    if (error) {
        log.info("Exiting. Mongo only pawn in game of life");
    } else {
        log.info("Connected to mongo");
    }
});