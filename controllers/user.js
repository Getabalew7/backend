const User = require("../models/users");
const jwt= require('jsonwebtoken')
const bcrypt = require("bcrypt");
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "user added successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email}).then((user)=>{
        if(!user){
            return res.status(401).json({
                error: new Error("User Not found!")
            });
        }
        bcrypt.compare(req.body.password, user.password).then((valid)=>{
            if(!valid){
                return res.status(401).json({
                    error: new Error('Invalid Password')
                })
            }
            const token =jwt.sign({userId:user._id}, 'RANDOM_TOKEN_SECRET',{expiresIn:'24h'});
            res.status(200).json({
                userId:user._id,
                token: token
            });
        }).catch((error)=>{
            res.status(500).json({
                error:error
            });
        })
    }).catch((error)=>{
        res.status(500).json({
            error:error
        })
    })
};
