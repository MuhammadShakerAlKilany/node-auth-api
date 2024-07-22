const user = require("../module/user");
const bcrypt = require('bcrypt');
module.exports = {
  login: (req, res) => {
    user
      .findOne({ email: req.body.email })
      .then(async (user) => {
        if (user) {
         const isMatch = await bcrypt.compare(req.body.password, user.password)
          if (isMatch) {
            res.send({
              success: true,
              message: "Login Success",
              user,
            });
          } else {
            res.send({
              success: false,
              message: "Login Failed",
            },400);
          }
        } else {
          res.send({
            success: false,
            message: "Login Failed",
          },400);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  },
  register: async (req, res) => {
    try { 
    const saltRounds = 10;
    const userFind = await user.findOne({ email: req.body.email });
    if (userFind) {
      res.send({
        success: false,
        message: "Email Already Exist",
      },406);
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash
    user
      .create(req.body)
      .then((user) => {
        if (!user) {
          res.send({
            success: false,
            message: "Register Failed",
          },400);
        }
        user = user.toObject();
        user.password = undefined;
        res.send({
          success: true,
          message: "Register Success",
          user,
        },201);
      })
      .catch((err) => {
        console.log("error", err);
        res.send(err,500);
      });
    } catch (error) {
      res.send(error,500);
    }
  },
};
