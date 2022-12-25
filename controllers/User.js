import bcrypt from 'bcrypt';
const saltRounds = 10;

import User from '../models/User.js';

export const getHomePage = (req, res) => {
  res.render("home");
}

export const register = (req, res) => {
  res.render("register");
}

export const login = (req, res) => {
  res.render("login");
}

export const createUser = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newUser = new User({
      email: req.body.username,
      password: hash
    });
    newUser.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.render("secrets");
      }
    });
  });
}

export const loginUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({email: username}, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      bcrypt.compare(password, foundUser.password, function(err, result) {
        if (result) {
          res.render("secrets"); 
        } 
      });      
    }  
  })
}