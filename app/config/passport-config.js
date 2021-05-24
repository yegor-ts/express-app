const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const RefreshSchema = require('../modules/auth/auth.schema');
const userService = require('../modules/user/user.service');
const config = require('./config');

passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser( (userId, done) => {
   userService.findUserById(userId).then( user => {
       done(null, user);
   })
       .catch( err => done(err))
});

passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            const user = await userService.createUser({
                name: req.body.name,
                email: email,
                password: password
            });
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
    )
);

passport.use('login', new LocalStrategy({
        usernameField: 'email'
    },
    async (email, password, done) => {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return done(null, false, {
                message: 'User not found'
            });
        }
        const valid = await user.validPassword(password, user.password);
        if (!valid) {
            return done(null, false, {
                message: 'Wrong password'
            });
        }
        done(null, user, {
            message: 'Logged successfully'
        });
    }
    )
);

passport.use('refresh_token', new JwtStrategy({
        secretOrKey: config.SECRET_TOKEN_KEY,
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter('refresh_token'),
        passReqToCallback: true
    }, async (req, token, done) => {
        try {
            const auth = await RefreshSchema.findOne({ userId: token.user.id });
            const user = await userService.findUserById(token.user.id);
            if (!auth) {
                const newAuth = new RefreshSchema({
                    refresh_token: jwt.sign(
                        { user: { id: user.id, email: user.email, name: user.name } },
                        config.SECRET_TOKEN_KEY),
                    access_token: jwt.sign({ id: user.id }, config.SECRET_TOKEN_KEY),
                    expires: Date.now() + 3600000,
                    userId: req.body.id
                });
                await newAuth.save();
                return done(null, { refresh: newAuth.refresh_token, access: newAuth.access_token });
            } else if (req.query.refresh_token !== auth.refresh_token)
                return done(null, false, { message: 'Invalid refresh token' });

            auth.access_token = jwt.sign({ id: user.id }, config.SECRET_TOKEN_KEY);
            auth.refresh_token = jwt.sign(
                { user: { id: user.id, email: user.email, name: user.name } },
                config.SECRET_TOKEN_KEY);
            auth.expires = Date.now() + 3600000;
            await auth.save();
            return done(null, { refresh: auth.refresh_token, access: auth.access_token });
        } catch (error) {
            done(error);
        }
    }
    )
);

passport.use('access', new JwtStrategy(
    {
        secretOrKey: config.SECRET_TOKEN_KEY,
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter('access_token'),
        passReqToCallback: true
    }, async (req, token, done) => {
        try {
            const auth = await RefreshSchema.findOne({ userId: token.id });
            if (req.query.access_token !== auth.access_token || !auth) {
                return done(null, false, { message: 'Invalid access token' });
            }
            if (Date.now() > auth.expires.getTime()) {
                return done(null, false, {message: 'Access token has expired'});
            }
            return done(null, token);
        } catch (error) {
            done(error);
            }
        }
    )
);

module.exports = passport;