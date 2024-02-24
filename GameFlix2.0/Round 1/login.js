teamInfo = {
  "iosclub@vitbhopal.ac.in": "PAPA JIII",
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
  "vipranshanand2022@vitbhopal.ac.in": "Team Sahil",
  "kartikeshsingh2022@vitbhopal.ac.in": "Bombastic",
  "bhavanakoli2022@vitbhopal.ac.in": "BingeWatch",
  "sukritideb2022@vitbhopal.ac.in": "Non-Metallica",
  "divyanshupratapsingh2022@vitbhopal.ac.in": "Fukrey",
  "divyamathur2022@vitbhopal.ac.in": "LiLiLarks",
  "vedant.23bce11279@vitbhopal.ac.in": "Team DCP",
  "omsharma2022@vitbhopal.ac.in": "Team JNL",
  "aniruddhagupta2022@vitbhopal.ac.in": "BACKSHOTS",
  "mukunda.23bcy10270@vitbhopal.ac.in": "THE JIGSAW's",
  "vanshikatyagi2022@vitbhopal.ac.in": "Quad Squad",
  "hardik.23bai11153@vitbhopal.ac.in": "ALPHA Q",
  "harshdayal2022@vitbhopal.ac.in": "Discarded Retardeds",
  "utukuri.23mim10088@vitbhopal.ac.in": "Trackers",
  "manultyagi2022@vitbhopal.ac.in": "VIT Falcons",
  "sanskriti.23bai10019@vitbhopal.ac.in": "Nexus",
  "shikhargupta2022@vitbhopal.ac.in": "Deadpool",
  "saiyam.23bce11173@vitbhopal.ac.in": "Unaborted 4",
  "mitulsrivastava2022@vitbhopal.ac.in": "Winners",
  "rishabh.23bcy10271@vitbhopal.ac.in": "Knee grow",
  "venkatanagasaipranavrenduchintala2022@vitbhopal.ac.in": "NoShitSherlock",
  "aditya.23bai10303@vitbhopal.ac.in": "Pesa",
  "kratimadhwani2022@vitbhopal.ac.in": "Momo",
  "harshgarg2022@vitbhopal.ac.in": "Hustlers",
  "sakshi.23bsa10133@vitbhopal.ac.in": "Clueless",
  "priyanshu.23bai11278@vitbhopal.ac.in": "Diamond 1",
  "syedatifhussain2022@vitbhopal.ac.in": "Knightmares",
  "pranjal.23bai11024@vitbhopal.ac.in": "Teen Titans",
  "shruti.23bce10134@vitbhopal.ac.in": "Team Kryptonite",
  "oaj.23bcy10275@vitbhopal.ac.in": "Niggamons",
  "vedant.23bce11475@vitbhopal.ac.in": "Valhalla",
  "tarun.23bce11421@vitbhopal.ac.in": "Team Hell",
  "adityarajesh2022@vitbhopal.ac.in": "Gang314",
  "abhishek.kumar2021@vitbhopal.ac.in": "POTASS",
  "nikhil.23bce10985@vitbhopal.ac.in": "Insidious"
}

function getCookie(cookieName) {
  var cookiesArray = document.cookie.split("; ");
  for (var i = 0; i < cookiesArray.length; i++) {
    var cookie = cookiesArray[i];
    var cookieParts = cookie.split("=");
    if (cookieParts[0] === cookieName) {
      return cookieParts[1];
    }
  }
  return null;
}


if (getCookie("loggedIn")) {
  window.location.href = "./section1.html";
}
// if (getCookie("round1Score") && !getCookie("playedRound1")) {
//   alert("Quiz Already Attempted, Score Not Submitted\nSUBMITTING SCORE");
//   submitScore(getCookie("round1Score"));
// } else if (getCookie("playedRound1")) {
//   window.location.href = "./thanks.html";
// }

function handleLogin() {
  document.getElementById("signInButton").disabled = true;
  google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      console.log("SKIPPED :  "+notification.getSkippedReason())
      console.log("NOT DISPLAYED :  "+notification.getNotDisplayedReason())
      google.accounts.id.cancel();
      google.accounts.id.prompt();
      document.getElementById("signInButton").disabled = false;
    }
  });
}

function initializeGSI() {
  google.accounts.id.initialize({
    client_id:
    "154922699070-qhjfss2b8encrvrset2vfdo0i1e58o99.apps.googleusercontent.com",
    callback: handleGoogleSignIn,
    response_type: "token",
  });
}

function handleGoogleSignIn(googleUser) {
  const tokenData = JSON.parse(
    atob(
      googleUser.credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
    )
  );
  const email = tokenData.email;
  if (teamInfo[email]) {
    document.cookie = "loggedIn=loggedIn; expires=Sat, 24 Feb 2024 23:00:00 UTC";
    document.cookie =
      "loggedTeamName=" +
      teamInfo[email] +
      "; expires=Sat, 24 Feb 2024 23:00:00 UTC";
      document.location.href='./section1.html'
  } else {
    alert(
      "No Team Associated With This E-Mail, Please Log-in With Your Team Laeder's Email"
    );
    google.accounts.id.cancel();
    document.location.reload();
  }
}
