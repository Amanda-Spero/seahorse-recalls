const express = require("express");
const router = express.Router();

exports.erorNotFound = function (req, res, next) {
  const error = {
    number: 404,
    message: "Not Found."
  };

  res.status(404).render('error', error);
}

exports.logErrors = function (err, req, res, next) {
  const errString = `\n` + "*".repeat(20) + `\n` +
    `DATE: ${Date.now()}\n` +
    `URL: ${req.url}\n` +
    `ERROR: ${(typeof (err) === "object")
      ? JSON.stringify(err, null, 2)
      : err}\n` +
    "*".repeat(20);


  console.log(errString);
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
      if (err.message) {
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


  //If the request came in on a non-api route then send an error page.
  if (req.accepts('html') && !req.url.startsWith("/api/")) {
    return res.render('error', error);
  }

  //otherwise just send error json.
  return res.send(error);
}

