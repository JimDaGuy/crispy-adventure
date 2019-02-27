const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let RatingModel = {};

const RatingSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account'
  },
  imageID: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// checkRating:
// - Check if the user has already rated a painting
// //////////////////////////////
RatingSchema.statics.checkRating = (account, imageID, callback) => {
  const searchParams = { userID: account._id, imageID }; // eslint-disable-line no-underscore-dangle

  return RatingModel.findOne(searchParams).exec(callback);
};

// updateRating:
// - Find rating from user with matching paintingID and set a new value to it
// //////////////////////////////
RatingSchema.statics.updateRating = (account, imageID, rating, callback) => {
  const searchParams = { userID: account._id, imageID }; // eslint-disable-line no-underscore-dangle
  const updates = { $set: { rating, timestamp: Date.now() } };

  return RatingModel.findOneAndUpdate(searchParams, updates).exec(callback);
};

// getRatings:
// - Get a user's ratings - 1-indexed pages
// //////////////////////////////
RatingSchema.statics.getRatings = (account, rpp, page, callback) => {
  const searchParams = { userID: account._id }; // eslint-disable-line no-underscore-dangle

  return RatingModel.find(searchParams)
    .sort({ timestamp: 'desc' })
    .skip(rpp * (page - 1))
    .limit(rpp)
    .exec(callback);
};

RatingModel = mongoose.model('Rating', RatingSchema);

module.exports.RatingModel = RatingModel;
module.exports.RatingSchema = RatingSchema;
