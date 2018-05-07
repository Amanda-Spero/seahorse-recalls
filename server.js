const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

// setup express app
const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Authorization
const { checkAuth, register } = require('./controllers/AuthController');

app.use('/api/auth', register);


app.get('/', checkAuth, (req, res) => {
  res.render('index');
});


const { erorNotFound, logErrors, errorHandler } = require('./controllers/ErrorController');

app.use(erorNotFound, logErrors, errorHandler);

app.listen(PORT, () => {
  return console.log(`Server listening on: http://localhost: ${PORT}`);
});
