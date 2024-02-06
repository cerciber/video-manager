// Set import alias
require('module-alias/register');

// Add enviroment variables
require('dotenv').config();

// Start express server
require('@src/frameworks/web/express/express').listen();
