import mongoose from "mongoose";
import config from "config";
import {log} from "./util/logger";

// connect to mongo
const mongooseConfig = config.get('mongoose');

mongoose.connect(mongooseConfig.mongoUrl, (error) => {

    if (error) {
        log.info("Exiting. Mongo only pawn in game of life");
    }
});