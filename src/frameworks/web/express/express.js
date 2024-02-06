// Imports
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const config = require('@src/utils/statics/config');
const paths = require('@src/utils/statics/paths');
const swagger = require('@src/frameworks/UI/swagger/swagger');
const logger = require('@src/frameworks/logger/loggerCaller');
const rootRoute = require('./routes/rootRoute');
const errorMiddleware = require('./middelwares/errorMiddleware');
const pathNoFoundMiddleware = require('./middelwares/pathNoFoundMiddleware');

// Instance express app
const app = express();

// Middlewares standard
app.use(express.json()); // Format Json Data
app.use(cors()); // Allow comunication of all origins
app.use(express.static('public')); // Allow static files on public (For Swagger)

// Use routes
app.use(paths.apiDocs.path, swagger.serve, swagger.UISetup); // Use Swagger UI
app.use(paths.root.path, rootRoute.router); // Use API Routes

// Manage no existing paths
app.use(pathNoFoundMiddleware);

// Manage errors
app.use(errorMiddleware);

// Listen
let server;
const listen = () => {
  server = app.listen(config.frameworks.web.express.port, () => {
    const message = `Server running.`;
    const content = `URL: ${config.frameworks.web.express.url}.\nEnviroment: ${config.enviroment}.`;
    logger.info(message, logger.types.SYSTEM, 'express', 'runServer', content);
  });
};

// close
const close = () => {
  server.close();
};

// Exports
module.exports = { express: app, listen, close };
