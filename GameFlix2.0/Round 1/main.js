sec1Ans = [1, 2, 4];
sec2Ans = [1, 3, 4, 2, 2];
sec3Ans = [1, 2, 3, 1, 1];

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

function gameCompleteSubmitScore() {
  var score = 0;
}
function section1Score() {
  var score = 0;
  for (let index = 0; index < 3; index++) {
    cform = document.querySelector(`form[name="sec-1-${index}"]`);
    if (cform.querySelector('input[type="radio"]:checked')) {
      if (
        cform.querySelector('input[type="radio"]:checked').value ==
        sec1Ans[index]
      ) {
        score += 40;
      }
    } else {
      alert("Please Answer All Questions");
      return;
    }
  }
  var penality = (new Date().getTime() - getCookie("round1Start")) / 7500;
  var finalScore = parseInt(score - penality);
  finalScore = finalScore <= 0 ? 1 : finalScore;
  document.cookie =
    "section1Score=" + finalScore + "; expires=Sat, 24 Feb 2024 23:00:00 UTC";
  window.location.href = "./section2.html";
}

function section2Score() {
  var score = 0;
  for (let index = 0; index < 5; index++) {
    cform = document.querySelector(`form[name="sec-2-${index}"]`);
    if (cform.querySelector('input[type="radio"]:checked')) {
      if (
        cform.querySelector('input[type="radio"]:checked').value ==
        sec2Ans[index]
      ) {
        score += 40;
      }
    } else {
      alert("Please Answer All Questions");
      return;
    }
  }
  var penality = (new Date().getTime() - getCookie("round2Start")) / 7500;
  var finalScore = parseInt(score - penality);
  finalScore = finalScore <= 0 ? 1 : finalScore;
  document.cookie =
    "section2Score=" + finalScore + "; expires=Sat, 24 Feb 2024 23:00:00 UTC";
  window.location.href = "./section3.html";
}

function section3Score() {
  var score = 0;
  for (let index = 0; index < 5; index++) {
    cform = document.querySelector(`form[name="sec-3-${index}"]`);
    if (cform.querySelector('input[type="radio"]:checked')) {
      if (
        cform.querySelector('input[type="radio"]:checked').value ==
        sec3Ans[index]
      ) {
        score += 40;
      }
    } else {
      alert("Please Answer All Questions");
      return;
    }
  }
  var penality = (new Date().getTime() - getCookie("round3Start")) / 7500;
  var finalScore = parseInt(score - penality);
  finalScore = finalScore <= 0 ? 1 : finalScore;
  document.cookie =
    "section3Score=" + finalScore + "; expires=Sat, 24 Feb 2024 23:00:00 UTC";
  submitFinalScore();
}

setTimeout(() => {
  alert("Only 5 Minutes Left Before Quiz Closes");
}, 2400000);
setTimeout(() => {
  alert("Only 1 Minutes Left Before Quiz Closes");
}, 2640000);

setTimeout(() => {
  alert("Time Up - Submitting Quiz");
  submitFinalScore();
}, 2700000);

async function submitFinalScore() {
  fnSc = 0;
  var score1 = getCookie("section1Score");
  var score2 = getCookie("section2Score");
  var score3 = getCookie("section3Score");
  if (score1) {
    fnSc += parseInt(score1);
  }
  if (score2) {
    fnSc += parseInt(score2);
  }
  if (score3) {
    fnSc += parseInt(score3);
  }
  fnSc = fnSc <= 0 ? 1 : fnSc;
  alert("Your Final Score Is : " + fnSc);
  var teamName = getCookie("loggedTeamName");
  try {
    await fetch(
      "https://api.counterapi.dev/v1/round1_GameFlix20/" +
        teamName +
        "/set?count=" +
        fnSc,
      {
        method: "GET",
      }
    ).catch((error) => console.log("CATCHING : " + error));
    document.cookie =
      "playedRound1=playedRound1; expires=Sat, 24 Feb 2024 23:00:00 UTC";
    window.location.href = "./thanks.html";
  } catch (error) {
    console.log("ERROR : " + error);
    alert(
      "ERROR SUBMITTING, Don't Worry Your Score Is Saved Just Refresh Page To Submit Automatically"
    );
  }
}
