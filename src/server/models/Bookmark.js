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
// - Get a user's bookmarks - pages are 1-indexed
// //////////////////////////////
BookmarkSchema.statics.getBookmarks = (account, rpp, page, callback) => {
  const searchParams = { userID: account._id }; // eslint-disable-line no-underscore-dangle
  const rppNum = parseInt(rpp, 10);
  const pageNum = parseInt(page, 10);

  return BookmarkModel.find(searchParams)
    .sort({ timestamp: 'desc' })
    .skip(rppNum * (pageNum - 1))
    .limit(rppNum)
    .exec(callback);
};

// getBookmarksCount:
// - Get count of a user's bookmarks
// //////////////////////////////
BookmarkSchema.statics.getBookmarksCount = (account, callback) => {
  const searchParams = { userID: account._id }; // eslint-disable-line no-underscore-dangle

  return BookmarkModel.find(searchParams)
    .count()
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
