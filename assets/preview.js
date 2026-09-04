(function () {
  function relabelAbout() {
    document.querySelectorAll('a[href="about.html"], a[href="./about.html"]').forEach(function (a) {
      var t = (a.textContent || "").trim();
      if (t === "The Farm" || t === "About / The Farm" || t.indexOf("The Farm") !== -1) {
        a.textContent = "About";
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", relabelAbout);
  else relabelAbout();
})();

(function () {
  var s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/gh/Know0necw/green-acres-hemp-preview@9667d82c76a4a59c4b448926951347f48dea3d35/assets/preview.js";
  s.defer = true;
  document.head.appendChild(s);
})();
