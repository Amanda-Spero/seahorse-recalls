const fs = require('fs');

function getPrivate() {
  if (process.env.privateKey) {
    return process.env.privateKey;
  }

  return fs.readFileSync('./config/devkey').toString();
}

function getPublic() {
  if (process.env.privateKey) {
    return process.env.privateKey;
  }

  return fs.readFileSync('./config/devkey.pem').toString();
}

// token Options
const tknOpt = {
  keys: {
    private: getPrivate(),
    public: getPublic(),
  },
  expireTime: 1800,
};

const hashOpt = {
  saltRounds: 8,
};

// Use environment vars first - then use dev vars
const sql = {
  database: process.env.database || 'project2db',
  host: process.env.host || 'localhost',
  username: process.env.username || 'root',
  password: process.env.password || process.env.MYSQL_PWD,
};


const sendgrid = process.env.SENDGRID_API_KEY;

module.exports = {
  sql,
  tknOpt,
  hashOpt,
  sendgrid,
};
