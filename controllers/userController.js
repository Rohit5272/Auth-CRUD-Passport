const User = require('../models/user')

// Register User
exports.register = (req,res) => {
    const newUser = new User({
      name: req.body.name,
    });
    newUser.password = newUser.generateHash(req.body.password);
    newUser.save().then((data) => res.status(201).json(data));
};

// LoginUser
exports.login = (req,res) => {
    User.findOne({ name: req.body.name }).then((loginUser) => {
      if (!loginUser) {
        return res.status(401).json({ message: "Invalid username & password" });
      }
      if (!loginUser.validatePassword(req.body.password)) {
        return res.status(401).json({ message: "Invalid Username & password" });
      }
      const withToken = { name: loginUser.name, _id: loginUser._id };
      withToken.token = loginUser.generateJWT();
      res.status(200).json(withToken);
    });
} 