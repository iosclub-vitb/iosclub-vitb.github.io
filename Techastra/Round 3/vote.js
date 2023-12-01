if (document.cookie.split(";").includes("votedRound3")){
    window.location.href = "./thanks.html";
}



function unlockButton() {
  document.getElementById("submitButton").removeAttribute("disabled");
}

function submitVote() {
  var teamSelected = document.querySelector(
    "input[name='votedTeam']:checked"
  ).value;
  fetch(
    "https://api.counterapi.dev/v1/round3_techastra/" + teamSelected + "/up"
  )
    .then(
      (document.cookie = "votedRound3; expires=Thu, 14 Dec 2023 15:00:00 UTC"),
      (window.location.href = "./thanks.html")
    )
    .catch((error) => {
      console.log(error);
      window.location.href = "./votepage.html";
    });
}
