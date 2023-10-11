var assert = require('assert');
const server = require('../server.js');
const app = server.app;
const http = server.http;

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

let _id = '';

describe('Serverside Group Routes Tests', function() {
    before(function() {
        console.log("Before tests");
    })
    after(function() {
        console.log("After tests");
    })

    describe('get all groups test ', () => {
        it('It should get all groups from the mongodb', (done) => {
            chai.request(app)
                .get('/api/getgroups')
                .end((err, res) => {
                    //console.log(res.body);
                    res.body.should.be.a('array');
                    res.body[0].groupname.should.be.eql('mongo test');
                    done();
                })
        })
    });

    describe('add a new group test ', () => {
        it('It should add a new group to the mongodb', (done) => {
            chai.request(app)
                .post('/api/creategroup')
                .set('Content-Type', 'application/json')
                .send({'groupname': 'chaitest', 'username': 'chaiuser'})
                .end((err, res) => {
                    //console.log(res.body);
                    res.body.group.groupname.should.be.eql('chaitest');
                    res.body.group.admins.should.be.a('array');
                    res.body.group.admins[0].should.be.eql('chaiuser');
                    res.body.group.users[0].should.be.eql('chaiuser');
                    res.body.group.channels.should.be.a('array');
                    res.body.group.applied.should.be.a('array');
                    _id = res.body.group.id;
                    console.log("id:", _id);
                    done();
                })
        })
    });

    describe('update group test ', () => {
        it('It should update a groups details on mongodb', (done) => {
            chai.request(app)
                .post('/api/updategroup')
                .set('Content-Type', 'application/json')
                .send({group:{'id': _id, 'groupname': 'chaitest', 'admins':['chaiuser', 'update'], 'users':['chaiuser', 'update'], 'channels':['update'], 'applied':['update']}})
                .end((err, res) => {
                    //console.log(res.body);
                    res.body.groupname.should.be.eql('chaitest');
                    res.body.admins[1].should.be.eql('update');
                    res.body.users[1].should.be.eql('update');
                    res.body.channels[0].should.be.eql('update');
                    res.body.applied[0].should.be.eql('update');
                    done();
                })
        })
    });

    describe('delete a group test ', () => {
        it('It should delete a group from mongodb', (done) => {
            chai.request(app)
                .post('/api/deletegroup')
                .set('Content-Type', 'application/json')
                .send({group:{'id': _id, 'groupname': 'chaitest', 'admins':['chaiuser'], 'users':['chaiuser'], 'channels':[], 'applied':[]}})
                .end((err, res) => {
                    //console.log(res.body);
                    res.body.msg.should.be.eql("Group deleted successfully");
                    done();
                })
        })
    });
})