const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

//Load Input Validation
const validateRegisterInput = require("../validation/registration");
const validateLoginInput = require("../validation/login");

const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          try {
            newUser.password = hash;
            const hashedUser = await newUser.save();
            res.json(hashedUser);
          } catch (err) {
            throw err;
          }
        });
      });
    }
  } catch (err) {
    res.json({ msg: "error" });
  }
});

//@route GET api/users/login
//@desc Login user/ Returning JWT Token
//@access Public

router.post("/login", async (req, res) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ email: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      //User matched
      //created payload - consists of the session data
      const payload = { id: user.id, name: user.name, avatar: user.avatar }; //Create JWT payload

      //Sign Token
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 3600 },
        async (err, token) => {
          res.json({ sucess: true, token: "Bearer " + token });
        }
      );
    } else {
      return res.status(400).json({ password: "Password incorrect" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
});

//@route GET api/users/current
//@desc Return current user
//@access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;
