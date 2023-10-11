var assert = require('assert');
const server = require('../server.js');
const app = server.app;
const http = server.http;

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

let _id = '';

describe('Serverside User Routes Tests', function() {
    before(function() {
        console.log("Before tests");
    })
    after(function() {
        console.log("After tests");
    })

    describe('get all users test ', () => {
        it('It should get all users from the mongodb', (done) => {
            chai.request(app)
                .get('/api/getusers')
                .end((err, res) => {
                    //console.log(res.body);
                    res.body.should.be.a('array');
                    res.body[0].username.should.be.eql('super');
                    done();
                })
        })
    });

    describe('add a new user test ', () => {
        it('It should add a new user to the mongodb', (done) => {
            chai.request(app)
                .post('/api/signup')
                .set('Content-Type', 'application/json')
                .send({'email': 'test@email.com', 'username': 'unittest', 'pwd': 'chai2'})
                .end((err, res) => {
                    //console.log(res.body);
                    res.body.success.should.be.eql(true);
                    done();
                })
        })
    });

    describe('add a duplicate user test ', () => {
        it('It should add a new user to the mongodb', (done) => {
            chai.request(app)
                .post('/api/signup')
                .set('Content-Type', 'application/json')
                .send({'email': 'test@email.com', 'username': 'unittest', 'pwd': 'chai2'})
                .end((err, res) => {
                    //console.log(res.body);
                    res.body.success.should.be.eql(false);
                    res.body.err.should.be.eql('duplicate user');
                    done();
                })
        })
    });

    describe('login as existing user test ', () => {
        it('It should check credentials and return user details as a successful login check', (done) => {
            chai.request(app)
                .post('/api/login')
                .set('Content-Type', 'application/json')
                .send({'username': 'unittest', 'pwd': 'chai2'})
                .end((err, res) => {
                    //console.log(res.body);
                    res.body.email.should.be.eql('test@email.com');
                    res.body.username.should.be.eql('unittest');
                    res.body.pwd.should.be.eql('');
                    res.body.permission.should.be.eql('user');
                    res.body.avatar.should.be.eql('');
                    _id = res.body.id;
                    console.log(_id);
                    done();
                })
        })
    });

    describe('update user test ', () => {
        it('It should update a users details on mongodb', (done) => {
            chai.request(app)
                .post('/api/updateuser')
                .set('Content-Type', 'application/json')
                .send({user:{'id': _id,'email': 'update@email.com', 'username': 'unittest-update', 'pwd': 'chai2', 'permission':'updater', 'avatar':'update.png'}})
                .end((err, res) => {
                    //console.log(res.body);
                    res.body.email.should.be.eql('update@email.com');
                    res.body.username.should.be.eql('unittest-update');
                    res.body.pwd.should.be.eql('');
                    res.body.permission.should.be.eql('updater');
                    res.body.avatar.should.be.eql('update.png');
                    done();
                })
        })
    });

    describe('delete a user test ', () => {
        it('It should delete a user from the mongodb', (done) => {
            console.log('id:',_id);
            chai.request(app)
                .post('/api/deleteuser')
                .set('Content-Type', 'application/json')
                .send({user:{'id': _id,'email': 'test@email.com', 'username': 'unittest', 'pwd': 'chai2'}})
                .end((err, res) => {
                    //console.log('result:',res.body);
                    res.body.msg.should.be.eql("User deleted successfully");
                    //res.body.should.be.a('string');
                    done();
                })
        })
    });

})

/*
res.body.email.should.be.eql('test@email.com');
                    res.body.username.should.be.eql('unittest');
                    res.body.pwd.should.be.eql('');
                    res.body.permission.should.be.eql('user');
                    res.body.avatar.should.be.eql('');

*/