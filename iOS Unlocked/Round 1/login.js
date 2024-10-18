teamInfo = {
  "rai.23bcg10083@vitbhopal.ac.in":"Alpha Q",
  "vikash.23bai10559@vitbhopal.ac.in": "Artificial Intellectuals",
  "salonichaurasia2022@vitbhopal.ac.in": "Brahmastra",
  "harshshukla2022@vitbhopal.ac.in": "CodeWarts",
  "rajaryansharma2022@vitbhopal.ac.in": "CYPHERS",
  "manas.23bce11202@vitbhopal.ac.in": "Data Sonic",
  "tamojit.23mim10125@vitbhopal.ac.in": "Error 404",
  "anilkumar2022@vitbhopal.ac.in": "FutureDrive",
  "preeshavashisth2022@vitbhopal.ac.in": "Gojo supremacy",
  "vidit.23bai10196@vitbhopal.ac.in": "Hustlers",
  "pranavchaturvedi2022@vitbhopal.ac.in": "Infinite Void",
  "gauravsingh2022@vitbhopal.ac.in": "Jukebox",
  "shristi.23bhi10125@vitbhopal.ac.in": "Shristi Jha",
  "sumitrajtiwari2022@vitbhopal.ac.in": "StarCoders",
  "devansh.23bce10247@vitbhopal.ac.in": "Team Anonymous",
  "sarthakjain2022@vitbhopal.ac.in": "Tech Titans",
  "samridhi.23bai10271@vitbhopal.ac.in": "TECH TITANS",
  "ansh.23bet10008@vitbhopal.ac.in": "The Caffeine Cowboys",
  "arihantbisen2022@vitbhopal.ac.in": "VACnA",
  "himanshu.23bce10450@vitbhopal.ac.in": "VITalize",
  "shubhraawasthi2022@vitbhopal.ac.in": "Wise quackers"
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
  window.location.href = "./quiz.html";
}
if (getCookie("round1Score") && !getCookie("playedRound1")) {
  alert("Quiz Already Attempted, Score Not Submitted\nSUBMITTING SCORE");
  submitScore(getCookie("round1Score"));
} else if (getCookie("playedRound1")) {
  window.location.href = "./thanks.html";
}

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
      "875788863910-6ngld182j985ek6lncsjr08vg7bg6nhq.apps.googleusercontent.com",
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
    document.cookie = "loggedIn=loggedIn; expires=Thu, 14 Dec 2023 15:00:00 UTC";
    document.cookie =
      "loggedTeamName=" +
      teamInfo[email] +
      "; expires=Thu, 14 Dec 2023 15:00:00 UTC";
      document.location.href='./quiz.html'
  } else {
    alert(
      "No Team Associated With This E-Mail, Please Log-in With Your Team Laeder's Email"
    );
    google.accounts.id.cancel();
    document.location.reload();
  }
}
