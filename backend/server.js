const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();
const port = 5555;

//Middeware
app.use(cors());
app.use(express.json());

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const account = require("./routes/account");
app.use("/account", account.router);

const post = require("./routes/post");
app.use("/post", post.router);

app.use("/get-image", express.static("images"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
