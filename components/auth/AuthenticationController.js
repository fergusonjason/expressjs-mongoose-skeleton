import User from './../user/User';
import {log} from "./../../util/logger";
import _ from "lodash";
import jwt from "jsonwebtoken";

let AuthenticationController = {};

AuthenticationController.authenticate = async (req, res) => {

    log.info(`Entered AuthenticationController.authenticate(), email: ${req.body.email}`);

    try {
        var user = await User.findOne( {email: req.body.email}).exec();
        if (user == null || user == {}) {
            res.status(200).json({});
        } else {
            // we found the user, now check the password
            if (user.comparePassword(req.body.password, user.password) == true) {

                let fixedUser = _.omit(user, "password");
                let token = jwt.sign(fixedUser.toJSON(), "RedRobinYummm");
                res.status(200).json({success: true, token: `JWT ${token}`});

            } else {
                // if it failed, send a 404 to imply the endpoint doesn't exist
                res.status(404).send();
            }
            
        }
    } catch (err) {
        res.status(401).json({success: false});
    }
}

export default AuthenticationController;