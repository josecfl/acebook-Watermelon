const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const ProfileSchema = new mongoose.Schema({
  bio: String,
  profilePictureURL: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Profile = mongoose.model("Profile", ProfileSchema);

// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
// const dateTimeString = new Date().toLocaleString("en-GB");
// new Post({ message: `Test message, created at ${dateTimeString}` }).save();

module.exports = Profile;