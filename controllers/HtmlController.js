/*  HELPER FUNCTIONS FOR HTML ROUTES  */

function username(req) {
  if (req.userInfo && req.userInfo.name) {
    return req.userInfo.name;
  }
}

exports.renderLandingPage = (req, res, next) => {
  const renderArgs = {
    username: username(req),
    landingPage: true,
    styleHomeNav: 'active',
  };

  return res.render('index', { renderArgs });
};


exports.renderLoginPage = (req, res, next) => {
  const renderArgs = {
    username: username(req),
    loginPage: true,
    styleLoginNav: 'active',
    hideLogin: true,
  };
  return res.render('login', { renderArgs });
};


exports.renderSearchPage = (req, res, next) => {
  const renderArgs = {
    username: username(req),
    styleSearchNav: 'active',
  };
  return res.render('search', { renderArgs });
};


exports.renderAccountPage = (req, res, next) => {
  const renderArgs = {
    username: username(req),
    styleAccountNav: 'active',
  };
  return res.render('account', { renderArgs });
};
