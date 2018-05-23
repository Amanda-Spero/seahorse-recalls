const express = require('express');
const searchController = express.Router();

const axios = require('axios');


const searchNhtsa = async (make, model, year) => {
  // const uri = `https://webapi.nhtsa.gov/api/Recalls/vehicle/`;
  const uri = 'https://one.nhtsa.gov/webapi/api/Recalls/vehicle/';
  const queryUri = uri + encodeURI(`modelyear/${year}/make/${make}/model/${model}?format=json`);
  return await axios.get(queryUri).then(result => result.data);
};

const search = (req, res, next) => {
  const year = req.params.year;
  const make = req.params.make;
  const model = req.params.model;

  searchNhtsa(make, model, year)
    .then( resp => {
      return res.json(resp);
    })
    .catch( err => {
      const httpError = createError(number, message, {
        original: err,
      });
      return next(httpError);
    })
}

searchController.get('/year/:year/make/:make/model/:model', search);

module.exports = {
  searchController,
}
