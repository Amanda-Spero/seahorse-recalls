const express = require("express");
const router = express.Router();

const User = require("../models/User");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { jwtSecret, saltRounds } = require('../config/config');



function register(req, res, next) {

  if (!req.body.email) {
    const error = {
      number: 400,
      message: "Email Required"
    };

    return next(error);
  }

  if (!req.body.password) {
    const error = {
      number: 400,
      message: "Password Required"
    };

    return next(error);
  }


  User.findOne({ where: { email: req.body.email.toString() } })
    .then(user => {
      console.log(user);
      if (user) {

        const error = {
          number: 400,
          message: "Username already exists."
        }

        return next(error);
      }
      console.log('hi');
      res.end();
    });

  // bcrypt.hash(req.body.password, saltRounds)
  //   .then( hash => {

  //     res.end();
  //   });

}


router.post("/register", register);

module.exports = router;