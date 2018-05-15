
exports.erorNotFound = (req, res) => {
  const error = {
    number: 404,
    message: 'Not Found.',
  };

  res.status(404).render('error', error);
};

exports.logErrors = (err, req, res, next) => {
  const errString =
`${'*'.repeat(20)}
DATE: ${Date.now()}
URL: ${req.url}
CLIENT_ERROR: ${(typeof (err) === 'object') ? JSON.stringify(err) : err}
${'*'.repeat(20)}`;

  console.log(errString);
  next(err);
};

exports.errorHandler = (err, req, res, next) => {
  const error = {
    number: err.status || 500,
  };

  switch (error.number) {
    case 500:
      error.message = 'Internal Server Error';
      break;

    default:
      if (err.message) {
        error.message = err.message;
      } else {
        error.message = '';
      }
      break;
  }

  // set the status
  if (!res.headersSent) {
    res.status(error.number);
  }


  // If the request came in on a non-api route then send an error page.
  if (req.accepts('html') && !req.url.startsWith('/api/')) {
    return res.render('error', error);
  }

  // otherwise just send error json.
  return res.send(error);
};
