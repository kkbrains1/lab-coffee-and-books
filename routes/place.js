const express = require('express');
const Place = require('./../models/place');

const placeRouter = new express.Router();



placeRouter.get('/create', (req, res, next) => {
  res.render('place/create');
});

placeRouter.post('/create', (req, res, next) => {
  const name = req.body.name;
  const type = req.body.type;
  //console.log(name, type);
  Place.create({
    name,
    type
  })
    .then(place => {
      //console.log('created in DB:', place, place._id);
      const placeId = place._id;
      res.redirect(`/place/${placeId}`);
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.get('/list', (req, res, next) => {
  Place.find()
    .then(places => {
      res.render('place/list', {places});
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.get('/:placeId', (req, res, next) => {
  const placeId = req.params.placeId;
  Place.findById(placeId)
    .then(place => {
      res.render('place/single', {place});
    })
    .catch(error => {
      next(error);
    });
});




module.exports = placeRouter;