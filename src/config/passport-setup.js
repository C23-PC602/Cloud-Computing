var passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
dotenv.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
console.log(GOOGLE_CLIENT_ID);
console.log(GOOGLE_CLIENT_SECRET);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_ID,
      callbackURL: process.env.GOOGLE_CALLBACK,
      passReqToCallback: true,
      accessType: "offline",
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log(profile);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
