import jwt from "jsonwebtoken";
import config from 'config';
import _ from "lodash";

import User from './../user/User';
import {log} from "./../../util/logger";

let AuthenticationController = {};

const secret = config.get('passport').secretKey;

AuthenticationController.authenticate = async (req, res) => {

    log.info(`Entered AuthenticationController.authenticate(), email: ${req.body.email}`);

    try {
        // use await so that I can unit test without losing my freaking
        // mind
        var user = await User.findOne( {email: req.body.email}).exec();

        // I don't want the returned token to return the password, even
        // if it is hashed, so let lodash omit that key
        let fixedUser = _.omit(user, "password");
        let token = jwt.sign(fixedUser.toJSON(), secret);
        res.status(200).json({success: true, token: `JWT ${token}`});

    } catch (err) {

        // if it failed, send a 404 to imply the endpoint doesn't exist
        res.status(404).send();
    }

}

export default AuthenticationController;