exports.logErrors = function (err, req, res, next) {
  console.log("I am here:  logErrors");
  console.error(err.stack)
  next(err)
}

exports.errorHandler = function (err, req, res, next) {
  //Default Error Handling
  console.log("I am here:  errorHandler");


  console.log("headers send?", res.headersSent);

  if (!res.headersSent) {
    res.status(500)
  }

  console.log("Accepts html?", req.accepts('html'));
  console.log("Accepts json?", req.accepts('json'));

  //Render the error page
  if (req.accepts('html')) {
    res.render('error', { error: "Something bad happened" });
    return;
  }

  //Send a payload w/ an error message
  if (req.accepts('json')) {
    res.send({ error: "Something bad happened" });
    return;
  }

}