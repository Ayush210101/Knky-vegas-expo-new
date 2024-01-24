import Bowser from "bowser";

/**
 * @type {HTMLVideoElement}
 */
const landingVideoRef = document.getElementById("landingVideo");
const creatorBtnRef = document.getElementById("creatorBtn");
const fanBtnRef = document.getElementById("fanBtn");

let redirectTo = "";
landingVideoRef.ontimeupdate = () => {
  if (landingVideoRef.currentTime > 5) {
    show();
  }
  if (landingVideoRef.currentTime > 12) {
    landingVideoRef.currentTime = 5.5;
  }
};
landingVideoRef.onended = () => redirect();

creatorBtnRef.onclick = resume.bind(null, "creators");
fanBtnRef.onclick = resume.bind(null, "fans");

function resume(r) {
  redirectTo = r;
  landingVideoRef.ontimeupdate = null;
  landingVideoRef.currentTime = 16;
  landingVideoRef.play();
  creatorBtnRef.style.display = "none";
  fanBtnRef.style.display = "none";
}

function redirect() {
  console.log("redirect now ");
  window.location.href = `/${redirectTo}/`;
}

function show() {
  creatorBtnRef.classList.add("fadein");

  fanBtnRef.classList.add("fadein");

  creatorBtnRef.style.display = "flex";
  fanBtnRef.style.display = "flex";
}

function setVideoLinks() {
  const browser = Bowser.parse(window.navigator.userAgent);
  const mode = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  // const ext = browser.browser.name === "Safari" ? "mp4" : "mp4";
  const ext = (browser.browser.name === "Chrome" && browser.os.name == "Ios") || browser.browser.name === "Safari" ? "mp4" : "webm";

  landingVideoRef.src = `https://expo.knky.co/static/${mode}/landing.${ext}#t=0`;
}

setVideoLinks();