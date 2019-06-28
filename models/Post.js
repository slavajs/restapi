const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  mainText: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  photos: [
    {
      type: String,
      required: false
    }
  ],
  isPrivate: {
    type: Boolean,
    required: false,
    default: false
  }
});

module.exports = mongoose.model("Post", postSchema);
