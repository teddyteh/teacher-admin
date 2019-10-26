const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index').app;
const server = require('../index').server;

describe('Unit testing the /suspend route', function () {

    it('Suspend should return success flag', function () {
        return request(app)
            .post('/api/suspend')
            .send({
                "teacher": "teacherken@email.com",
                "student": "student2@email.com"
            })
            .then(function (response) {
                assert.equal(response.status, 204)
            })
    });

});