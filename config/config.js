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
  database: 'project2db',
  host: 'localhost',
  username: 'root',
  password: 'password',
};


module.exports = {
  sql,
  tknOpt,
  hashOpt,
};
