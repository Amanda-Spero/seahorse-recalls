const express = require('express');
const accountController = express.Router();
// for creating http errors easily
const createError = require('http-errors');
const db = require('../models');
const searches = db.savedSearch;

const getAccountInfo = (req, res, next) => {
  const globalId = req.userInfo.id; // not an integer,

  const User = db.user;
  User.findOne({
    where: {
      globalUserId: globalId
    },
    include: [db.savedSearches],

  }).then(account => {
    console.log(account);
    // projects will be an array of Project instances with the specified name
  })

  return res.end();
}

//post route for saving a new post

accountController.post("/saveSearch", function (req, res) {
  const User = db.user;
  User.findOne({
      where: {
        globalUserId: req.userInfo.id
      },

    }).then(account => {
      // console.log(account);
      const userId = account.id
      // console.log(req.body);
      db.savedSearch.create({
          userId: userId,
          make: req.body.make,
          model: req.body.model,
          year: req.body.year,
        })
        .then(function (dbPost) {
          res.json(dbPost);
        }); // projects will be an array of Project instances with the specified name
    })
    .catch(err => {
      return next(createError(500, 'Internal Server Error', {
        original: err,
      }))
    })
});

// PUT route for updating posts
accountController.put("/api/accounts", function (req, res, next) {
  db.Post.update(req.body, userId, {
      where: {
        id: req.body.userId
      }
    })
    .then(function (dbPost) {
      res.json(dbPost);
    });
});

// post route -> back to index
accountController.post("/models", function (req, res, next) {
  searches.create(req.body.userId, function (result) {
    // render back to index with handle
    console.log(result);
    res.redirect("/");

  });
});

// put route -> back to index
accountController.put("/models/:userId", function (req, res, next) {
  accounts.update(req.body.userId, function (result) {

    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.sendStatus(200);
  });
});

// DELETE route for deleting posts
accountController.delete("/savedSearch/:id", function (req, res, next) {
  db.savedSearch.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (dbPost) {
      res.json(dbPost);
    });
});





module.exports = {
  accountController
};
