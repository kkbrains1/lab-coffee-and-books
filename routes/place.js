const express = require('express');
const Place = require('./../models/place');

const placeRouter = new express.Router();



placeRouter.get('/create', (req, res, next) => {
  res.render('place/create');
});

placeRouter.post('/create', (req, res, next) => {
  const name = req.body.name;
  const type = req.body.type;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  //console.log(name, type);
  Place.create({
    name,
    type,
    location: {
      coordinates: [longitude, latitude]
    }
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

placeRouter.get('/:placeId/edit', (req, res, next) => {
  const placeId = req.params.placeId;
  //console.log(placeId);
  res.render('place/edit');
});

placeRouter.get('/:placeId/delete', (req, res, next) => {
  res.render('place/delete');
});

module.exports = placeRouter;