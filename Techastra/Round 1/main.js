encAnswers = [
  8.4, 1.5, 9.7, 8.1, 1.1, 8, 4, 1.4, 2.7, 7.9, 9.5, 2.7, 7, 2.9, 6.3, 1.5, 8.4,
  5.5, 3.8, 4.6, 5.1, 5.7, 3.2, 3.8, 8, 1.7, 9.7, 2.3, 5, 3, 6.4, 6, 9.3, 8.9,
  7.3, 3.3, 8.9, 0.5, 5.2, 4.9, 9, 5.8, 6.7, 0.6, 2.2, 2, 5.2, 5.4, 5.4, 4.4,
];
encoders = [
  81, 13, 94, 79, 8, 78, 38, 12, 23, 75, 94, 25, 66, 27, 61, 12, 82, 53, 37, 42,
  48, 55, 30, 37, 78, 14, 96, 22, 46, 27, 61, 56, 91, 87, 71, 29, 86, 1, 50, 46,
  88, 56, 65, 5, 19, 18, 48, 51, 50, 43,
];

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


if (!getCookie("loggedIn")) {
  window.location.href = "./login.html";
}
if (getCookie("round1Score") && !getCookie("playedRound1")) {
  alert("Quiz Already Attempted, Score Not Submitted\nSUBMITTING SCORE");
  submitScore(getCookie("round1Score"));
} else if (getCookie("playedRound1")) {
  window.location.href = "./thanks.html";
}

setTimeout(() => {
  alert("Only 5 Minutes Left Before Quiz Closes");
}, 900000);
setTimeout(() => {
  alert("Only 1 Minutes Left Before Quiz Closes");
}, 1140000);

setTimeout(() => {
  alert("Time Up - Submitting Quiz");
  markForm(true);
}, 1200000);


function markForm(autoSubmit) {
  var totalPoints = 0;
  for (let question = 0; question < 30; question++) {
    var ansToQuestion = encAnswers[question];
    try {
      if (
        document.querySelector('input[name="' + (question + 1) + '"]:checked')
          .value == decryptAnswer(ansToQuestion, question)
      ) {
        totalPoints += 15;
      }
    } catch (error) {
      if (autoSubmit) {
        continue;
      } else {
        alert("You Missed Question Number : " + (question + 1));
        return;
      }
    }
  }
  var penality = (new Date().getTime() - getCookie("round1StartTime")) / 6000;
  var finalScore = parseInt(totalPoints - penality);
  if (finalScore <= 0) {
    finalScore = 1;
  }
  (document.cookie =
    "round1Score=" + finalScore + "; expires=Thu, 14 Dec 2023 15:00:00 UTC"),
    alert("YOUR FINAL SCORE : \n" + finalScore);
  submitScore(finalScore);
}

function decryptAnswer(encAns, ind) {
  return encAns * 10 - encoders[ind];
}

async function submitScore(fnSc) {
  var teamName = getCookie("loggedTeamName");
  try {
    await fetch(
      "https://api.counterapi.dev/v1/round1_techastra/" +
        teamName +
        "/set?count=" +
        fnSc,
      {
        method: "GET",
      }
    ).catch((error) => console.log("CATTING : " + error));
    document.cookie =
      "playedRound1=playedRound1; expires=Thu, 14 Dec 2023 15:00:00 UTC";
    window.location.href = "./thanks.html";
  } catch (error) {
    console.log("ERROR : " + error);
    alert("ERROR SUBMITTING, Refresh Page To Submit Automatically");
  }
}
