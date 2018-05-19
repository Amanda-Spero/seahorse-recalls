//need to pull in express
const express = require('express');

const accountController = express.Router();

//for creating http errors easily
const createError = require('http-errors');

//db reference
const db = require('../models');

// READ:  Users & SavedSearches
const getAccountInfo = (req, res, next) => {
  // retrieve the user & saved searches
  const globalId = req.userInfo.id;
  // not an integer, its actally a UUID (globalUserId)

  const User = db.user;
  User.findOne({
    where: { globalUserId: globalId },
    include: [db.savedSearches],
  })
  .then(account => {
    console.log(account);
  })

  return res.end();

};

// CREATE:  Saved Search


// UPDATE:  Saved Search


accountController.get('/', getAccountInfo);

module.exports = {
  accountController,
};
