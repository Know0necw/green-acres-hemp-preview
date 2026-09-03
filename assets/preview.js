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
    "products/capsules.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2018/11/20190411_200645-1.jpg",
    "products/mct-capsules.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2020/08/CASE-MCT-CAPS-PURPLE-scaled.jpg",
    "products/mct-capsules-case.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2020/08/CASE-MCT-CAPS-PURPLE-scaled.jpg",
    "products/olive-oil-capsules-case.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2020/08/CASE-PLIVE-CAPS-GREEN-scaled.jpg",
    "products/limbo-2oz-case.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2020/07/20200702_212315-scaled.jpg",
    "products/limbo-2oz-studio.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2015/06/2oz-stainless-e1544376650159.jpg",
    "products/limbo-3oz-studio.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2017/01/roll-on.jpg",
    "products/lip-balm.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2017/01/20181206_082856.jpg",
    "products/olive-oil.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2018/11/tincture-full-spec.-label.jpg",
    "products/pet.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2024/09/MCT-PET-TINCTURE-scaled.jpg",
    "products/pump.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2017/09/20181206_083616.jpg",
    "products/pump-4oz.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2017/09/20181206_083616.jpg",
    "products/pump-8oz.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2019/04/20190411_195332.jpg",
    "products/sandals.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2015/08/tan-hemp-sandals.jpg",
    "products/tincture.jpg": "https://greenacreshempfarm.com/wp-content/uploads/2019/10/mct-tincture-2.jpg",
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
  var CART_KEY = "ga-preview-cart";
  var NOTES_KEY = "ga-preview-notes";
  var ORDERS_KEY = "ga-preview-orders";

  function isRetiredProduct(item) {
    if (!item) return false;
    var id = String(item.id || "");
    var href = String(item.href || "");
    return id === "cbd-gummy-bears" || href.indexOf("product-cbd-gummy-bears") !== -1;
  }
  function getCart() {
    try {
      var items = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      if (!Array.isArray(items)) return [];
      var cleaned = items.filter(function (i) { return !isRetiredProduct(i); });
      if (cleaned.length !== items.length) localStorage.setItem(CART_KEY, JSON.stringify(cleaned));
      return cleaned;
    } catch (e) {
      return [];
    }
  }
  function setCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartButtons();
  }
  function cartCount(items) {
    return (items || getCart()).reduce(function (n, i) { return n + (Number(i.qty) || 0); }, 0);
  }
  function cartTotal(items) {
    return (items || getCart()).reduce(function (n, i) {
      return n + (Number(i.price) || 0) * (Number(i.qty) || 0);
    }, 0);
  }
  function money(n) {
    var v = Number(n) || 0;
    return v % 1 === 0 ? "$" + v : "$" + v.toFixed(2);
  }
  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function updateCartButtons() {
    var count = cartCount();
    document.querySelectorAll('button[aria-label^="Cart"], a[data-cart-link], a[aria-label^="Cart"]').forEach(function (btn) {
      btn.setAttribute("aria-label", "Cart, " + count + " items");
      var badge = btn.querySelector(".cart-count");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "cart-count";
        btn.appendChild(badge);
      }
      if (count > 0) {
        badge.hidden = false;
        badge.textContent = String(count);
      } else {
        badge.hidden = true;
        badge.textContent = "";
      }
    });
  }

  var menuBtn = document.querySelector('button[aria-label="Open menu"], button[aria-label="Close menu"]');
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
      window.location.href = "cart.html";
    });
  });

  updateCartButtons();

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

  document.querySelectorAll('form[data-preview-cart="add"]').forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var id = String(fd.get("id") || "");
      var qty = Math.max(1, parseInt(fd.get("qty"), 10) || 1);
      var items = getCart();
      var found = items.filter(function (i) { return i.id === id; })[0];
      if (found) {
        found.qty = (Number(found.qty) || 0) + qty;
      } else {
        items.push({
          id: id,
          name: String(fd.get("name") || "Farm product"),
          price: parseFloat(fd.get("price")) || 0,
          image: String(fd.get("image") || ""),
          href: "product-" + id + ".html",
          qty: qty
        });
      }
      setCart(items);
      window.location.href = "cart.html";
    });
  });

  function renderCart() {
    var root = document.getElementById("cart-root");
    if (!root) return;
    var items = getCart();
    if (!items.length) {
      root.innerHTML = '<div class="cart-empty"><p class="text-muted">Your cart is empty.</p><a href="shop.html" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-fg hover:opacity-90 h-11 px-5 mt-6">Shop the farm</a></div>';
      return;
    }
    var rows = items.map(function (item, index) {
      return '<article class="cart-row" data-index="' + index + '">' +
        '<img src="' + escapeHtml(item.image) + '" alt="">' +
        '<div><a href="' + escapeHtml(item.href || ("product-" + item.id + ".html")) + '" class="font-display text-lg font-medium">' + escapeHtml(item.name) + '</a>' +
        '<p class="text-sm text-muted mt-1">' + money(item.price) + ' each</p>' +
        '<label class="text-xs uppercase tracking-wider text-muted">Quantity <input class="qty-input flex h-11 rounded-md border border-border bg-card px-3 text-sm mt-1" type="number" min="1" max="99" value="' + Number(item.qty) + '" data-cart-qty="' + index + '"></label>' +
        '<button type="button" class="text-sm text-muted mt-2 hover:opacity-80" data-cart-remove="' + index + '">Remove</button></div>' +
        '<p class="tabular-nums font-medium">' + money(item.price * item.qty) + '</p></article>';
    }).join("");
    root.innerHTML = '<div class="cart-list">' + rows + '</div>' +
      '<div class="cart-total"><p class="font-display text-2xl font-medium">Total ' + money(cartTotal(items)) + '</p>' +
      '<a href="checkout.html" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-fg hover:opacity-90 h-11 px-5">Checkout</a></div>' +
      '<p class="mt-4 text-sm text-muted">Prototype only — no card is charged. Call 719-206-HEMP to complete the order.</p>';

    root.querySelectorAll("[data-cart-qty]").forEach(function (input) {
      input.addEventListener("change", function () {
        var i = parseInt(input.getAttribute("data-cart-qty"), 10);
        var next = getCart();
        var q = Math.max(1, parseInt(input.value, 10) || 1);
        if (next[i]) next[i].qty = q;
        setCart(next);
        renderCart();
      });
    });
    root.querySelectorAll("[data-cart-remove]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = parseInt(btn.getAttribute("data-cart-remove"), 10);
        var next = getCart();
        next.splice(i, 1);
        setCart(next);
        renderCart();
      });
    });
  }
  renderCart();

  function renderCheckoutSummary() {
    var root = document.getElementById("checkout-summary");
    if (!root) return;
    var items = getCart();
    if (!items.length) {
      root.innerHTML = '<p class="text-muted">Your cart is empty.</p><a href="shop.html" class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary text-primary-fg h-11 px-5 mt-4">Shop the farm</a>';
      var form = document.getElementById("checkout-form");
      if (form) form.hidden = true;
      return;
    }
    var lines = items.map(function (item) {
      return '<li class="flex justify-between gap-4 py-2 border-b border-border"><span>' + escapeHtml(item.name) + ' × ' + Number(item.qty) + '</span><span class="tabular-nums">' + money(item.price * item.qty) + '</span></li>';
    }).join("");
    root.innerHTML = '<h2 class="font-display text-2xl font-medium">Quantity summary</h2><ul class="mt-4">' + lines + '</ul>' +
      '<p class="mt-4 font-display text-xl font-medium">Total ' + money(cartTotal(items)) + '</p>' +
      '<p class="mt-4 text-sm text-muted">No card is charged on this prototype. Call <a href="tel:+17192064367" class="text-primary">719-206-HEMP</a> (719-206-4367) to complete the order. Live checkout remains on the real farm store.</p>';
  }
  renderCheckoutSummary();

  var checkoutForm = document.querySelector('form[data-preview-cart="checkout"]');
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var items = getCart();
      if (!items.length) return;
      var data = {};
      new FormData(checkoutForm).forEach(function (v, k) { data[k] = v; });
      try {
        var orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
        orders.push({ at: new Date().toISOString(), contact: data, items: items, total: cartTotal(items) });
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      } catch (err) {}
      var thanks = document.getElementById("checkout-thanks");
      if (thanks) thanks.hidden = false;
      alert("Prototype only — no card was charged. Call 719-206-HEMP (719-206-4367) to complete this order with Jim or Lisa.");
    });
  }

  document.querySelectorAll("form").forEach(function (form) {
    if (form.getAttribute("data-preview-cart")) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      try {
        var notes = JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
        notes.push({ at: new Date().toISOString(), data: data });
        localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      } catch (err) {}
      alert("Note saved on this device. For a live order, call 719-206-HEMP.");
      form.reset();
    });
  });
})();
