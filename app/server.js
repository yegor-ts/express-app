require('dotenv').config({path: '../.env'});

const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const app = express();
const server = require('http').createServer(app);

const config = require('./config/config');
require('./config/mongodb');
require('./config/passport-config');

const userRoutes = require('./modules/user/user.route');
const postRoutes = require('./modules/post/post.route');
const followerRoutes = require('./modules/follower/follower.route');
const authRoutes = require('./modules/auth/auth.route');

const hostname = config.NODE_HOST_NAME;
const port = config.NODE_PORT;

app.use(session({
    secret: config.SECRET,
    store: MongoStore.create({
        mongoUrl: config.URI,
        collectionName: 'sessions'
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', passport.authenticate('access'), userRoutes);
app.use('/post', passport.authenticate('access'), postRoutes);
app.use('/follow', passport.authenticate('access'), followerRoutes);
app.use('/auth', authRoutes);

server.listen(port, hostname, () => {
    console.log(`Node server running at http://${hostname}:${port}/`);
});