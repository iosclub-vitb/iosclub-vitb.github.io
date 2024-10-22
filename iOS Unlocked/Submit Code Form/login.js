teamInfo = {
  "vansh.23bce11714@vitbhopal.ac.in": "OrganicPunks",
  "kiran.23bcy10215@vitbhopal.ac.in": "Qara qoldar",
  "mihir.24mca10049@vitbhopal.ac.in": "Team 3AM",
  "ritabrata.23bce11258@vitbhopal.ac.in": "Team RVR",
  "sarthak.23bsa10058@gmail.com": "iCode Warriors",
  "vandana.24mca10027@vitbhopal.ac.in": "iOS Innovators",
  "kunal.24mca10074@vitbhopal.ac.in": "Team Synergy",
  "himanshu.23bai10855@vitbhopal.ac.in": "NHT",
  "vipransh.23bai10624@vitbhopal.ac.in": "Y U Bully Me",
  "harsh.24bce10334@vitbhopal.ac.in": "POKIE_HACKERS",
  "saanvi.23bce11221@vitbhopal.ac.in": "IOS team",
  "raunak.23bai11296@vitbhopal.ac.in": "codecraft",
  "akshat.24mca10061@vitbhopal.ac.in": "No Direction",
  "yash.24mca10132@vitbhopal.ac.in": "Future billionaires",
  "aryan.24mip10041@vitbhopal.ac.in": "Power Rangers iOS",
  "himanshu.24bcy10149@vitbhopal.ac.in": "Data smiths",
  "kalpak.23boe10020@vitbhopal.ac.in": "Phantom Phreaks",
  "jaison.23bai11378@vitbhopal.ac.in": "Cove",
  "susmit.23bce11553@vitbhopal.ac.in": "Pixel",
  "abhijeet.24bce10768@vitbhopal.ac.in": "K2",
  "rishabh.24bsa10079@vitbhopal.ac.in": "Synergy Squad",
  "bhavy.24bce10910@vitbhopal.ac.in": "Team techy",
  "tushan.24bce10215@vitbhopal.ac.in": "ALPHA",
  "kartik.23bce11103@vitbhopal.ac.in": "Beast",
  "ajay.24bai10948@vitbhopal.ac.in": "Safari",
  "amartya.24bcg10144@vitbhopal.ac.in": "ERROR404.......",
  "krishna.24bai10721@vitbhopal.ac.in": "BLACK HAWKS",
  "yash.24bsa10098@vitbhopal.ac.in": "WolfZ",
  "pramod.24bai10133@vitbhopal.ac.in": "Mission Possible",
  "udit.24mca10135@vitbhopal.ac.in": "Mca24",
  "vishal.24bai10357@vitbhopal.ac.in": "Tech Titans",
  "harshan.23bai10451@vitbhopal.ac.in": "404Found",
  "vansh.23mim10007@vitbhopal.ac.in": "The caffeine cowboys",
  "abhishek.23mim10148@vitbhopal.ac.in": "Duniya ke rakhwale",
  "nomeshbabu.24mei10023@vitbhopal.ac.in": "Android users",
  "pronoy.24bac10002@vitbhopal.ac.in": "CODECRAFTERS",
  "krishna.24bce10678@vitbhopal.ac.in": "Intellectual_04",
  "aryan.24bai10258@vitbhopal.ac.in": "HUNTERS",
  "pratham.24mim10063@vitbhopal.ac.in": "Team Horizon",
  "priyanka.24bcg10069@vitbhopal.ac.in": "MaggiCrypters",
  "sarthak.23bce10959@vitbhopal.ac.in": "Red_Ace",
  "sai.24bec10022@vitbhopal.ac.in": "Power Rangers",
  "vedant.24bce10779@vitbhopal.ac.in": "Samsung_Best",
  "aditya.23bai10303@vitbhopal.ac.in": "Lolz",
  "eshant.24bcy10212@vitbhopal.ac.in": "TECH_WARRIORS",
  "manya.24bce11428@vitbhopal.ac.in": "BETA",
  "anmol.24bec10149@vitbhopal.ac.in": "Team B-iOS",
  "Sujal.24bai10937@vitbhopal.ac.in": "Team Guava",
  "divyanshu.24bsa10328@vitbhopal.ac.in": "Team Wolves",
  "krish.23bcy10313@vitbhopal.ac.in": "Xcoders",
  "jai.23mim10052@vitbhopal.ac.in": "Kothri lions",
  "aryan.23bai10337@vitbhopal.ac.in": "Trailblazersss",
  "iosclub@vitbhopal.ac.in": "Tester1",
  "aryanshgupta2022@vitbhopal.ac.in":"Tester2",
  "leonardofernandes2022@vitbhopal.ac.in":"Tester3",
  "riyasingh.2022@vitbhopal.ac.in":"Tester4",
  "bhoumikchopra2022@vitbhopal.ac.in":"Tester5",
  "mridul.24bcy10127@vitbhopal.ac.in" :"MAP"

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

function setCookie(name, value, hours = 5) {
  const now = new Date();
  now.setTime(now.getTime() + hours * 60 * 60 * 1000); // Add hours to the current time
  const expires = "expires=" + now.toUTCString();

  document.cookie = name + "=" + value + "; " + expires + "; path=/";
}


if (getCookie("loggedIn")) {
  window.location.href = "./submit_code.html";
}

if (getCookie("savedScore") && !getCookie("submittedScore")) {
  alert("Score Already Saved, Score Not Submitted\nSUBMITTING SCORE");
  submitScore(getCookie("savedScore"));
} else if (getCookie("submittedScore")) {
  window.location.href = "./thanks.html";
}

function handleLogin() {
  document.getElementById("signInButton").disabled = true;
  google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      console.log("SKIPPED :  " + notification.getSkippedReason());
      console.log("NOT DISPLAYED :  " + notification.getNotDisplayedReason());
      google.accounts.id.cancel();
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
    setCookie("loggedIn", "loggedIn");
    setCookie("loggedTeamName", teamInfo[email]);
    document.location.href = "./submit_code.html";
  } else {
    alert(
      "No Team Associated With This E-Mail, Please Log-in With Your Team Laeder's Email"
    );
    google.accounts.id.cancel();
    document.location.reload();
  }
}
