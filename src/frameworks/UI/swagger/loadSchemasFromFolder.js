// Imports
const fs = require('fs');
const config = require('@src/utils/statics/config');

// Load schemas from folder
function loadSchemasFromFolder(folderPath) {
  // Create object to store schemas
  const schemas = {};

  // Get absolute path from alias
  let absolutePath;
  if (config.enviroment === 'production') {
    const absoluteCurrentPathParts = __dirname.split('/src');
    const srcPath = absoluteCurrentPathParts
      .slice(0, absoluteCurrentPathParts.length - 1)
      .join('/src');
    const aliasPathCorrection = folderPath
      .replace(/@/, '/')
      .replace(/\//g, '/');
    absolutePath = srcPath + aliasPathCorrection;
  } else if (config.enviroment === 'develop') {
    const absoluteCurrentPathParts = __dirname.split('\\src');
    const srcPath = absoluteCurrentPathParts
      .slice(0, absoluteCurrentPathParts.length - 1)
      .join('\\src');
    const aliasPathCorrection = folderPath
      .replace(/@/, '\\')
      .replace(/\//g, '\\');
    absolutePath = srcPath + aliasPathCorrection;
  } else {
    throw Error('Enviroment no identified');
  }

  // Read files
  const files = fs.readdirSync(absolutePath);

  // Add schemas to object
  files.forEach((file) => {
    if (file.endsWith('.js')) {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const schema = require(`${folderPath}/${file}`);
      const schemaName = Object.keys(schema)[0];
      schemas[schemaName] = schema[schemaName];
    }
  });

  // Return schemas object
  return schemas;
}

// Load schemas from multiple folders
function loadSchemasFromFolders(folderPaths) {
  // Create an object to store schemas
  const schemas = {};

  // Iterate through each folder path
  folderPaths.forEach((folderPath) => {
    // Use the loadSchemasFromFolder function to load schemas from the current folder
    const folderSchemas = loadSchemasFromFolder(folderPath);

    // Merge the schemas from the current folder into the overall schemas object
    Object.assign(schemas, folderSchemas);
  });

  // Return the combined schemas object
  return schemas;
}

// Exports
module.exports = { loadSchemasFromFolder, loadSchemasFromFolders };
