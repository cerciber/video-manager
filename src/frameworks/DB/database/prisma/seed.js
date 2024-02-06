// Set import alias
require('module-alias/register');

// Add enviroment variables
require('dotenv').config();

// Imports
const { PrismaClient } = require('@prisma/client');
const logger = require('@src/frameworks/logger/loggerCaller');
const AuthUser = require('@src/entities/videoManagerEntities/AuthUser');

const prisma = new PrismaClient();

async function main() {
  // eslint-disable-next-line no-console
  console.log(`Applying seed...`);

  await prisma.methods.createMany({
    data: [
      {
        key: '*',
      },
      {
        key: 'GET',
      },
      {
        key: 'POST',
      },
      {
        key: 'PUT',
      },
      {
        key: 'PATCH',
      },
      {
        key: 'DELETE',
      },
    ],
  });

  await prisma.pathKeys.createMany({
    data: [
      {
        key: '*',
      },
      {
        key: 'authSignIn',
      },
      {
        key: 'authSignUp',
      },
      {
        key: 'users',
      },
      {
        key: 'ownUser',
      },
      {
        key: 'videos',
      },
      {
        key: 'ownVideos',
      },
      {
        key: 'topVideos',
      },
      {
        key: 'privateVideos',
      },
      {
        key: 'likes',
      },
      {
        key: 'ownLikes',
      },
      {
        key: 'comments',
      },
      {
        key: 'ownComments',
      },
    ],
  });

  await prisma.rols.create({
    data: {
      key: 'admin',
      permissions: {
        create: [
          {
            permissionMethods: {
              create: [
                {
                  method: {
                    connect: {
                      key: '*',
                    },
                  },
                },
              ],
            },
            permissionPathKeys: {
              create: [
                {
                  pathKey: {
                    connect: {
                      key: '*',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.rols.create({
    data: {
      key: 'common',
      permissions: {
        create: [
          {
            permissionPathKeys: {
              create: [
                {
                  pathKey: {
                    connect: {
                      key: 'ownUser',
                    },
                  },
                },
              ],
            },
            permissionMethods: {
              create: [
                {
                  method: {
                    connect: {
                      key: 'GET',
                    },
                  },
                },
                {
                  method: {
                    connect: {
                      key: 'PATCH',
                    },
                  },
                },
                {
                  method: {
                    connect: {
                      key: 'DELETE',
                    },
                  },
                },
              ],
            },
          },
          {
            permissionPathKeys: {
              create: [
                {
                  pathKey: {
                    connect: {
                      key: 'videos',
                    },
                  },
                },
                {
                  pathKey: {
                    connect: {
                      key: 'topVideos',
                    },
                  },
                },
                {
                  pathKey: {
                    connect: {
                      key: 'privateVideos',
                    },
                  },
                },
              ],
            },
            permissionMethods: {
              create: [
                {
                  method: {
                    connect: {
                      key: 'GET',
                    },
                  },
                },
              ],
            },
          },
          {
            permissionPathKeys: {
              create: [
                {
                  pathKey: {
                    connect: {
                      key: 'ownVideos',
                    },
                  },
                },
                {
                  pathKey: {
                    connect: {
                      key: 'ownLikes',
                    },
                  },
                },
                {
                  pathKey: {
                    connect: {
                      key: 'ownComments',
                    },
                  },
                },
              ],
            },
            permissionMethods: {
              create: [
                {
                  method: {
                    connect: {
                      key: 'GET',
                    },
                  },
                },
                {
                  method: {
                    connect: {
                      key: 'POST',
                    },
                  },
                },
                {
                  method: {
                    connect: {
                      key: 'PATCH',
                    },
                  },
                },
                {
                  method: {
                    connect: {
                      key: 'DELETE',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  const authUser1 = new AuthUser(undefined, 'admin1', '123456789', false);
  await prisma.authUsers.create({
    data: {
      username: authUser1.username,
      password: authUser1.getPassword(),
      rol: {
        connect: {
          key: 'admin',
        },
      },
      user: {
        create: {
          name: 'Cesar',
          email: 'cesar@gmail.com',
          cellphone: '+573103458235',
        },
      },
    },
  });

  const authUser2 = new AuthUser(undefined, 'common1', '123456789', false);
  await prisma.authUsers.create({
    data: {
      username: authUser2.username,
      password: authUser2.getPassword(),
      rol: {
        connect: {
          key: 'common',
        },
      },
      user: {
        create: {
          name: 'Denis',
          email: 'denis@gmail.com',
          cellphone: '+573155348312',
          videos: {
            create: [
              {
                videoId: 1,
                title: 'Video 1',
                description: 'Description 1',
                credits: 'Credit 1, Credit 2',
                isPrivate: true,
              },
              {
                videoId: 2,
                title: 'Video 2',
                description: 'Description 2',
                credits: 'Credit 3, Credit 4',
                isPrivate: false,
              },
              {
                videoId: 3,
                title: 'Video 3',
                description: 'Description 3',
                credits: 'Credit 5, Credit 6',
                isPrivate: true,
              },
              {
                videoId: 4,
                title: 'Video 4',
                description: 'Description 4',
                credits: 'Credit 7, Credit 8',
                isPrivate: true,
              },
            ],
          },
        },
      },
    },
  });

  const authUser3 = new AuthUser(undefined, 'common2', '123456789', false);
  await prisma.authUsers.create({
    data: {
      username: authUser3.username,
      password: authUser3.getPassword(),
      rol: {
        connect: {
          key: 'common',
        },
      },
      user: {
        create: {
          name: 'Carlos',
          email: 'carlos@gmail.com',
          cellphone: '+573155435423',
          likes: {
            create: [
              {
                videoId: 1,
              },
              {
                videoId: 2,
              },
            ],
          },
        },
      },
    },
  });

  const authUser4 = new AuthUser(undefined, 'common32', '123456789', false);
  await prisma.authUsers.create({
    data: {
      username: authUser4.username,
      password: authUser4.getPassword(),
      rol: {
        connect: {
          key: 'common',
        },
      },
      user: {
        create: {
          name: 'Lucia',
          email: 'lucia@gmail.com',
          cellphone: '+573125670978',
          comments: {
            create: [
              {
                videoId: 2,
                comment: "Wow, didn't expect that! This video is a wild ride.",
              },
              {
                videoId: 3,
                comment:
                  'Random, but awesome! This video brought a smile to my face.',
              },
            ],
          },
        },
      },
    },
  });
}

main()
  .catch((error) => {
    logger.error(
      `Error on prisma seed [prisma]:seed`,
      logger.types.SYSTEM,
      'prisma',
      'seed',
      `Response: ${JSON.stringify(error.message, null, 2)}\nError: ${error.stack}`
    );
  })
  .finally(async () => {
    // eslint-disable-next-line no-console
    console.log(`Seed applied successfully.`);
    prisma.$disconnect();
  });
