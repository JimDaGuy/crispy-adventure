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

// getRatings:
// - Get a user's ratings
// //////////////////////////////
RatingSchema.statics.getRatings = (account, limit, callback) => {
  const searchParams = { _id: account._id }; // eslint-disable-line no-underscore-dangle

  return RatingModel.find(searchParams)
    .limit(limit)
    .exec(callback);
};

RatingModel = mongoose.model('Rating', RatingSchema);

module.exports.RatingModel = RatingModel;
module.exports.RatingSchema = RatingSchema;
