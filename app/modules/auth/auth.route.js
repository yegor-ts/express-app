const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../../config/config');

const router = express.Router();

router.post('/', async (req, res, next) => {
    passport.authenticate('refresh_token', { session: false }, (err, data, info) => {
        if (data) {
            return res.json(data);
        } else if (info && info.message) {
            return res.json(info.message);
        } else {
            return res.json(info);
        }
    })(req, res, next)
});

router.get('/', async (req, res, next) => {
   passport.authenticate('access', { session: false }, (err, data, info) => {
      if(data) {
          return res.json(data);
      } else if(info.message) {
          return res.json(info.message)
      } else {
          return res.json(info.toString())
      }
   })(req, res, next)
});

router.post('/login', async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user)
                        return next(new Error('An error occurred.'));
                    req.login(user, { session: false }, async error => {
                            if (error) return next(error);
                            const body = { id: user.id, email: user.email, name: user.name };
                            const token = jwt.sign({ user: body }, config.SECRET_TOKEN_KEY);
                            return res.json({ token });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

router.post('/signup', passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
);

module.exports = router;