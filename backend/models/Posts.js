const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostsSchema = mongoose.Schema({
user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
  title: {
    type: String,
    required: true,
  },
  content: [
    {
      type: {
        type: String,
        required: true,
      },
        object: {
        type: Object,
        },
    }
  ],
  category: {
      type: String,
      required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("posts", PostsSchema, "posts");
