(function () {
  var media = {
    "brand/logo.png": "https://greenacreshempfarm.com/wp-content/uploads/2017/07/greenacres-hemp-farm-logo-005.png",
    "images/hero-field.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2015/05/2024-FIELD-GROW.jpg",
    "images/farmstead.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2014/09/green_acres_farm.jpg",
    "images/hemp-closeup.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2015/05/hempplant.jpg",
    "gallery/drying.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2023/10/20231025_103135-scaled.jpg",
    "gallery/farmstead.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2014/09/green_acres_farm.jpg",
    "gallery/field.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2015/05/2024-FIELD-GROW.jpg",
    "gallery/hemp.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2015/05/hempplant.jpg",
    "gallery/sunrise.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2015/05/2024-FIELD-GROW-SUNSET-SHERBERT-scaled.jpg",
    "gallery/valley.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2015/05/20160907_095111.jpg",
    "products/capsules.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2018/11/olive-capsules.jpg",
    "products/gummies.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2024/09/gummy-bears-scaled.jpg",
    "products/limbo-2oz-studio.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2024/09/limbo-lotion-scaled.jpg",
    "products/limbo-3oz-studio.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2017/01/limbo-lotion-3FLoz-Front.png",
    "products/lip-balm.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2024/09/lip-balm-scaled.jpg",
    "products/olive-oil.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2024/09/olive-oil-cbd-scaled.jpg",
    "products/pet.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2024/09/MCT-PET-TINCTURE-scaled.jpg",
    "products/pump.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2024/09/limbo-lotion-scaled.jpg",
    "products/sandals.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2015/08/tan-hemp-sandals.jpg",
    "products/tincture.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2019/10/MCT-TINCTURE.jpg",
    "og.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2015/05/2024-FIELD-GROW.jpg"
  };
  function rewrite(val) {
    if (!val) return val;
    var key = val.split("?")[0].replace(/^\.\//, "");
    return media[key] || val;
  }
  document.querySelectorAll("img[src], source[src], link[href], meta[content]").forEach(function (el) {
    if (el.hasAttribute("src")) el.setAttribute("src", rewrite(el.getAttribute("src")));
    if (el.hasAttribute("href")) el.setAttribute("href", rewrite(el.getAttribute("href")));
    if (el.hasAttribute("content")) el.setAttribute("content", rewrite(el.getAttribute("content")));
  });
})();

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
