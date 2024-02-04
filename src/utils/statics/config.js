module.exports = {
  enviroment: process.env.ENV || 'develop',
  frameworks: {
    web: {
      express: {
        url: process.env.EXPRESS_URL || '',
        port: Number(process.env.EXPRESS_PORT) || 3000,
      },
    },
    logger: {
      winston: {
        maxBitsPerFile:
          Number(process.env.WINSTON_MAX_BITS_PER_FILE) || 5120000,
        maxFiles: Number(process.env.WINSTON_MAX_FILES) || 5,
      },
    },
    db: {
      databaseUrl: process.env.DATABASE_URL || '',
    },
  },
  application: {
    jwtSectetKey: process.env.JWT_SECRET_KEY || 'SECRET_KEY',
    jwtDuration: process.env.JWT_DURATION || '1h',
  },
  entities: {
    passwordEncryptSaltRounds:
      Number(process.env.PASSWORD_ENCRYPT_SALT_ROUNDS) || 10,
  },
};
