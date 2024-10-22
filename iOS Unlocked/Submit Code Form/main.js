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

function setCookie(name, value, hours = 5) {
  const now = new Date();
  now.setTime(now.getTime() + hours * 60 * 60 * 1000); // Add hours to the current time
  const expires = "expires=" + now.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

if (!getCookie("loggedIn")) {
  window.location.href = "./login.html";
}


if (getCookie("round1Score") && !getCookie("playedRound1")) {
  alert("Score Already Saved, Score Not Submitted\nSUBMITTING SCORE");
  submitScore(getCookie("round1Score"));
} else if (getCookie("playedRound1")) {
  window.location.href = "./thanks.html";
}

function decryptAnswer(encAns, ind) {
  return encAns * 10 - encoders[ind];
}

async function submitScoreProcess() {
  var userSubmit = document.querySelector("input[name='codeInput']").value;
  if (userSubmit == "852417") {
    var teamName = getCookie("loggedTeamName");
    var rawScore = parseInt(
      800 - (new Date().getTime() - parseInt(getCookie("startTime"))) / 12500
    );
    var hintsUsedPenality = getCookie("hintsUsed") * 25;
    var Score = rawScore - hintsUsedPenality;
    Score = Score > 0 ? Score : 1;
    setCookie("savedScore",Score)
    try {
      await fetch(
        "https://api.counterapi.dev/v1/ios_unlocked/" +
          teamName +
          "/set?count=" +
          Score,
        {
          method: "GET",
        }
      )
      setCookie("submittedScore", Score);
      window.location.href = "./thanks.html";
    } catch (error) {
      console.log("ERROR : " + error);
      alert("ERROR SUBMITTING, Refresh Page To Submit Automatically");
    }
  } else {
    alert("Wrong Code");
  }
}
