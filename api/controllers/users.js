const User = require("../models/user");
const Profile = require("../models/profile");
const bcrypt = require("bcrypt");

const create = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const username = req.body.username;

  // Hash the password
  bcrypt.genSalt(10, async function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      try {
        // Create a new user
        const user = new User({ email, username, password: hash });
        await user.save();

        // Create a profile for the user with default values
        const profile = new Profile({
          bio: "Default Bio",
          author: user._id,
          profilePictureURL: "uploads/default_profile_pic.jpg",
        });
        await profile.save();

        // Respond with success message
        console.log("User created, id:", user._id.toString());
        res
          .status(201)
          .json({ message: "User and Profile created successfully" });
      } catch (error) {
        // Handle errors
        console.error(error);
        if (error.code === 11000) {
          if (error.message.includes("username")) {
            res.status(409).json({ message: "Username already exists" });
          } else {
            res.status(409).json({ message: "Email already exists" });
          }
        } else {
          res.status(400).json({ message: "Something went wrong" });
        }
      }
    });
  });
};
// const create = async (req, res) => {
//   const email = req.body.email.toLowerCase();
//   const password = req.body.password;
//   const username = req.body.username;
//   bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash(password, salt, function (err, hash) {
//       const user = new User({ email, username, password: hash });
//       user
//         .save()
//         .then((user) => {
//           console.log("User created, id:", user._id.toString());
//           res.status(201).json({ message: "OK" });
//         })
//         .catch((err) => {
//           console.error(err);
//           console.error(err.keyPattern);
//           console.log(err.message);
//           if (err.code === 11000) {
//             if (err.message.includes("username")) {
//               res.status(409).json({ message: "Username already exists" });
//             } else {
//               res.status(409).json({ message: "Email already exists" });
//             }

//             return;
//           }
//           res.status(400).json({ message: "Something went wrong" });
//         });
//     });
//   });
// };
const UsersController = {
  create: create,
};

module.exports = UsersController;
