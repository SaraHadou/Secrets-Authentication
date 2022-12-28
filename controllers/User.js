import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../models/User.js';

dotenv.config();

passport.use(User.createStrategy());

passport.serializeUser(function(User, done) {
  done(null, User.id); 
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, User) {
    done(err, User);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

export const getHomePage = (req, res) => {
  res.render("home");
};

export const authGoogle = passport.authenticate("google", { scope: ['profile'] });

export const authGoogleFailure = passport.authenticate('google', { failureRedirect: "/login" });
export const authGoogleGetSecrets =  (req, res) => {
  res.redirect('/secrets');
};

export const register = (req, res) => {
  res.render("register");
};

export const login = (req, res) => {
  res.render("login");
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
};

export const getSecrets = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect('/login');
  }
};

export const createUser = (req, res) => {
  User.register({ username: req.body.username }, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect('/register');
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
  });
};

export const loginUser = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, (err) => {
    if (err) { 
      console.log(err); 
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
  });
};