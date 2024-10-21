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

setTimeout(() => {
  alert("Only 15 Minutes Left Before Phone Closes");
}, 100000000);
setTimeout(() => {
  alert("Only 1 Minutes Left Before Phone Closes");
}, 1740000);

setTimeout(() => {
  alert("Time Up - Phone Locked");
  submitScore(true);
}, 900000);

function decryptAnswer(encAns, ind) {
  return encAns * 10 - encoders[ind];
}

async function submitScoreProcess() {
  var userSubmit = document.querySelector("input[name='codeInput']").value;
  if (userSubmit == "696969") {
    var teamName = getCookie("loggedTeamName");
    var rawScore = parseInt(
      800 - (new Date().getTime() - parseInt(getCookie("startTime"))) / 3400
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
      ).catch((error) => console.log("CATTING : " + error));
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
