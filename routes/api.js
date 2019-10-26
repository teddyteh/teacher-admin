var express = require('express')
var router = express.Router()

var asyncHandler = require('../utils/async-handler');
var register = require('./register');
var common = require('./common');
var suspend = require('./suspend');
var notification = require('./notification');

router.post('/register', asyncHandler(register));

router.get('/commonstudents', asyncHandler(common));

router.post('/suspend', asyncHandler(suspend));

router.post('/retrievefornotifications', asyncHandler(notification));

module.exports = router