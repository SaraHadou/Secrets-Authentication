//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import md5 from "md5";
import dotenv from 'dotenv';

import User from './models/User.js';

const app = express();
dotenv.config();

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ 
  extended: true 
}));

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", (req, res) => {
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
});

app.post("/login", (req, res) => {
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
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});