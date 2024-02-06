// Set import alias
require('module-alias/register');

// Add enviroment variables
require('dotenv').config();

// Start express server
const express = require('@src/frameworks/web/express/express');

express.listen();
