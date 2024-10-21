// Updated JavaScript Code

var passcode = "1234";
var atpass = "";
var locked = true;
var xDown = null;
var yDown = null;
var tmonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function setCookie(name, value, hours = 5) {
  const now = new Date();
  now.setTime(now.getTime() + hours * 60 * 60 * 1000); // Add hours to the current time
  const expires = "expires=" + now.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

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

if (getCookie("crackedCode")){
  window.location.href="../gallery/app_screen.html"
}

// Function to reset the passcode input
function resetPasscode(shake) {
  atpass = "";
  if (shake == 1) {
    var passt = document.getElementById("passt");
    // Adding shake animation
    passt.classList.add("shake");
    setTimeout(function () {
      passt.classList.remove("shake");
    }, 500);
  }
  for (var i = 1; i <= 4; i++) {
    document.getElementById("radio" + i).checked = false;
  }
}
//getCookie
//set cookie

//check the first time at which user lands
function checkLoginTime() {
  let loginTime = getCookie("login-time");
  if (!loginTime == "") {
    setCookie("login-time", 1); // Cookie will last for 1 day
  }
}

// Function to handle passcode input
function lockPattern(passnum) {
  if (atpass.length < 4) {
    atpass += passnum;
    document.getElementById("radio" + atpass.length).checked = true;
  }
  if (atpass.length == 4) {
    if (atpass !== passcode) {
      resetPasscode(1);
    } else {
      unlock();
      resetPasscode(0); //reset the input
    }
  }
}

// Function to format time
function checkTime(i) {
  return i < 10 ? "0" + i : i;
}

// Update time and date on the start screen
function updateTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  m = checkTime(m);
  var timeString = h + ":" + m;
  var options = { weekday: "long", month: "long", day: "numeric" };
  var dateString = today.toLocaleDateString(undefined, options);

  // Update time and date elements
  var timeElements = document.getElementsByClassName("current-time");
  var dateElements = document.getElementsByClassName("current-date");
  for (var i = 0; i < timeElements.length; i++) {
    timeElements[i].textContent = timeString;
  }
  for (var i = 0; i < dateElements.length; i++) {
    dateElements[i].textContent = dateString;
  }
}

// Event listener for DOM content loaded
document.addEventListener(
  "DOMContentLoaded",
  function () {
    // Update time immediately and every minute
    checkLoginTime();
    updateTime();
    setInterval(updateTime, 60000);

    // Add click events to passcode buttons
    var passbuttons = document.getElementsByClassName("passnum");
    for (var i = 0; i < passbuttons.length; i++) {
      passbuttons[i].onclick = function () {
        lockPattern(this.querySelector("p").textContent.trim()[0]);
      };
    }
  },
  false
);

// Function to show the password screen
function showPasswordScreen() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("password-screen").classList.remove("hidden");
  locked = true;
  resetPasscode(); // Reset passcode when showing the screen
}

// Function to return to the start screen
function showStartScreen() {
  document.getElementById("password-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
  locked = true;
  resetPasscode();
}

// Function called when the correct passcode is entered
function unlock() {
  setCookie("crackedCode", "crackedCode")
  // Here you can define what happens after unlocking
  window.location.href = "../gallery/app_screen.html";
  // Optionally, you can redirect or show another screen
}

// Optional: Remove touch event listeners if not using swipe gestures
// document.addEventListener('touchstart', handleTouchStart, false);
// document.addEventListener('touchmove', handleTouchMove, false);

// If you need swipe functionality, implement these functions
function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }
  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;
  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff <= 0) {
      if (locked == true) {
        showPasswordScreen();
      }
    }
  }
  xDown = null;
  yDown = null;
}

//Hint slider
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}
function plusSlides_addcookie(n) {
  showSlides((slideIndex += n));
  const hints = getCookie("hintsUsed") ? parseInt(getCookie("hintsUsed")) + 1 : 1;
  setCookie(
    "hintsUsed", hints
  );
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

document.addEventListener("contextmenu", function (e) {
  e.preventDefault(); // Disable right-click context menu
});

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  try {
    slides[slideIndex - 1].style.display = "block";
  } catch (error) {
    return null;
  }
}

function createStartCookie() {
  if (getCookie("startTime")) {
    return;
  } else {
    setCookie("startTime", new Date().getTime());
  }
}
