import express from "express";
import userController from "./UserController";

let router = express.Router();

router.get('/list', (req, res, next) => userController.listUsers(req, res));
router.post('/create', (req, res, next) => userController.createUser(req, res));
router.post('/makeAdmin/:id', (req, res, next) => {
    userController.makeAdmin(req, res);
});

router.post('/deleteUser/:id', (req, res, next) => userController.deleteUser(req, res));

export default router;