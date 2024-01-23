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
let submitAllForm = document.getElementById("intrestSubmitBtn");

let thankYouModal = document.getElementById("thankyouModal");
let thankYouModalagain = new bootstrap.Modal(thankYouModal);
var modal = document.getElementById("featureModal");
var myModal = new bootstrap.Modal(modal);
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
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission

    // Validate form values
    var firstName = document.getElementById("f_name").value;
    var lastName = document.getElementById("l_name").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var validator1 = document.getElementById("valid-username");
    var validator2 = document.getElementById("valid-email");

    if (
      !validateName(firstName) ||
      !validateName(lastName) ||
      !validateEmail(email)
    ) {
      return;
    }

    const data = {
      f_name: firstName,
      l_name: lastName,
      username: username,
      email: email,
      user_type: "USER", // Set a default value or dynamically retrieve it
      source: "EXPO",
    };

    var apiUrl =
      "https://admin-alpha-backend.knky.co/v1/users/capture-signup-interest";
    var apiKey = "gslie49st7kjjgd9268ux0t63";
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
        console.log("API response:", apiResponse);
        if (apiResponse.message === "Success") {
          myModal.show();
          console.log("hehehehehe");
          callFeatures(apiResponse.data._id);
        }
        if (apiResponse.error) {
          validator1.style.display = "block";
          validator2.style.display = "block";
        }

        if (apiResponse.status === 422) {
          displayValidationMessages(apiResponse.message);
        } else {
          // Calling it  with the user ID
        }
      })
      .catch((error) => {
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
      document.querySelector("#submitBtn").classList.remove("signup-btn");
      document.querySelector("#submitBtn").classList.add("complete-btn");
      document.querySelector("#submitBtn").classList.add("mx-auto");
      document.querySelector("#submitBtn").classList.add("d-block");
    } else {
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
    document.querySelector('#carousel-wrapper').style.display = 'none'
    document.querySelector('.carousel-control-prev').style.display = 'none'
  } else {
    // Active on a middle button,showing both icons
    icon.style.display = "block";
    nexticon.style.display = "block";
  }
}

function nextremove() {
  updateIconsVisibility();
  console.log("I am calling");
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
  if (firstButton && firstButton.classList.contains("active")) {
    // Hide prev-icon
    icon.style.display = "none";
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
});

function setVideoLinks() {
  const browser = Bowser.parse(window.navigator.userAgent);
  const mode = browser.platform.type === "mobile" ? "portrait" : "landscape";
  const ext = browser.browser.name === "Safari" ? "mp4" : "webm";

  for (let i = 1; i <= 6; i++) {
    const v = document.getElementById("s" + i);
    v.src = `https://expo.knky.co/static/${mode}/fan/s${i}.${ext}`;
  }
}

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
setVideoLinks();