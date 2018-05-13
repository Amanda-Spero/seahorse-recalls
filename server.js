const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

// setup express app
const app = express();

app.use(express.static('public'));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/* **************** REQUIRE ROUTES ********************** */
const { checkAuth } = require('./controllers/AuthController');
const { userController } = require('./controllers/UserController');
const {
  renderLandingPage,
  renderRegisterPage,
  renderLoginPage,
  renderSearchPage,
  renderAccountPage,
} = require('./controllers/HtmlController');


/*  **************** HTML ROUTES **********************
      - Add new routes here.
      - Add 'checkAuth' to a route if it should be 'secure'
    ************************************************* */
app.use('/register', renderRegisterPage);
app.use('/login', renderLoginPage);
app.use('/search', renderSearchPage);
app.use('/account', checkAuth, renderAccountPage);
app.use('/api/auth', userController);
app.use('/', renderLandingPage);


/* ************ Error Handling Middleware ************** */
const { erorNotFound, logErrors, errorHandler } = require('./controllers/ErrorController');

app.use(logErrors);
app.use(errorHandler);
app.use(erorNotFound);

const db = require('./models');

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    return console.log(`Server listening on: http://localhost: ${PORT}`);
  });
});
