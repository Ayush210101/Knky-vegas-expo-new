import Bowser from "bowser";

let icon = document.querySelector(".carousel-control-prev");
let nexticon = document.querySelector(".carousel-control-next");
var firstButton = document.querySelector(
  "#carousel-wrapper button:first-child"
);
var lastButton = document.querySelector("#carousel-wrapper button:last-child");
var secondButton = document.querySelector(
  "#carousel-wrapper button:nth-child(2)"
);

let searchparams = window.location.search.split("=")[1];
if (searchparams) {
  goToLastSlide("carouselExampleIndicators");
  document.querySelector("#carousel-wrapper").style.display = "none";
  document.querySelector(".carousel-control-prev").style.display = "none";
  document.querySelector("#app").style.height = "102vh";
}

function updateIconsVisibility() {
  if (firstButton && firstButton.classList.contains("active")) {
    // Active on the first button, hide prev-icon and show next-icon
    icon.style.display = "none";
    nexticon.style.display = "block";
  } else if (secondButton && secondButton.classList.contains("active")) {
    // Active on the second button, show prev-icon and next-icon
    icon.style.display = "block";
    nexticon.style.display = "block";
  } else if (lastButton && lastButton.classList.contains("active")) {
    // Active on the last button, hide next-icon and show prev-icon
    icon.style.display = "block";
    nexticon.style.display = "none";
    document.querySelector("#carousel-wrapper").style.display = "none";
    document.querySelector(".carousel-control-prev").style.display = "none";
    document.querySelector("#app").style.height = "102vh";
  } else {
    // Active on a middle button,showing both icons
    icon.style.display = "block";
    nexticon.style.display = "block";
  }
}

function nextremove() {
  updateIconsVisibility();

  console.log("this should be removed");
}

function showNextIcon() {
  icon.style.display = "block";
  nexticon.style.display = "block";
}
updateIconsVisibility();

nexticon.addEventListener("click", nextremove);
nexticon.addEventListener("click", function () {
  if (firstButton && firstButton.classList.contains("active")) {
    // Show next-icon
    nexticon.style.display = "none";
  }
});
icon.addEventListener("click", function () {
  // Check if last button is active when prev-icon is clicked
  if (lastButton && lastButton.classList.contains("active")) {
    // Show next-icon
    nexticon.style.display = "block";
  }
  showNextIcon();
});

function goToLastSlide(carouselId) {
  var carousel = new bootstrap.Carousel(document.getElementById(carouselId));
  var slides = Array.from(
    document.querySelectorAll(`#${carouselId} .carousel-item`)
  );
  var lastSlideIndex = slides.length - 1;
  carousel.to(lastSlideIndex);
}

document.querySelector(".button-sign").addEventListener("click", function () {
  goToLastSlide("carouselExampleIndicators");
  document.querySelector("#carousel-wrapper").style.display = "none";
  document.querySelector(".carousel-control-next").style.display = "none";
});

function setVideoLinks() {
  const browser = Bowser.parse(window.navigator.userAgent);
  console.log(browser, "this is my browswr")
  const mode =
    window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  // const ext = browser.browser.name === "Safari" ? "mp4" : "mp4";

  const ext = (browser.browser.name === "Chrome" && browser.os.name == "iOS") || browser.browser.name === "Safari" ? "mp4" : "webm";
  for (let i = 1; i <= 6; i++) {
    const v = document.getElementById("s" + i);
    v.src = `https://expo.knky.co/static/${mode}/creator/s${i}.${ext}`;
  }
}

setVideoLinks();

