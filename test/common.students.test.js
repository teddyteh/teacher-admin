const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index').app;
const server = require('../index').server;

describe('Unit testing the /commonstudents route', function () {

    before(done => {
        app.on('serverStarted', () => {
            done();
        });
    });

    it('Common students should return success flag', function () {
        return request(app)
            .get('/api/commonstudents?teacher=teacherken@email.com')
            .then(function (response) {
                assert.equal(response.status, 200)
            })
    });

    it('Common students should return success message on valid input', function () {
        return request(app)
            .get('/api/commonstudents?teacher=teacherken@email.com')
            .then(function (response) {
                expect(response.body).to.have.property('students');
            })
    });

});
