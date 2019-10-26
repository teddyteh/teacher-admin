const express = require('express')
const app = express()
var http
const serverPort = require('./config/config.js')[process.env.NODE_ENV || 'development'].serverPort
const routes = require('./routes/api')
const models = require('./models')
const errorHandler = require('./utils/error-handler')

// Parse Content-Type: application/json
app.use(express.json());

// Register routes
// Async calls handler will catch and forward errors to the global errorHandler below
app.use('/api', routes)

// Handle errors
app.use(errorHandler);

// Setup database models with associations and start the server
models.sequelize.sync().then(function () {
    http = app.listen(serverPort, () => console.log(`Teaching admin server listening on port ${serverPort}.`))

    // For unit tests
    app.emit('serverStarted');
});

module.exports = { app, http };

