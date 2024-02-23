teamInfo = {
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
