const db = require('../models');


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

  return res.render('index', {
    renderArgs
  });
};


exports.renderLoginPage = (req, res, next) => {
  const renderArgs = {
    username: username(req),
    loginPage: true,
    styleLoginNav: 'active',
    hideLogin: true,
  };
  return res.render('login', {
    renderArgs
  });
};


exports.renderSearchPage = (req, res, next) => {
  const renderArgs = {
    username: username(req),
    styleSearchNav: 'active',
  };
  return res.render('search', {
    renderArgs
  });
};

const getAccountRenderArgs = async (globalUserId, username) => {
  const user = await db.user.findOne({
    where: {
      globalUserId
    },
  }).then(user => user);

  const searches = await db.savedSearch.findAll({
    where: {
      userId: user.id,
    },
  }).then(data => data);

  const renderArgs = {
    username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    styleAccountNav: 'active',
    accountPage: true,
    searches,
  };

  return renderArgs;
};

exports.renderAccountPage = (req, res, next) => {
  getAccountRenderArgs(req.userInfo.id, username(req))
    .then(renderArgs => {
      return res.render('account', {
        renderArgs
      });
    })
    .catch(err => {
      return next(createError(500, 'Internal Server Error', {
        original: err,
      }))
    })
};

//////////////??ADD RENDER FOR RECALL PAGE??//////////////////////
exports.renderRecallPage = (req, res, next) => {
  return res.render('recall');
};
/////////////////////////////////////////////////////////////