const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index').app;
const server = require('../index').server;

describe('Unit testing the /register route', function () {

    it('Register should return success status', function () {
        return request(app)
            .post('/api/register')
            .send({
                "teacher": "teacherken@email.com",
                "students": [
                    "student1@email.com",
                    "student2@email.com"
                ]
            })
            .then(function (response) {
                assert.equal(response.status, 204)
            })
    });

});