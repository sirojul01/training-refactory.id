const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const username = "user";
const password = "user";
const dbname = "facebookauth";

mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.yhyjr.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let userSchema = mongoose.Schema({
  uid: String,
  displayName: String,
  name: String,
  email: String,
  photo: String,
});

userSchema.plugin(findOrCreate);
const User = mongoose.model("User", userSchema);

module.exports = User;
