/*
default:
    $.facebox.settings.closeImage:       '/facebox/closelabel.png'
    $.facebox.settings.loadingImage:     '/facebox/loadingImage.png'
*/
// edit path
$.facebox.settings.closeImage = "./ntflx.info" + $.facebox.settings.closeImage;
$.facebox.settings.loadingImage =
  "./ntflx.info" + $.facebox.settings.loadingImage;

/*
    -webkit for Chrome, Safari
    -moz for Firefox
    -o for Opera
    -ms for Internet Explorer
*/
function requestFullScreen() {
  if (elementPrototype.requestFullscreen)
    document.documentElement.requestFullscreen();
  else if (elementPrototype.webkitRequestFullScreen)
    /* Safari */
    document.documentElement.webkitRequestFullScreen(
      Element.ALLOW_KEYBOARD_INPUT
    );
  else if (elementPrototype.mozRequestFullScreen)
    document.documentElement.mozRequestFullScreen();
  /* Firefox */ else {
    /* fail silently */
  }
}

function errorSound() {
  $('body').append('<audio preload="auto" autoplay><source src="./sound/8_bit_error.wav" /></audio>');
}

/*
--$(function() { ... });
--is just jQuery short-hand for:
------$(document).ready(function() { ... });
*/
$(function () {
  // Detect if the demo will run on user's browser
  var errors = [];
  var errorStr = "";

  if (window.fullscreenSupport) {
    // browser detect
    if (BrowserDetect.browser == "Chrome") $("html").addClass("chorme");
    else if (BrowserDetect.browser == "Firefox") $("html").addClass("firefox");
    else if (BrowserDetect.browser == "Safari") $("html").addClass("safari");
    else {
      $("html").addClass("chrome"); // fallback to wrong UI
      errors.push(
        "Your browser supports the Fullscreen API! However, it didn't support it when I made this demo. The <b>demo will still work</b> but you will see Chrome's UI instead of your own browser's UI."
      );
    }

    // OS detect
    if (BrowserDetect.OS == "Mac") $("html").addClass("osx");
    else if (BrowserDetect.OS == "Windows") $("html").addClass("windows");
    else if (BrowserDetect.OS == "Linux") $("html").addClass("linux");
    else {
      errors.push(
        "You're not using an Windows, Mac OS X, or Linux. The <b>demo will not work</b> on your OS."
      );
    }
  } else errors.push("Your browser does not support the Fullscreen API. Sorry - this demo will not work for you. Try Chrome, Firefox, or Safari 6 (on OS X 10.8 Mountain Lion).");

  // check errors
  if (errors.length)
    $.each(errors, (i, error) => {
      errorStr += error;
      if (i != errors.length - 1) errorStr += "<br><br>";
    });

  // Set class on html element that represents the fullscreen state
  $(document).on("fullscreenchange", function () {
    if (document.fullscreenEnabled)
      $("html").addClass("fullscreened").removeClass("not-fullscreened");
    else {
      $("html").addClass("not-fullscreened").removeClass("fullscreened");
      $("div.browser-container").off('click');
    }
  });
  $(document).trigger("fullscreenchange");

  // Handle click on target link
  $("html").on("click", ".spoofLink", function (e) {
    // Prevent navigation to legit link
    e.preventDefault();
    e.stopPropagation();

    // Show error if browser doesn't support fullscreen
    if (!window.fullscreenSupport) {
      $.facebox(errorStr);
      return;
    }

    // Trigger fullscreen
    requestFullScreen();

    $("div.browser-container").on("click", function () {
      errorSound();
      $.facebox({div: "#card"});
      // setTimeout(() => document.getElementById("facebox").style.display = "none", 10000);
    });
  });
});
