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

// Authorization
// TODO: return here and add the 'checkAuth' to restricted routes
const { checkAuth, register } = require('./controllers/AuthController');

app.use('/api/auth', register);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/test', checkAuth, (req, res) => {
  res.render('index', { name: req.userInfo.name });
});

const { erorNotFound, logErrors, errorHandler } = require('./controllers/ErrorController');

app.use(logErrors);
app.use(errorHandler);
app.use(erorNotFound);

app.listen(PORT, () => {
  return console.log(`Server listening on: http://localhost: ${PORT}`);
});
