const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['coffee_shop', 'bookstore']
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [
      {
        type: Number,
        min: -180,
        max: 180
      }
    ]
  }
}, {
  timestamps: true
});


placeSchema.index({location: '2dsphere'});

const Place = new mongoose.model('Place', placeSchema);
module.exports = Place;
