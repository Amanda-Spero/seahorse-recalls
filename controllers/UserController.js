const express = require('express');
const createError = require('http-errors');
const {
  getToken,
  setAuthCookie,
  hashValue,
  compareToHash,
} = require('./AuthController');
const db = require('../models');
const { sendWelcome } = require('./NotificationController');

const userController = express.Router();

function userFieldsValid(body) {
  if (!body.email) {
    return createError(400, 'Email is required');
  }

  if (!body.password) {
    return createError(400, 'Password is required');
  }

  return undefined;
}


function nameFieldsValid(body) {
  if (!body.firstName) {
    return createError(400, 'firstName is required');
  }

  if (!body.lastName) {
    return createError(400, 'lastName is required');
  }

  return undefined;
}


function register(req, res, next) {
  const validationError = userFieldsValid(req.body);
  if (validationError) {
    next(validationError);
  }

  const nameValidationError = nameFieldsValid(req.body);
  if (nameValidationError) {
    next(nameValidationError);
  }

  // Check if user exists.  Create it if it does not.
  db.user.findOne({ where: { email: req.body.email.toString() } })
    .then((user) => {
      if (user) {
        return next(createError(409, 'User already exists.'));
      }
      hashValue(req.body.password.toString())
        .then((hash) => {
          db.user.create({
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            enableNotification: req.body.enableNotification,
          })
            .then((result) => {
              const token = getToken(result.globalUserId, result.firstName);

              // return res.cookie('seahorse', token, cookieOptions)
              setAuthCookie(res, token);

              sendWelcome(req.body.email, req.body.firstName);

              return res.status(200)
                .json({ auth: true, token });
            })
            .catch((err) => {
              let number = 500;
              let message = 'Internal Server Error';

              if (err.name && err.name === 'SequelizeValidationError') {
                number = 400;
                message = 'Invalid user data.';
              }

              const httpError = createError(number, message, {
                original: err,
              });

              return next(httpError);
            });
        });

      return undefined;
    });

  return undefined;
}

function login(req, res, next) {
  const validationError = userFieldsValid(req.body);
  if (validationError) {
    return next(validationError);
  }

  const reqEmail = req.body.email;
  const reqPassword = req.body.password;

  const search = {
    where: {
      email: reqEmail.toString(),
    },
  };

  return db.user.findOne(search)
    .then((user) => {
      if (!user) {
        const httpError = createError(401);
        return next(httpError);
      }
      const { globalUserId, password, firstName } = user.dataValues;

      compareToHash(reqPassword, password)
        .then((matched) => {
          if (!matched) {
            return next({ number: 401, message: 'Not Authorized' });
          }

          const token = getToken(globalUserId, firstName);
          setAuthCookie(res, token);
          return res.status(200)
            .json({ auth: true, token, firstName });
        })
        .catch((err) => {
          const httpError = createError(500, 'Internal System Error', {
            original: err,
          });

          next(httpError);
        });
    })
    .catch(err => {
      return next(createError(500, 'Internal Server Error', {original: err,}))
    });
}

userController.post('/register', register);
userController.post('/login', login);

module.exports = {
  userController,
};
