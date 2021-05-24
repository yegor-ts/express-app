const config = {
    NODE_HOST_NAME: process.env.NODE_HOST,
    NODE_PORT: process.env.NODE_PORT,

    PATH_TO_DIR: process.env.DIR_PATH,

    SECRET: process.env.SESSION_SECRET,

    URI: process.env.MONGO_URI,

    SECRET_TOKEN_KEY: process.env.ACCESS_SECRET_TOKEN
}

module.exports = config;