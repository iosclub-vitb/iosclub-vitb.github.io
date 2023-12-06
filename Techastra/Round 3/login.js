
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


if (getCookie("votedRound3")) {
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
      "196275511739-iig5v058mjf6td0gng4qp9tkb1v7j03n.apps.googleusercontent.com",
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
