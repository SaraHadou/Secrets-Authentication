import md5 from "md5";

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
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password)
  });
  newUser.save((error) => {
    if (error) {
      console.log(error);
    } else {
      res.render("secrets");
    }
  }) 
}

export const loginUser = (req, res) => {
  const username = req.body.username;
  const password = md5(req.body.password);
  User.findOne({email: username}, (error, foundUser) => {
    if (error) {
      console.log(error);
    } else {
      if (foundUser.password === password) {
        res.render("secrets"); 
      }     
    }
  })
}