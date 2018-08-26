// /routes/authenticationRoute.js
import express from "express";
import passport from "passport";
import {log} from "./../../util/logger";
import _ from "lodash";
import jwt from "jsonwebtoken";
import User from './../user/User';
import AuthenticationController from './AuthenticationController';

const router = express.Router();

router.post('/authenticate', (req, res, next) => AuthenticationController.authenticate(req, res));


export default router;