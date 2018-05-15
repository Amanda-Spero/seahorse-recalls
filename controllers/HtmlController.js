/*  HELPER FUNCTIONS FOR HTML ROUTES  */

exports.renderLandingPage = (req, res, next) => {
  const renderArgs = {
    authenticated: req.userInfo,
    landingPage: true,
  };

  return res.render('index', { renderArgs });
};


exports.renderLoginPage = (req, res, next) => {
  const renderArgs = {
    authenticated: req.userInfo,
    loginPage: true,
    hideLogin: true,
  };
  return res.render('login', { renderArgs });
};


exports.renderSearchPage = (req, res, next) => {
  return res.render('search');
};


exports.renderAccountPage = (req, res, next) => {
  return res.render('account');
};
