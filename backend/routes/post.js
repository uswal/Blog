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
  const newPost = new Post(req.body);
  newPost
    .save()
    .then((obj) => {
      console.log("1 Thread created!");
      res.json(obj);
    })
    .catch((err) => {
      console.log("Thread creation failed!");
      res.json(err);
    });
});

router.route("/home-contents").post((req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      // console.log(result);
      res.json(result);
    });
});

router.route("/article").post((req, res) => {
  Post.findOne({ _id: req.body.id }).then((result) => {
    res.json(result);
  });
});
module.exports = { router };
