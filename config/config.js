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

// TODO:  modify this to use environment variables
const sql = {
  database: process.env.database || 'project2db',
  host: process.env.host || 'localhost',
  username: process.env.username || 'root',
  password: process.env.password || 'password',
};


module.exports = {
  sql,
  tknOpt,
  hashOpt,
};
