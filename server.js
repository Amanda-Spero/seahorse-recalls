const express = require("express");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");


const PORT = process.env.PORT || 3000;
const SECRET = "fix me later";

//setup express app
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(function (req, res, next) {
  //should be set before setting any routes
  //checks headers for a valid token before proceding.

  if (req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'JWt') {

    const token = req.headers.authorization.split(' ')[1];
    jsonwebtoken.verify(token, SECRET, function (err, decode) {
      if (err) { req.user = undefined; }
      req.user = decode;
      next();
    })
  }
  req.user = undefined;
  next();
})


/***
 * BEGIN ROUTES
 ***/
const AuthController = require("./controllers/AuthController");
app.use("/api", AuthController);


/***
 * END ROUTES
 ***/


/***
 * BEGIN ERR HANDLING
 ***/
app.get("/", (req, res, next) => {
  res.render('index');
});





/***
 * BEGIN ERR HANDLING
 ***/
const {erorNotFound, logErrors, errorHandler} = require("./controllers/ErrorController");
app.use(erorNotFound, logErrors, errorHandler);

app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
