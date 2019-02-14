const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let BookmarkModel = {};

const BookmarkSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account'
  },
  imageID: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// checkBookmark:
// - Check if the user has already bookmarked a painting
// //////////////////////////////
BookmarkSchema.statics.checkBookmark = (account, imageID, callback) => {
  const searchParams = { userID: account._id, imageID }; // eslint-disable-line no-underscore-dangle

  return BookmarkModel.findOne(searchParams).exec(callback);
};

// getBookmarks:
// - Get a user's bookmarks
// //////////////////////////////
BookmarkSchema.statics.getBookmarks = (account, limit, callback) => {
  const searchParams = { userID: account._id }; // eslint-disable-line no-underscore-dangle

  return BookmarkModel.find(searchParams)
    .sort({ timestamp: 'desc' })
    .limit(limit)
    .exec(callback);
};

// removeBookmark:
// - Delete bookmark matching user and painting id
// /////////////////////////////
BookmarkSchema.statics.removeBookmark = (account, imageID, callback) => {
  const searchParams = { userID: account._id, imageID }; // eslint-disable-line no-underscore-dangle

  return BookmarkModel.deleteMany(searchParams).exec(callback);
};

BookmarkModel = mongoose.model('Bookmark', BookmarkSchema);

module.exports.BookmarkModel = BookmarkModel;
module.exports.BookmarkSchema = BookmarkSchema;
