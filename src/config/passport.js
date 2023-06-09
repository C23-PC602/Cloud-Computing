// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

export const loginGoogleStrategy = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID, // Your Credentials here.
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Credentials here.
        callbackURL: "http://localhost:5000/auth/callback",
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};