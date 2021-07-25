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
module.exports = { router };
