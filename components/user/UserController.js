import User from "./User";
import {log} from "./../../util/logger";

const UserController = {};

UserController.listUsers = async (req, res, next) => {
    
    log.info("Entered UserController.listUsers");

    try {
        // get result of User.find() as a promise, then await the result
        let users = await User.find({}).exec();
        if (users.length == 0) {
            res.status(200).json([]);
        } else {
            res.status(200).json(users);
        }
    } catch (err) {
        log.info("Caught error in User.find(), returning status 401");
        res.status(401);
    }

    next();

};