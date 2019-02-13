const models = require('../models');

const { Rating } = models;

// eslint-disable-next-line consistent-return
const createRating = (req, res) => {
  if (!req.body.imageID || !req.body.rating) {
    return res.status(400).json({ error: 'imageID and rating parameters are required' });
  }

  const userID = req.session.account._id; // eslint-disable-line no-underscore-dangle
  const { imageID, rating } = req.body;

  const ratingDetails = { userID, imageID, rating };

  const ratingObj = new Rating.RatingModel(ratingDetails);

  const ratingPromise = ratingObj.save();

  ratingPromise.then(() => res.status(200).json({ message: 'Rating successfully saved' }));

  ratingPromise.catch(() => res.status(400).json({ error: 'Error saving rating to the database' }));
};

module.exports = {
  createRating
};
