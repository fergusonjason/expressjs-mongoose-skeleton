// /routes/authenticationRoute.js
import express from "express";
import passport from "passport";
import {log} from "./../util/logger";
import _ from "lodash";
import jwt from "jsonwebtoken";
import User from "./../models/User";

const router = express.Router();

router.post("/", (req, res, next) => {
    log.info("Entered /auth/");

    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) {
            log.info(`Caught error: ${JSON.stringify(err)}`);
            res.status(401).send({success: false, message: "Error occurred"});
        }

        if (!user) {
            log.info(`Could not find user with email address ${req.body.email}`);
            res.status(401).send({success: false, message: "User not found"});
        } else {
            log.info(`User: ${JSON.stringify(user)}`);
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    // generate and return the jwt token. Exclude the password field because this
                    // is only base64-encoded, not encrypted
                    let fixedUser = _.omit(user, "password");
                    let token = jwt.sign(fixedUser.toJSON(), "RedRobinYummm");
                    res.status(200).json({success: true, token: `JWT ${token}`});
                } else {
                    res.status(401).send({success: false, message: "Incorrect username/password"});
                }
            });
        }
    });
});

export default router;