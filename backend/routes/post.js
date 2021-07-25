const router = require("express").Router();
const mongoose = require("mongoose");
const multer = require("multer");

const postSchema = require("../schema/post.schema");
const Post = mongoose.model("Post", postSchema);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage }).array("file");

router.route("/upload-image").post((req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

router.route("/add-thread").post((req, res) => {
  //do something
  console.log(req.body);
  res.json("F");
});
module.exports = { router };