var featureApiRaw = {
  user_id: "",
  interests: {
    prime: false,
    unlimited: false,
    pro: false,
    match_maker_prime: false,
    match_maker_private: false,
    referral: false,
  },
};
let submitAllForm = document.getElementById("intrestSubmitBtn");
let thankYouModal = document.getElementById("thankyouModal");
let thankYouModalagain = new bootstrap.Modal(thankYouModal);
var modal = document.getElementById("featureModal");
var myModal = new bootstrap.Modal(modal);
console.log(submitAllForm);
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("signupForm");

  var checkboxes = document.querySelectorAll(".form-check-input");
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      // Update the corresponding value in the featureApiRaw object
      featureApiRaw.interests[checkbox.value] = checkbox.checked;

      // Log the updated featureApiRaw object
      console.log("Updated featureApiRaw:", JSON.stringify(featureApiRaw));
    });
  });
  console.log(modal);
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission

    // Validate form values
    var firstName = document.getElementById("f_name").value;
    var lastName = document.getElementById("l_name").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var phoneCode = document.getElementById("phone-code").value;
    var phoneNo = document.getElementById("phone-no").value;
    var validator1 = document.getElementById("valid-username");
    var validator2 = document.getElementById("valid-email");
    var validFname = document.getElementById("valid-fname");
    var validLname = document.getElementById("valid-lname");


    if (
      !validateName(firstName) ||
      !validateName(lastName) ||
      !validateEmail(email)
    ) {
      return;
    }


    // loader js
    function startSpinner() {
      var opts = {
        lines: 13, // The number of lines to draw
        length: 20, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        scale: 1, // Scales overall size of the spinner
        corners: 1, // Corner roundness (0..1)
        color: '#ac1991', // CSS color or array of colors
        fadeColor: 'transparent', // CSS color or array of colors
        speed: 1, // Rounds per second
        rotate: 0, // The rotation offset
        animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
        direction: 1, // 1: clockwise, -1: counterclockwise
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        className: 'spinner', // The CSS class to assign to the spinner
        top: '50%', // Top position relative to parent
        left: '50%', // Left position relative to parent
        shadow: '0 0 1px transparent', // Box-shadow for the lines
        position: 'absolute' // Element positioning
      };
      var target = document.getElementById('spinner-container');
      var spinner = new Spinner(opts).spin(target);
    }

    function stopSpinner() {
      var target = document.getElementById('spinner-container');
      var spinner = target.querySelector('.spinner');
      if (spinner) {
        target.removeChild(spinner);
      }
    }



    const data = {
      f_name: firstName,
      l_name: lastName,
      username: username ? username : "knky-user-" + Math.random(),
      email: email,
      phone_number: phoneCode + phoneNo,
      user_type: "CREATOR", // Set a default value or dynamically retrieve it
      source: "EXPO",
    };

    var apiUrl =
      "https://admin-alpha-backend.knky.co/v1/users/capture-signup-interest";
    var apiKey = "gslie49st7kjjgd9268ux0t63";
    startSpinner()
    fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(data),

      })
      .then((response) => response.json())
      .then((apiResponse) => {
        console.log("API response:", apiResponse.error);

        if (apiResponse.message === "Success") {
          stopSpinner();
          myModal.show();
          callFeatures(apiResponse.data._id);
          event.target.reset();

        }
        if (apiResponse.error) {
          stopSpinner();
          console.log("error message: ", apiResponse.message)
          if (apiResponse.message.includes('Username')) {
            validator1.style.visibility = "visible"
            validator2.style.visibility = "hidden"
            validFname.style.visibility = "hidden"
            validLname.style.visibility = "hidden"


          } else if (apiResponse.message.includes('Email')) {
            validator2.style.visibility = "visible"
            validator1.style.visibility = "hidden"
            validFname.style.visibility = "hidden"
            validLname.style.visibility = "hidden"


          } else if (apiResponse.message.includes('f_name')) {
            validFname.style.visibility = "visible"
            validLname.style.visibility = "hidden"
            validator1.style.visibility = "hidden"
            validator2.style.visibility = "hidden"
          } else {
            validLname.style.visibility = "visible"
            validFname.style.visibility = "hidden"
            validator1.style.visibility = "hidden"
            validator2.style.visibility = "hidden"
          }

        }

        if (apiResponse.status === 422) {
          stopSpinner()

          displayValidationMessages(apiResponse.message);
        } else {
          // Calling it  with the user ID
        }
      })
      .catch((error) => {
        stopSpinner()
        console.error("Error:", error);
      });
  });
  let validkeys = {
    f_name: "",
    l_name: "",
    email: "",
  };
  form.addEventListener("change", function (event) {
    // Validate form values
    validkeys[event.target.id] = event.target.value;
    if (validkeys["f_name"] && validkeys["l_name"] && validkeys["email"]) {
      submitBtn.disabled = false;
      document.querySelector("#submitBtn").classList.remove("signup-btn");
      document.querySelector("#submitBtn").classList.add("complete-btn");
      document.querySelector("#submitBtn").classList.add("mx-auto");
      document.querySelector("#submitBtn").classList.add("d-block");
    } else {
      submitBtn.disabled = true;
      document.querySelector("#submitBtn").classList.add("signup-btn");
      document.querySelector("#submitBtn").classList.remove("mx-auto");
      document.querySelector("#submitBtn").classList.remove("d-block");
      document.querySelector("#submitBtn").classList.remove("complete-btn");
    }
    // validateForm();
  });
  // Validation functions
  function validateName(name) {
    return name.trim() !== "";
  }

  function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateUsername(username) {
    return username.trim() !== "";
  }
});

function callFeatures(userId) {
  featureApiRaw.user_id = userId;
  console.log(featureApiRaw);
  submitAllForm.addEventListener("click", function () {
    var featureApiUrl =
      "https://admin-alpha-backend.knky.co/v1/users/add-knky-interest";
    var featureApiHeaders = new Headers();
    featureApiHeaders.append("x-api-key", "gslie49st7kjjgd9268ux0t63");
    featureApiHeaders.append("Content-Type", "application/json");

    console.log(userId);
    console.log(featureApiRaw);
    var featureApiOptions = {
      method: "PATCH",
      headers: featureApiHeaders,
      body: JSON.stringify(featureApiRaw),
      redirect: "follow",
    };

    fetch(featureApiUrl, featureApiOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Feature API response:", result);
        thankYouModalagain.show();
      })
      .catch((error) => console.log("error", error));
  });
}

// Replay when Slide In
document
  .getElementById("carouselExampleIndicators")
  .addEventListener("slide.bs.carousel", (e) => {
    const n = e.to;
    if (n === 6) return;
    const v = document.getElementById("s" + (n + 1));
    v.currentTime = 0;
    v.play();
  });