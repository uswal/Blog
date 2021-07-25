const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    author_id: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    comments: {
      type: [Object],
      default: [],
    },
    category: {
      // NEW
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = postSchema;
