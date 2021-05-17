require('dotenv').config({path: '../.env'});

const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const server = require('http').createServer(app);

const config = require('./config/config');
const User = require('./database/models').User;


const userRoutes = require('./modules/user/user.route');
const postRoutes = require('./modules/post/post.route');
const followerRoutes = require('./modules/follower/follower.route');

const hostname = config.NODE_HOST_NAME;
const port = config.NODE_PORT;

app.use(bodyParser.json());

app.use((req, res, next) => {
    User.findByPk('05b24e5c-88cb-4045-bfaf-3dc6e3c3d250')
        .then( user => {
            req.user = user;
            next();
        });
});

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/follow', followerRoutes);

server.listen(port, hostname, () => {
    console.log(`Node server running at http://${hostname}:${port}/`);
});