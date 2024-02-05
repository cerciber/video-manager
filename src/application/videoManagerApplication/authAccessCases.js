// Imports
const response = require('@src/adapters/presenters/response');
const Auth = require('@src/entities/videoManagerEntities/Auth');
const paths = require('@src/utils/statics/paths');
const gateway = require('@src/adapters/gateways/dbGateway/dbGateway');

// Define tables names
const AUTH_USERS_TABLE = 'authUsers';

// Check if permissions are valid to path and method
function validatePermissions(basePath, method, permissions) {
  // Check if data have correct structure
  if (
    typeof basePath !== 'string' ||
    typeof method !== 'string' ||
    !Array.isArray(permissions)
  ) {
    return false;
  }

  // Get path key
  const foundKey = Object.keys(paths).find(
    (key) => paths[key]?.path === basePath
  );

  // Check if path not exist
  if (!foundKey) {
    return false;
  }

  // Check if path and method are valid on permissions
  const valid = permissions.some(
    (permission) =>
      Array.isArray(permission.pathKeys) &&
      (permission.pathKeys.includes('*') ||
        permission.pathKeys.includes(foundKey)) &&
      Array.isArray(permission.methods) &&
      (permission.methods.includes('*') || permission.methods.includes(method))
  );

  // Return if is valid
  return valid;
}

// validate Public path case
async function getPathDataCase(path) {
  // get key form path
  const foundKey = Object.keys(paths).find((key) => paths[key]?.path === path);

  // Check if path not exist
  if (!foundKey) {
    // Return response
    return response.success(404, 'This path not exist.', {});
  }

  // Check if path is private
  if (!paths[foundKey].public) {
    // Return response
    return response.success(401, 'This path is private.', {});
  }

  // Return response
  return response.success(200, 'This path is public.', {});
}

// validate Access Case
async function validateAccessCase(basePath, method, token) {
  // Decode token
  const payload = new Auth().decodeToken(token);

  // Check if token not was decoded
  if (!payload) {
    // Return response
    return response.success(
      401,
      'Access to this resource not allowed. Bad token.',
      {}
    );
  }

  // Check if token have id
  if (!payload.authUserId) {
    // Return response
    return response.success(
      401,
      'Access to this resource not allowed. Token payload id no exist',
      {}
    );
  }

  // Get gateway data
  const gatewayUserAuth = await gateway.loadMany(AUTH_USERS_TABLE, {
    where: {
      authUserId: payload.authUserId,
    },
    include: {
      rol: {
        include: {
          permissions: {
            include: {
              permissionMethods: {
                include: {
                  method: true,
                },
              },
              permissionPathKeys: {
                include: {
                  pathKey: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // Check if user was found
  if (!gatewayUserAuth || gatewayUserAuth.length === 0) {
    // Return response
    return response.success(
      401,
      'Access to this resource not allowed. Auth user not exist.',
      {}
    );
  }

  // Get authorization
  const { rol } = gatewayUserAuth[0];

  // Check if user has authorization configuration
  if (!rol) {
    // Return response
    return response.success(
      401,
      'Access to this resource not allowed. Bad authorization configuration structure.',
      {}
    );
  }

  // Get permisions
  const { permissions } = rol;

  // Format permissions
  const formatPermissions = permissions.map((permission) => ({
    pathKeys: permission.permissionPathKeys.map(
      (permissionPathKey) => permissionPathKey.pathKey.key
    ),
    methods: permission.permissionMethods.map(
      (permissionMethod) => permissionMethod.method.key
    ),
  }));

  // Check if user have authorization to this request
  if (!validatePermissions(basePath, method, formatPermissions)) {
    // Return response
    return response.success(
      401,
      `Access to this resource not allowed. No permissions to [${method}]:${basePath}.`,
      {}
    );
  }

  // Return response
  return response.success(200, 'Access to this resource allowed.', {
    tokenPayload: payload,
  });
}

// Exports
module.exports = {
  validateAccessCase,
  getPathDataCase,
};
