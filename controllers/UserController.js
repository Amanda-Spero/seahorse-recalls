const express = require('express');
const createError = require('http-errors');
const db = require('../models');

const router = express.Router();


router.get('/', (req, res, next) => {
  db.user.findAll({})
    .then(results => {
      const userList = results.map(item => {
        return { firstName, lastName, email } = item.dataValues;
      });

      res.render('users', {users: userList });
    });
});

module.exports = router;
