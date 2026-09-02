(function () {
  document.querySelectorAll('a[href*="shop.html#"]').forEach(function (a) {
    var href = a.getAttribute("href") || "";
    var hash = href.split("#")[1];
    if (hash) a.setAttribute("href", "product-" + hash + ".html");
  });

  if (!document.body || document.body.getAttribute("data-preview-shell") !== "1") return;
  var logo = "https://greenacreshempfarm.com/wp-content/uploads/2017/07/greenacres-hemp-farm-logo-005.png";
  var header = document.createElement("header");
  header.className = "sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur-sm";
  header.innerHTML =
    '<div class="hidden items-center justify-between border-b border-border px-4 py-2 text-xs text-muted sm:flex md:px-8">' +
    "<p>Alamosa, Colorado · 7am – 10pm Mountain, seven days a week</p>" +
    '<a href="tel:+17192064367" class="inline-flex items-center gap-1.5 font-medium text-fg">Call Jim &amp; Lisa Strang · 719-206-HEMP</a></div>' +
    '<div class="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 md:h-[4.5rem] md:px-8">' +
    '<a href="index.html" class="flex items-center gap-3" aria-label="Green Acres Hemp Farm"><img src="' + logo + '" alt="Green Acres Hemp Farm" class="mark h-12 w-auto md:h-14"></a>' +
    '<nav class="ml-auto hidden items-center gap-1 lg:flex">' +
    '<a href="shop.html" class="rounded-md px-3 py-2 text-sm text-fg">Shop</a>' +
    '<a href="about.html" class="rounded-md px-3 py-2 text-sm text-muted hover:text-fg">The Farm</a>' +
    '<a href="hemp.html" class="rounded-md px-3 py-2 text-sm text-muted hover:text-fg">The Plant</a>' +
    '<a href="gallery.html" class="rounded-md px-3 py-2 text-sm text-muted hover:text-fg">Gallery</a>' +
    '<a href="lab.html" class="rounded-md px-3 py-2 text-sm text-muted hover:text-fg">Lab</a>' +
    '<a href="contact.html" class="rounded-md px-3 py-2 text-sm text-muted hover:text-fg">Contact</a></nav>' +
    '<div class="ml-auto flex items-center lg:ml-2">' +
    '<a href="cart.html" class="relative grid size-11 place-items-center rounded-md text-fg" aria-label="Cart, 0 items" data-cart-link="true">Cart</a>' +
    '<button type="button" class="grid size-11 place-items-center rounded-md lg:hidden" aria-label="Open menu">Menu</button></div></div>' +
    '<nav id="mobile-nav" class="mobile-nav"><a href="shop.html" class="active">Shop</a><a href="about.html">The Farm</a><a href="hemp.html">The Plant</a><a href="gallery.html">Gallery</a><a href="lab.html">Lab</a><a href="contact.html">Contact</a><a href="cart.html">Cart</a><a href="tel:+17192064367">Call 719-206-HEMP</a></nav>';
  var banner = document.querySelector(".preview-banner");
  if (banner && banner.parentNode) banner.parentNode.insertBefore(header, banner.nextSibling);
  else document.body.insertBefore(header, document.body.firstChild);

  var footer = document.createElement("footer");
  footer.className = "mt-auto border-t border-border bg-fg text-primary-fg";
  footer.innerHTML =
    '<div class="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">' +
    '<div class="md:col-span-2"><img src="' + logo + '" alt="" class="mark mb-5 h-16 w-auto">' +
    '<p class="max-w-md text-sm leading-relaxed text-primary-fg/75">A commercially licensed industrial hemp farm. We grow it, make it, and sell it — from the leaf and bud of our own plants in Alamosa, Colorado.</p></div>' +
    '<div><p class="text-xs font-medium uppercase tracking-wider text-primary-fg/55">Visit</p><ul class="mt-3 space-y-2 text-sm">' +
    '<li><a href="shop.html" class="hover:opacity-80">Shop</a></li><li><a href="about.html" class="hover:opacity-80">The Farm</a></li>' +
    '<li><a href="hemp.html" class="hover:opacity-80">The Plant</a></li><li><a href="gallery.html" class="hover:opacity-80">Gallery</a></li>' +
    '<li><a href="lab.html" class="hover:opacity-80">Lab results</a></li></ul></div>' +
    '<div><p class="text-xs font-medium uppercase tracking-wider text-primary-fg/55">Jim &amp; Lisa Strang</p>' +
    '<ul class="mt-3 space-y-2 text-sm text-primary-fg/85">' +
    '<li><a href="tel:+17192064367">719-206-HEMP (719) 206-4367</a></li>' +
    '<li><a href="https://maps.google.com/?q=6344+County+Rd+116+S,+Alamosa,+CO+81101">6344 County Rd. 116 S<br>Alamosa, CO 81101</a></li>' +
    "<li>7am – 10pm Mountain, seven days a week</li></ul></div></div>";
  document.body.appendChild(footer);
})();
