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
  var extra = document.createElement("link");
  extra.rel = "stylesheet";
  extra.href = "assets/theme-product.css";
  document.head.appendChild(extra);
  document.querySelectorAll('a[href*="shop.html#"]').forEach(function (a) {
    var href = a.getAttribute("href") || "";
    var hash = href.split("#")[1];
    if (hash) a.setAttribute("href", "product-" + hash + ".html");
  });
})();
