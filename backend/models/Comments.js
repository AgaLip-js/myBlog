const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../util/autopopulate");

const CommentsSchema = Schema({
   user: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  updateDate: {
    type: Date,
    default: Date.now
  },
  commentText: {
    type: String,
    required: true
  },
  reactions: [
    {
      name: {
        type: String,
        required: false,
      },
      count: {
        type: Number,
        required: false,
      }
    }
  ],
  comments: [
    {type : Schema.Types.ObjectId, ref : 'comments'}
  ],
  parentPost: {type : Schema.Types.ObjectId, ref : 'posts'}
});

CommentsSchema.pre('find', Populate('comments'))
.pre('findOne', Populate('comments'));

module.exports = mongoose.model("comments", CommentsSchema, "comments");
