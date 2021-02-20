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
  mainPhoto : [
    {
      title: {
        type: String,
        required: true,
      },
        id: {
          type: String,
        },
    }
  ],
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
  section: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("posts", PostsSchema, "posts");
