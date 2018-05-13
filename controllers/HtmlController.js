/*  HELPER FUNCTIONS FOR HTML ROUTES  */

exports.renderLandingPage = (req, res, next) => {
  return res.render('index');
};


exports.renderRegisterPage = (req, res, next) => {
  return res.render('register');
};


exports.renderLoginPage = (req, res, next) => {
  return res.render('login');
};


exports.renderSearchPage = (req, res, next) => {
  return res.render('search');
};


exports.renderAccountPage = (req, res, next) => {
  return res.render('account');
};
