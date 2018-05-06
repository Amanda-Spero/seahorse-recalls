const jwtSecret =
  process.env.tokenSecret || "f#b$ljOK!!DteUHt09%%mfE0v!%&FSXVOoFKyKTM9l";

//TODO:  modify this to use environment variables
const sql = {
  database: "project2db",
  host: "localhost",
  username: "root",
  password: "password"
};

const saltRounds = 8;

module.exports = {
  jwtSecret,
  sql,
  saltRounds
};