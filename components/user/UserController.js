import User from "./User";
import {log} from './../../util/logger';

const UserController = {};

UserController.listUsers = async (req, res) => {
    
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

};

UserController.createUser = async (req, res) => {

    log.info(`Entered UserController.createUser, req body: ${JSON.stringify(req.body)}`);

    // always make isAdmin false so that a malicious user can't 
    // create an admin user
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        isAdmin: false
    });

    try {
        await User.create(user);
        res.status(200).json({success: true});
    } catch (err) {
        log.info(`Error creating user: ${JSON.stringify(err)}`);
        res.status(401).json({success: false, message: `Error name: ${err.name}, message: ${err.errmsg}`});
    }
}

UserController.makeAdmin = async (req, res) => {

    log.info(`Entered makeAdmin, id: ${req.params.id}`);

    try {
        var result = await User.findOneAndUpdate({_id: req.params.id}, {isAdmin: true}).exec();
        log.info(`Result of findOneAndUpdate: ${result}`);
        res.status(200).json({success: true});
    } catch (err) {
        log.info(`Error in makeAdmin, message: ${err.message}`);
        res.status(401).json({success: false, message: `Error name: ${err.name}, message: ${err.errmsg}`});
    }

}

UserController.deleteUser = async (req, res) => {

    log.info(`Entered deleteUser, id: ${req.params.id}`);

    try {
        var result = await User.findOneAndDelete({_id: req.params.id}, {isAdmin: true}).exec();
        log.info(`Result of findOneAndUpdate: ${result}`);
        res.status(200).json({success: true});
    } catch (err) {
        log.info(`Error in makeAdmin, message: ${err.message}`);
        res.status(401).json({success: false, message: `Error name: ${err.name}, message: ${err.errmsg}`});
    }
}

export default UserController;