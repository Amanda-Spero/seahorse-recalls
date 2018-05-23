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
   where: { globalUserId: globalId },
   include: [db.savedSearches],
  
  }).then(account => {
      console.log(account);
        // projects will be an array of Project instances with the specified name
      })

return res.end();
}

accountController.get('/', function(req,res){
  searches.all(function(searches_data){
    console.log(searches_data);
    res.render('index');
  })
})

accountController.post("/saveSearch", function(req, res) {
  User.findOne({
    where: { globalUserId: req.userInfo.id },
   
   }).then(account => {
       console.log(account);
       const userId = account.id
       console.log(req.body);
       db.SavedSearch.create({
       userId: userId,
       make: req.body.make,
       model: req.body.model,
       year: req.body.year,
     })
       .then(function(dbPost) {
         res.json(dbPost);
       });// projects will be an array of Project instances with the specified name
       })
});


// post route -> back to index
accountController.post("/", function(req, res) {
  searches.create(req.body.id, function(result) {
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

// put route -> back to index
accountController.put("/models/:id", function(req, res) {
  accounts.update(req.params.id, function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.sendStatus(200);
  });
});


module.exports = {
  accountController
};
