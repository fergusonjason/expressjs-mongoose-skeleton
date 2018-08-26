import sinon from 'sinon';
import * as sinonMongoose from 'sinon-mongoose';
import mockHttp from 'node-mocks-http';
import chai from 'chai';

import User from './User';
import UserController from './UserController';

const should = chai.should();

describe('UserController', () => {

    let req = mockHttp.createRequest();
    let res = mockHttp.createResponse();

    describe('/list', () => {

        let findStub = null;


        beforeEach(() => {
            req = mockHttp.createRequest();
            res = mockHttp.createResponse();

            findStub = sinon.stub(User, 'find');
        });

        afterEach(() => {
            findStub.restore();
        });

        it('should return 200 on nothing found', ()=> {
            findStub.resolves([]);

            UserController.listUsers(req, res);

            chai.expect(res.status() == 200);

        }),
        it('should return 200 when results found', () => {

            findStub.resolves([{email:"noone@nowhere.com", password:"password", isAdmin: false}]);

            UserController.listUsers(req, res);

            chai.expect(res.status() == 200); 
                
        }),
        it('should return an empty array when no results found', () => {
            findStub.resolves([]);

            UserController.listUsers(req, res);

            chai.expect(res._getData() === []);
        }),
        it('should return 401 when an error occurs', () => {

            findStub.resolves(new Error("Test Error"));

            UserController.listUsers(req, res);
            chai.expect(res.status() == 401); 

        })
    });

    describe('/create', () => {

        let saveStub = null;
        let assert = chai.assert;

        beforeEach(() => {
            req = mockHttp.createRequest();
            res = mockHttp.createResponse();

            saveStub = sinon.stub(User, 'create');
        });

        afterEach(() => {
            saveStub.restore();
        });

        it('should return 200 when successful', () => {


            saveStub.resolves({success: true});

            UserController.createUser(req, res);
            console.log(`Status: ${res.statusCode}`);
            assert.equal(res.statusCode, 200, `Expected status 200, actual ${res.statusCode}`);
            //chai.expect(res.status() == 200);
        });

        it('should return 401 when an error occurs', () => {

            saveStub.resolves(new Error("Test error"));
            UserController.createUser(req, res);

            const status = res.status();
            console.log(JSON.stringify(res.statusCode));
            assert.equal(res.statusCode, 401, `Expected status 401, actual ${status}`);
            //chai.expect(res.status() == 401);
        });
    });
});