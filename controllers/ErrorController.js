const express = require("express");
const router = express.Router();

exports.erorNotFound = function (req, res, next) {
  const error = {
    number: 404,
    message: "Not Found."
  };
  res.render('error', error);
}

exports.logErrors = function (err, req, res, next) {
  //TODO:  Add some logging
  console.error(Date.now().toString() + " - ", err);
  next(err)
}

exports.errorHandler = function (err, req, res, next) {
  const error = {
    number: err.number || 500
  };

  switch (error.number) {
    case 500:
      error.message = "Internal Server Error";
      break;

    default:
      if(err.message){
        error.message = err.message
      } else {
        error.message = ""
      }
      break;
  }

  //set the status
  if (!res.headersSent) {
    res.status(error.number);
  }

  //Check to see if the request can handle an HTML response.

  //If it can then we will render an error page.
  if (req.accepts('html')) {
    return res.render('error', error);
  }

  //If it can't then we will check if it can handle JSON
  if (req.accepts('json')) {
    res.send(error);
  }

  //If it can't accept those - we'll just send text.
  res.send( error.message );

}

