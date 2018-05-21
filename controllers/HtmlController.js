/*  HELPER FUNCTIONS FOR HTML ROUTES  */

exports.renderLandingPage = (req, res, next) => {
  const renderArgs = {
    authenticated: req.userInfo,
    landingPage: true,
    styleHomeNav: 'active',
  };

  return res.render('index', {renderArgs});
};


exports.renderLoginPage = (req, res, next) => {
  const renderArgs = {
    authenticated: req.userInfo,
    loginPage: true,
    styleLoginNav: 'active',
    hideLogin: true,
  };
  return res.render('login', { renderArgs });
};


exports.renderSearchPage = (req, res, next) => {
  const renderArgs = {
    authenticated: req.userInfo,
    styleSearchNav: 'active',
  };
  return res.render('search', { renderArgs });
};


exports.renderAccountPage = (req, res, next) => {
  const renderArgs = {
    authenticated: req.userInfo,
    styleAccountNav: 'active',
  };
  return res.render('account', { renderArgs });
};
