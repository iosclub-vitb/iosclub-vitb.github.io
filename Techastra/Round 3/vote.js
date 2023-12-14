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

if (getCookie("votedRound3")){
  window.location.href = "./thanks.html";
}
if (! getCookie("loggedInRound3")){
window.location.href = "./login.html";
}


function unlockButton() {
  document.getElementById("submitButton").removeAttribute("disabled");
}

function submitVote() {
  var teamSelected = document.querySelector(
    "input[name='votedTeam']:checked"
  ).value;
  console.log('https://api.counterapi.dev/v1/round3_techastra/' + teamSelected + '/up')
  fetch(
    "https://api.counterapi.dev/v1/round4_techastra/" + teamSelected + "/up"
  )
    .then(
      (document.cookie = "votedRound4=true; expires=Thu, 14 Dec 2023 15:00:00 UTC"),
      (window.location.href = "./thanks.html")
    )
    .catch((error) => {
      console.log(error);
      window.location.href = "./votepage.html";
    });
}
