const mongoose = require("mongoose");

const CommentsSchema = mongoose.Schema({
    {
      user: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
});
module.exports = mongoose.model("comments", PostsSchema, "comments");
