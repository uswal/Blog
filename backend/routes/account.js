const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const accountSchema = require("../schema/account.schema");
const Account = mongoose.model("Account", accountSchema);

router.route("/signup").post((req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10); //Hashing password
  const newAccount = new Account(req.body);
  newAccount
    .save()
    .then((obj) => {
      res.json({ success: true, obj });
    })
    .catch((err) => {
      var obj = { success: false, type: "", message: "" };
      if (err.keyPattern.username !== undefined) {
        obj.type = "USERNAME";
        obj.message = "Username already exist!";
      }
      if (err.keyPattern.email !== undefined) {
        obj.type = "EMAIL";
        obj.message = "Email already exist!";
      }
      res.json(obj);
    });
});

router.route("/login").post((req, res) => {
  Account.findOne({ username: req.body.username }, function (err, result) {
    if (result === null) res.json({ status: "NOT_FOUND" });
    else {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        res.json({
          status: "SUCCESS",
          id: result._id,
          name: result.name,
          email: result.email,
          username: result.username,
          contact: result.contact,
          since: result.createdAt,
          type: result.type,
        });
      } else res.json({ status: "WRONG_PASSWORD" });
    }
  });
});

router.route("/reset-pass").post((req, res) => {
  Account.findOne({ email: req.body.email }).then((data) => {
    if (data.contact === req.body.contact) {
      const pwd = bcrypt.hashSync(req.body.pass, 10);
      data.password = pwd;
      data.markModified("password");
      data.save();
      res.json({ status: true });
    } else res.json({ status: false });
  });
});

router.route("/update-pass").post((req, res) => {
  Account.findOne({ _id: req.body._id }).then((data) => {
    if (bcrypt.compareSync(req.body.oldPass, data.password)) {
      const pwd = bcrypt.hashSync(req.body.newPass, 10);
      data.password = pwd;
      data.markModified("password");
      data.save();
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  });
});
module.exports = { router };
