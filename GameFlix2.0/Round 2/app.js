const express = require("express");
const parser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();

TEAM_ACCOUNT_OBJ = {
  "aryanshgupta2022@vitbhopal.ac.in": "PAPA JIII",
  "harshita2022@vitbhopal.ac.in": "Download Weathery Nowww!!!",
  "pratyushjagdishbirole2022@vitbhopal.ac.in": "Download Weathery Nowww!!!",
  "prakharswarnkar2022@vitbhopal.ac.in": "Download Weathery Nowww!!!",
  "bhoumikchopra2022@vitbhopal.ac.in": "Download Weathery Nowww!!!",
  "leonardofernandes2022@vitbhopal.ac.in": "Download Weathery Nowww!!!",
  "agnibhachakraborty2022@vitbhopal.ac.in": "Download Weathery Nowww!!!",
  "jaidityabatra2022@vitbhopal.ac.in": "Download Weathery Nowww!!!",
  "ritisinha2022@vitbhopal.ac.in": "Download Weathery Nowww!!!",
  "ishikawadagbalkar2022@vitbhopal.ac.in": "Download Weathery Nowww!!!",
  "riyasingh.2022@vitbhopal.ac.in": "Download Weathery Nowww!!!",
};

TEAM_CODE_ANS = {
  "aryanshgupta2022@vitbhopal.ac.in": "SliperyBoi",
  "harshita2022@vitbhopal.ac.in": "SliperyBoi",
  "pratyushjagdishbirole2022@vitbhopal.ac.in": "SliperyBoi",
  "prakharswarnkar2022@vitbhopal.ac.in": "SliperyBoi",
  "bhoumikchopra2022@vitbhopal.ac.in": "SliperyBoi",
  "leonardofernandes2022@vitbhopal.ac.in": "SliperyBoi",
  "agnibhachakraborty2022@vitbhopal.ac.in": "SliperyBoi",
  "jaidityabatra2022@vitbhopal.ac.in": "SliperyBoi",
  "ritisinha2022@vitbhopal.ac.in": "SliperyBoi",
  "ishikawadagbalkar2022@vitbhopal.ac.in": "SliperyBoi",
  "riyasingh.2022@vitbhopal.ac.in": "SliperyBoi",
};

app.use(parser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.listen(3000);

app.use(
  session({
    secret: "TECH-IOS-CLUB",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000000 },
  })
);
app.use(cookieParser());
// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

const colorArray = [
  "DeepPink",
  "Crimson",
  "DodgerBlue",
  "SaddleBrown",
  "Violet",
];

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "788550902072-ng6nit52sakicracfcm62qd200ns9rt1.apps.googleusercontent.com",
      clientSecret: "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",

      callbackURL: "https://gameflix-round-2.onrender.com/process-login",
      scope: ["https://www.googleapis.com/auth/plus.login"],
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile._json.email);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// Redirect to login
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Render Login Page
app.get("/login", (req, res) => {
    if (req.cookies.currentTeamName == null){
        // NO LOGIN TILL NOW
        res.sendFile(__dirname + "/login.html");
    }
    else{
        //LOGIN ALREADY DONE
        if(req.cookies.hasPlayedRound2){
            // HAS PLAYED ALREADY
            res.redirect("/teamStatus");
        }
        else{
            res.redirect("/TeamAnswer");
        }
    
    }
});

app.get("/login-failed", (req, res) => {
  res.sendFile(__dirname + "/login-failed.html");
});

//Open Main Answer Input Window
app.get("/TeamAnswer", ensureAuthenticated, (req, res) => {
  if (req.user in TEAM_ACCOUNT_OBJ) {
    res.cookie('currentTeamName' , TEAM_ACCOUNT_OBJ[req.user],{maxAge: 60000000 });
    res.render(__dirname + "/allotColor.ejs", {
      teamName: TEAM_ACCOUNT_OBJ[req.user],
    });
  } else {
    res.redirect("/login-failed");
  }
});

app.get(
  "/login-with-google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/process-login",
  passport.authenticate("google", {
    successRedirect: "/TeamAnswer",
    failureRedirect: "/login-failed",
  })
);

// Validate Answer input and Show results
app.post("/validate", ensureAuthenticated, (req, res) => {
  if (req.body.passcode.toLowerCase() == TEAM_CODE_ANS[req.user].toLowerCase()) {
    res.cookie("hasPlayedRound2", true, {maxAge: 60000000 } );
    if (colorArray.length > 0) {
        var allotedColor = colorArray.pop() ;
      res.cookie("teamColor", allotedColor, {maxAge: 60000000 });
      res.render(__dirname + "/teamAnswer.ejs", {
        teamName: TEAM_ACCOUNT_OBJ[req.user],
        teamColor: allotedColor,
      });
    } else {
      res.render(__dirname + "/teamReject.ejs", {
        heading: "Oops! You're Late",
        message:
          "Sorry, You Aren't In The Top 10 Teams, Better Luck Next Time!",
          displayButton : "none",
      });
    }
  } else {
    res.render(__dirname + "/teamReject.ejs", {
        heading: "Oops! Wrong Passcode",
        message:
          "Guess The Correct Code And Try Again!",
          displayButton : "block"
      });
  }
});


//Call this only when you know They Have Logged In And Already Played The Game, But You Need To
// Show The Results
app.get("/teamStatus", (req,res) =>{
    if(req.cookies.teamColor){
        res.render(__dirname + "/teamAnswer.ejs", {
            teamName: req.cookies.currentTeamName,
            teamColor: req.cookies.teamColor,
          });
        }
        else{
            res.render(__dirname + "/teamReject.ejs", {
                heading: "Oops! You're Late",
                message:
                  "Sorry, You Aren't In The Top 10 Teams, Better Luck Next Time!",
                  displayButton : "none",
              });
        }
});

// PINGER TO KEEP ACTIVE AND PREVENT SINK
app.get("/ping", (req, res) => {
  res.status(200).send("SERVER ONLINE");
});
// 404 CATCH ALWAYS AT LAST
app.all("*", (req, res) => {
  res
    .status(404)
    .send(
      "NOT FOUND, <a href='/login'> CLICK HERE TO RETURN TO HOME PAGE </a>"
    );
});

// teamNameList = ["Team", "Team1", "Team2", "Team3"]; //TEAM NAMES ACCORDING TO REGISTRATION, MANUALLY UPDATED
// teamScores = {};
// async function getLeaderboardData() {
//   for (let index = 0; index < teamNameList.length; index++) {
//     const teamName = teamNameList[index];
//     await fetch("https://api.counterapi.dev/v1/reound2_techastra/" + teamName)
//       .catch((teamScores[teamName] = 0))
//       .then((res) => {
//         return res.json();
//       })
//       .then((res) => {
//         teamScores[teamName] = res.count;
//       });
//   }
//   Object.keys(teamScores).forEach((key) => {
//     if (teamScores[key] === undefined) {
//       teamScores[key] = 0;
//     }
//   });
//   const sortedArray = Object.entries(teamScores).sort((a, b) => b[1] - a[1]);
//   const sortedObject = Object.fromEntries(sortedArray);
//   return sortedObject;
// }
// let finalTeamSortedDictionary = await getLeaderboardData();

// //NOW USE finalTeamSortedDictionary TO CREATE LEADERBOARD TEAM DISPLAYS, YOU MAY USE LOOP OR ANYTHING
// //JUST REFREASH PAGE EVERY 30 SECONDS TO UPDATE LEADERBOARDS
