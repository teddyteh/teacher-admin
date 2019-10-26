const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index').app;

const server = require('../index').server;

describe('Unit testing the /retrievefornotifications route', function () {

    it('Notification should return success flag', function () {
        return request(app)
            .post('/api/retrievefornotifications')
            .send({
                "teacher": "mrtan@email.com",
                "notification": "Hello @test@test.com"
            })
            .then(function (response) {
                assert.equal(response.status, 200)
            })
    });

    it('Notification should return success message on valid input', function () {
        return request(app)
            .post('/api/retrievefornotifications')
            .send({
                "teacher": "mrtan@email.com",
                "notification": "Hello @test@test.com"
            })
            .then(function (response) {
                expect(response.body).to.have.property('recipients');
            })
    });

});