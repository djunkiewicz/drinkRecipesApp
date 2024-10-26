$(document).ready(function () {
  let sequenceDelay = 200;
  let scrollingTime = 400;
  let scrollDistance = $("#header").height() + 25;

  console.log(window.innerHeight);
  console.log($("#footer").height());
  console.log($("html").height());

  if (window.location.pathname.includes("drink")) {
    scrollDistance =
      $("html").height() - window.innerHeight - $("#footer").height() + 5;
    scrollingTime = 200;
  }

  setTimeout(function () {
    if ($(window).scrollTop() === 0) {
      $("html, body").animate(
        {
          scrollTop: $(window).scrollTop() + scrollDistance,
        },
        scrollingTime
      );
    }
  }, sequenceDelay);
});
