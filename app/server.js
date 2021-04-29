require('dotenv').config({path: '../.env'});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);


const config = require('./config/config');
const user = require('./modules/user/user.model');
const DbFileManager = require('./lib/DbFileManager');


const userRoutes = require('./routes/user');

const hostname = config.NODE_HOST_NAME;
const port = config.NODE_PORT;

const dbFileManager = new DbFileManager(config.PATH_TO_DIR, user);

app.use(bodyParser.json());

app.use('/user', userRoutes);

const init = async () => {
    await dbFileManager.init();

    server.listen(port, hostname, () => {
        console.log(`Node server running at http://${hostname}:${port}/`);
    });
}

init();