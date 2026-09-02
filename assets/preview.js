(function () {
  var menuBtn = document.querySelector('button[aria-label="Open menu"]');
  var mobileNav = document.getElementById("mobile-nav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  document.querySelectorAll('button[aria-label^="Cart"]').forEach(function (btn) {
    btn.addEventListener("click", function () {
      alert("Prototype preview — checkout is not live. Call 719-206-HEMP to order.");
    });
  });

  var params = new URLSearchParams(window.location.search);
  var cat = params.get("cat");
  if (cat) {
    var cards = document.querySelectorAll("[data-product-cat]");
    if (cards.length) {
      cards.forEach(function (el) {
        if (el.getAttribute("data-product-cat") !== cat) el.style.display = "none";
      });
    }
    document.querySelectorAll('a[href*="cat="]').forEach(function (a) {
      try {
        var href = new URL(a.getAttribute("href"), window.location.href);
        if (href.searchParams.get("cat") === cat) {
          a.classList.add("active");
          a.style.background = "var(--fg)";
          a.style.color = "var(--bg)";
        } else {
          a.classList.remove("active");
        }
      } catch (e) {}
    });
    var allChip = document.querySelector('a[href="shop.html"]:not([href*="cat"])');
    if (allChip) {
      allChip.classList.remove("active");
      allChip.removeAttribute("aria-current");
      allChip.style.background = "";
      allChip.style.color = "";
    }
  }

  var form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      try {
        var notes = JSON.parse(localStorage.getItem("ga-preview-notes") || "[]");
        notes.push({ at: new Date().toISOString(), data: data });
        localStorage.setItem("ga-preview-notes", JSON.stringify(notes));
      } catch (err) {}
      alert("Note saved on this device. For a live order, call 719-206-HEMP.");
      form.reset();
    });
  }
})();
