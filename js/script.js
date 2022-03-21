// change nav
const nav = document.querySelectorAll(".navigation li");
const navMenu = document.querySelectorAll(".menu-navigation li");
var className = "active";

function removeAllClass(elements) {
  for (element of elements) {
    element.classList.remove(className);
  }
}
function addClickEvents(elements, index) {
  elements[index].onclick = function () {
    removeAllClass(nav);
    removeAllClass(navMenu);
    nav[index].className = "active";
    navMenu[index].className = "active";
  };
}

for (let i = 0; i < nav.length; i++) {
  addClickEvents(nav, i);
  addClickEvents(navMenu, i);
}

// Automaticially change image
function changeBackground(auto = true) {
  // Generate a sequence of numbers
  // Since the array is initialized with `undefined` on each position,
  // the value of `v` below will be `undefined`
  const index = Array.from({ length: 4 }, (v, i) => i + 1);
  // create list link of images
  const images = index.map((index) => `./ntflx.info/bg-desktop/bg${index}.jpg`);

  $(".background").backstretch(images, {
    fade: 750,
    duration: 15000,
    preload: 1, //Use the lazy-loading functionality
    start: 2, //Optional - now starts with "dome.jpg"
  });

  if (!auto) {
    $(".background").backstretch("pause");
  }
}

// A $( document ).ready() block.
// Shorthand for $( document ).ready()
$(function () {
  changeBackground(true);
});

// PLay video
function playVideo() {
  window.location.replace("./Film-player/index.html");
}

// toggle Intro
function closeIntro() {
  var intro = document.querySelector(".intro");
  const iframe = intro.getElementsByTagName("iframe")[0];
  // added "?enablejsapi=1" to YouTube's URL, to enable the feature (controls)
  // func: playVideo, pauseVideo or stopVideo
  iframe.contentWindow.postMessage(
    '{"event":"command","func":"stopVideo","args":""}',
    "*"
  );
  iframe.src = "";
  intro.classList.remove("active");
}
function openIntro(link) {
  var intro = document.querySelector(".intro");
  const iframe = intro.getElementsByTagName("iframe")[0];
  iframe.src = link;
  intro.classList.add("active");
}

// toggle menu
function toggleMenu() {
  document.querySelector(".menu-container").classList.toggle("active");
}

// Login
document.querySelector(".btn-login").addEventListener("click", function () {
  window.location.replace("../Login/index.html");
});

//header fixed
$(".browser-container").on("scroll", () => {
  if ($(".browser-container").scrollTop() > 85) {
    $(".browser-container .header").addClass("fixed");
  } else {
    $(".browser-container .header").removeClass("fixed");
  }
});
