import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';

import User from './components/user/User';
import {log} from './util/logger';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

passport.use('authenticate', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({email: email}).exec();
        if (!user) {
            return done(null, false, {message: `User ${email} not found`});
        }

        const passwordValid = user.comparePassword(password);
        if (!passwordValid) {
            return done(null, false, {message: 'Bad Password'});
        }

        return done(null, user, {message: `User ${email} logged in successfully`});
    } catch (err) {
        return done(err);
    }
}));

passport.use(new JWTStrategy({
    secretOrKey: 'RedRobinYummm',
    jwtFromRequest: ExtractJWT.fromHeader('auth')
}, async (token, done) => {
    try {
        log.info(`Token: ${JSON.stringify(token)}`);

        return done(null, token);
    } catch (err) {
        log.info(`Error caught: ${JSON.stringify(err)}`);
        done(err);
    }
}));