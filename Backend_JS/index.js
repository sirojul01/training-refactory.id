const express = require("express");
const app = express();
const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;
const User = require("./models/User");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("login");
});

app.use(require("cookie-parser")());
app.use(
  require("express-session")({
    secret: "M. Sirojul Anam",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//FACEBOOK

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
    authType: "reauthenticate",
  })
);

passport.use(
  new facebookStrategy(
    {
      clientID: "681626789665675",
      clientSecret: "9a63ddd8049892859cdc82a8f4bf02b4",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      //client id google : 700834429628-hcu20gp9mkkdju8p80cvd4mlrc8ulu4m.apps.googleusercontent.com
      //clientSecret google : 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
      profileFields: [
        "id",
        "displayName",
        "name",
        "birthday",
        "picture.type(large)",
        "email",
      ],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      // return done(null, profile);
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return done(err, user);
      });
      process.nextTick(function () {
        console.log("looking for user from fb inside async");
        User.findOne({ id: profile.id }, function (err, user) {
          if (err) return done(err);

          if (user) {
            console.log("user found");
            console.log(user);
            return done(null, user);
          } else {
            let newUser = new User();
            newUser.uid = profile.id;
            newUser.name =
              profile.name.givenName + " " + profile.name.familyName;
            newUser.email = profile.emails[0].value;
            newUser.photo = profile.photos[0].value;
            newUser.save(function (err) {
              if (err) throw err;
              console.log(newUser);
              return done(null, newUser);
            });
          }
        });
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// FACEBOOK

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/failed" }),
  function (req, res) {
    res.redirect("/profile");
  }
);

app.get("/profile", isLoggedin, (req, res) => {
  res.render("profile", { user: req.user });
});

app.get("/failed", (req, res) => {
  res.render("failed");
});

function isLoggedin(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/profile");
}

app.get("/logout", (req, res) => {
  req.session.destroy(function () {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

app.listen(3000, (req, res) => console.log("Application Running in Port 3000"));
