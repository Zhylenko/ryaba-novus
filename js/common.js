const imageBox = document.getElementById("images");

const images = imageBox.querySelectorAll(".round-wrapp");

let delay = 350;

[...images].map((img) => {
  setTimeout(() => {
    img.classList.add("round-wrapp--visible");
  }, delay);
  delay += 350;
});

(document.getElementById("burger-btn").onclick = function () {
  this.classList.toggle("burger-btn--active"),
    document
    .getElementById("header-menu")
    .classList.toggle("header-menu--active");
}),
(document.getElementById("close").onclick = function () {
  document
    .getElementById("burger-btn")
    .classList.remove("burger-btn--active"),
    document
    .getElementById("header-menu")
    .classList.remove("header-menu--active");
});


AOS.init();

document.addEventListener("DOMContentLoaded", function () {
  for (var e = document.links, t = 0, n = e.length; t < n; t++) o(e[t]);

  function o(e) {
    if (e.hostname === location.hostname && e.pathname === location.pathname) {
      var t = e.hash.slice(1) ?
        document.getElementById(e.hash.slice(1)) :
        document.body;
      t &&
        e.addEventListener("click", function (e) {
          e.preventDefault(),
            (function (e) {
              var t = 0,
                n = e / 90,
                o = window.pageYOffset || document.documentElement.scrollTop,
                c = setInterval(function () {
                  (o += n),
                  window.scrollTo(0, o),
                    ++t >= 90 && clearInterval(c);
                }, 1);
            })(t.getBoundingClientRect().top);
        });
    }
  }
});
