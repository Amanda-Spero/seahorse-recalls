const express = require('express');

const router = express.Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { tknOpt, hashOpt } = require('../config/config');

function getToken(userId) {
  const payload = {
    id: userId,
  };

  const options = {
    algorithm: 'RS512',
    expiresIn: tknOpt.expireTime,
  };

  return jwt.sign(payload, tknOpt.keys.private, options);
}

function register(req, res, next) {
  if (!req.body.email) {
    const error = {
      number: 400,
      message: 'Email Required',
    };

    return next(error);
  }

  if (!req.body.password) {
    const error = {
      number: 400,
      message: 'Password Required',
    };

    return next(error);
  }

  // Check if user exists.  Create it if it does not.
  User.findOne({ where: { email: req.body.email.toString() } })
    .then((user) => {
      if (user) {
        const error = {
          number: 400,
          message: 'Username already exists.',
        };
        return next(error);
      }

      bcrypt.hash(req.body.password, hashOpt.saltRounds)
        .then((hash) => {
          User.create({ email: req.body.email, password: hash })
            .then((result) => {
              const token = getToken(result.id);
              return res.status(200).json({ auth: true, token });
            })
            .catch((err) => {
              let number = 500;
              let message = 'Internal Server Error';

              if (err.name && err.name === 'SequelizeValidationError') {
                number = 400;
                message = 'Invalid user data.';
              }

              return next({ number, message });
            });
        });

      return undefined;
    });

  return undefined;
}


router.post('/register', register);

module.exports = router;
