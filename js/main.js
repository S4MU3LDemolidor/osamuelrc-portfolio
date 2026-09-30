(function () {
  "use strict";

  var data = window.PORTFOLIO || { heroStrip: [], work: [] };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function img(src, alt) {
    var image = el("img");
    image.src = src;
    image.alt = alt || "";
    image.loading = "lazy";
    image.decoding = "async";
    return image;
  }

  var ICON_TREND =
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>';
  var ICON_EXPAND =
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></svg>';
  var ICON_CLOSE =
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICON_PREV =
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
  var ICON_NEXT =
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';

  function conceptTag() {
    var tag = el("span", "concept-tag", "Concept");
    tag.title = "Practice redesign, not commissioned by this channel";
    return tag;
  }

  // "Concept #6: Just Copy Me" for alt text and labels.
  function fullName(item) {
    return item.desc ? item.title + ": " + item.desc : item.title;
  }

  function abNote(text) {
    var note = el("p", "ab-note");
    note.appendChild(el("span", "ab-note-label", "A/B"));
    note.appendChild(document.createTextNode(text));
    return note;
  }

  /* ---------------- Hero strip ---------------- */
  function renderHeroStrip() {
    var track = document.getElementById("hero-strip");
    if (!track) return;

    var items = (data.heroStrip || []).slice();
    if (!items.length) items = [{ label: "Your thumbnail", image: "" }];
    // Keep the loop seamless on wide screens.
    var base = items.slice();
    while (items.length < 6) items = items.concat(base);

    function buildSet(hidden) {
      var frag = document.createDocumentFragment();
      items.forEach(function (item) {
        var card = el("div", "strip-card");
        if (hidden) card.setAttribute("aria-hidden", "true");
        if (item.image) {
          var picture = img(item.image, "");
          picture.loading = "eager"; // first thing on screen
          card.appendChild(picture);
          if (item.label) {
            card.classList.add("has-label");
            card.appendChild(el("span", "strip-label", item.label));
          }
        } else {
          card.appendChild(el("span", "ph-title", item.label || "Your thumbnail"));
          card.appendChild(el("span", "ph-sub", "Drop a thumbnail here"));
        }
        frag.appendChild(card);
      });
      return frag;
    }

    track.appendChild(buildSet(false));
    track.appendChild(buildSet(true));
  }

  /* ---------------- Work gallery ---------------- */
  function renderWork() {
    var grid = document.getElementById("work-grid");
    var filtersEl = document.getElementById("work-filters");
    var search = document.getElementById("work-search");
    var empty = document.getElementById("work-empty");
    if (!grid) return;

    var work = data.work || [];
    var cards = [];
    var lightbox = createLightbox(work);

    work.forEach(function (item, index) {
      var num = String(index + 1).padStart(2, "0");
      var hasB = item.variantB !== null && item.variantB !== undefined;

      var card = el("article", "work-card");
      var thumb = el("div", "thumb");
      var current = "A";
      // The category tag is only for placeholders; on real thumbnails it covered the headline.
      if (!item.variantA) thumb.appendChild(el("span", "thumb-tag", item.category));

      var media = el("div", "thumb-media");
      var variants = {};
      ["A", "B"].forEach(function (v) {
        if (v === "B" && !hasB) return;
        var src = v === "A" ? item.variantA : item.variantB;
        var wrap = el("div", "thumb-variant thumb-variant--" + v.toLowerCase());
        if (src) {
          wrap.appendChild(img(src, "Thumbnail for " + fullName(item) + " (variant " + v + ")"));
        } else {
          wrap.appendChild(el("span", "ph-title", "Thumbnail " + num));
          wrap.appendChild(el("span", "ph-sub", "Variant " + v + " · 1280 × 720"));
        }
        if (v === "B") wrap.hidden = true;
        variants[v] = wrap;
        media.appendChild(wrap);
      });
      thumb.appendChild(media);

      if (item.variantA) {
        var openBtn = el("button", "thumb-open");
        openBtn.type = "button";
        openBtn.setAttribute("aria-label", "View " + fullName(item) + " full size");
        openBtn.innerHTML = '<span class="thumb-zoom">' + ICON_EXPAND + "</span>";
        openBtn.addEventListener("click", function () { lightbox.open(index, current); });
        thumb.appendChild(openBtn);
      }

      if (hasB) {
        var ab = el("div", "ab");
        ab.setAttribute("role", "group");
        ab.setAttribute("aria-label", "Show thumbnail variant");
        ["A", "B"].forEach(function (v) {
          var b = el("button", null, v);
          b.type = "button";
          b.setAttribute("aria-pressed", v === "A" ? "true" : "false");
          b.setAttribute("aria-label", "Variant " + v);
          b.addEventListener("click", function () {
            ab.querySelectorAll("button").forEach(function (other) {
              other.setAttribute("aria-pressed", other === b ? "true" : "false");
            });
            variants.A.hidden = v !== "A";
            variants.B.hidden = v !== "B";
            current = v;
          });
          ab.appendChild(b);
        });
        thumb.appendChild(ab);
      }

      card.appendChild(thumb);
      card.appendChild(el("h3", "work-title", item.title));
      if (hasB && item.abNote) card.appendChild(abNote(item.abNote));

      // No channel (personal project) and no views = no meta row at all.
      var meta = el("div", "work-meta");
      if (item.channel) {
        var avatar = el("span", "avatar");
        if (item.avatar) avatar.appendChild(img(item.avatar, ""));
        meta.appendChild(avatar);
        meta.appendChild(el("span", "channel", item.channel));
      }
      if (item.concept) meta.appendChild(conceptTag());
      if (item.views) {
        var views = el("span", "views");
        views.innerHTML = ICON_TREND;
        views.appendChild(document.createTextNode(item.views));
        meta.appendChild(views);
      }
      if (meta.childNodes.length) card.appendChild(meta);

      grid.appendChild(card);
      cards.push({
        node: card,
        category: item.category,
        haystack: [item.title, item.desc, item.channel, item.category, item.concept ? "concept" : "", "thumbnail " + num].join(" ").toLowerCase()
      });
    });

    /* filters */
    var categories = ["All"];
    work.forEach(function (item) {
      if (categories.indexOf(item.category) === -1) categories.push(item.category);
    });

    var state = { category: "All", query: "" };

    categories.forEach(function (cat) {
      var b = el("button", "filter", cat);
      b.type = "button";
      b.setAttribute("aria-pressed", cat === "All" ? "true" : "false");
      b.addEventListener("click", function () {
        state.category = cat;
        filtersEl.querySelectorAll(".filter").forEach(function (f) {
          f.setAttribute("aria-pressed", f === b ? "true" : "false");
        });
        apply();
      });
      filtersEl.appendChild(b);
    });

    var searchTimer;
    search.addEventListener("input", function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function () {
        state.query = search.value.trim().toLowerCase();
        apply();
      }, 120);
    });

    function apply() {
      var shown = 0;
      cards.forEach(function (c) {
        var match =
          (state.category === "All" || c.category === state.category) &&
          (!state.query || c.haystack.indexOf(state.query) !== -1);
        c.node.hidden = !match;
        c.node.classList.remove("is-entering");
        if (match) {
          c.node.style.setProperty("--i", shown);
          shown++;
        }
      });

      if (!reduceMotion) {
        void grid.offsetWidth; // restart the entrance animation
        cards.forEach(function (c) {
          if (!c.node.hidden) c.node.classList.add("is-entering");
        });
      }

      empty.hidden = shown > 0;
      if (!shown) {
        empty.textContent = "";
        empty.appendChild(
          document.createTextNode(
            state.query ? "No thumbnails match “" + search.value.trim() + "”. " : "Nothing here yet. "
          )
        );
        var reset = el("button", null, "Show all work");
        reset.type = "button";
        reset.addEventListener("click", function () {
          search.value = "";
          state.query = "";
          filtersEl.querySelector(".filter").click();
        });
        empty.appendChild(reset);
      }
    }
  }

  /* ---------------- Lightbox: click a thumbnail to see it full size ---------------- */
  function createLightbox(work) {
    var list = [];
    work.forEach(function (item, i) { if (item.variantA) list.push({ item: item, index: i }); });

    var root = el("div", "lightbox");
    root.hidden = true;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-labelledby", "lb-title");
    root.setAttribute("data-lenis-prevent", "");
    root.innerHTML =
      '<div class="lb-backdrop" data-lb-close></div>' +
      '<button type="button" class="lb-btn lb-close" data-lb-close aria-label="Close">' + ICON_CLOSE + "</button>" +
      '<button type="button" class="lb-btn lb-prev" aria-label="Previous thumbnail">' + ICON_PREV + "</button>" +
      '<button type="button" class="lb-btn lb-next" aria-label="Next thumbnail">' + ICON_NEXT + "</button>" +
      '<figure class="lb-figure">' +
        '<div class="lb-media"><img class="lb-img" alt="" decoding="async"></div>' +
        '<figcaption class="lb-caption">' +
          '<div class="lb-text"><h3 class="lb-title" id="lb-title"></h3><div class="lb-meta"></div></div>' +
          '<div class="ab lb-ab" role="group" aria-label="Show thumbnail variant">' +
            '<button type="button" aria-label="Variant A">A</button><button type="button" aria-label="Variant B">B</button>' +
          "</div>" +
        "</figcaption>" +
      "</figure>";
    document.body.appendChild(root);

    var imgEl = root.querySelector(".lb-img");
    var titleEl = root.querySelector(".lb-title");
    var metaEl = root.querySelector(".lb-meta");
    var abEl = root.querySelector(".lb-ab");
    var abBtns = abEl.querySelectorAll("button");
    var closeBtn = root.querySelector(".lb-close");
    var prevBtn = root.querySelector(".lb-prev");
    var nextBtn = root.querySelector(".lb-next");
    var pos = 0, variant = "A", lastFocus = null;

    function render() {
      var item = list[pos].item;
      var hasB = !!item.variantB;
      if (!hasB) variant = "A";
      imgEl.src = variant === "B" ? item.variantB : item.variantA;
      imgEl.alt = "Thumbnail for " + fullName(item) + (hasB ? " (variant " + variant + ")" : "");
      titleEl.textContent = item.title;

      metaEl.textContent = "";
      if (item.channel) {
        var who = el("div", "lb-channel");
        who.appendChild(el("span", "channel", item.channel));
        if (item.concept) who.appendChild(conceptTag());
        metaEl.appendChild(who);
      }
      if (hasB && item.abNote) metaEl.appendChild(abNote(item.abNote));

      abEl.hidden = !hasB;
      abEl.setAttribute("data-active", variant);
      abBtns.forEach(function (b) { b.setAttribute("aria-pressed", b.textContent === variant ? "true" : "false"); });
      prevBtn.hidden = nextBtn.hidden = list.length < 2;
    }

    function open(workIndex, v) {
      for (var i = 0; i < list.length; i++) if (list[i].index === workIndex) pos = i;
      variant = v || "A";
      lastFocus = document.activeElement;
      render();
      root.hidden = false;
      document.documentElement.classList.add("lb-open");
      if (window.lenis) window.lenis.stop();
      requestAnimationFrame(function () { root.classList.add("is-visible"); });
      closeBtn.focus();
    }

    function close() {
      root.classList.remove("is-visible");
      root.hidden = true;
      document.documentElement.classList.remove("lb-open");
      if (window.lenis) window.lenis.start();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function step(d) {
      pos = (pos + d + list.length) % list.length;
      variant = "A";
      render();
    }

    root.addEventListener("click", function (e) {
      if (e.target.closest("[data-lb-close]")) close();
    });
    prevBtn.addEventListener("click", function () { step(-1); });
    nextBtn.addEventListener("click", function () { step(1); });
    abBtns.forEach(function (b) {
      b.addEventListener("click", function () { variant = b.textContent; render(); });
    });

    document.addEventListener("keydown", function (e) {
      if (root.hidden) return;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowLeft" && list.length > 1) step(-1);
      else if (e.key === "ArrowRight" && list.length > 1) step(1);
      else if (e.key === "Tab") {
        // keep keyboard focus inside the dialog
        var f = Array.prototype.filter.call(root.querySelectorAll("button"), function (b) { return b.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // swipe left/right on phones
    var touchX = null;
    root.querySelector(".lb-media").addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    root.querySelector(".lb-media").addEventListener("touchend", function (e) {
      if (touchX === null || list.length < 2) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    });

    return { open: open, close: close };
  }

  /* ---------------- FAQ accordion ---------------- */
  function initFaq() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var btn = item.querySelector("button");
      btn.addEventListener("click", function () {
        var willOpen = !item.classList.contains("is-open");
        items.forEach(function (other) {
          other.classList.remove("is-open");
          other.querySelector("button").setAttribute("aria-expanded", "false");
        });
        if (willOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---------------- Nav ---------------- */
  function initNav() {
    var wrap = document.querySelector(".nav-wrap");
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("mobile-menu");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.hidden = !open;
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 981px)").addEventListener("change", function (e) {
      if (e.matches) setOpen(false);
    });

    var ticking = false;
    function onScroll() {
      wrap.classList.toggle("is-scrolled", window.scrollY > 12);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
    onScroll();
  }

  /* ---------------- Copy email ---------------- */
  function initCopy() {
    var toast = document.getElementById("copy-toast");
    var hideTimer;
    document.querySelectorAll("[data-copy]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (!navigator.clipboard || !window.isSecureContext) return; // fall back to mailto
        e.preventDefault();
        navigator.clipboard.writeText(link.getAttribute("data-copy")).then(
          function () {
            toast.textContent = "Email copied. Paste it into your mail app";
            toast.classList.add("is-visible");
            clearTimeout(hideTimer);
            hideTimer = setTimeout(function () {
              toast.classList.remove("is-visible");
            }, 2400);
          },
          function () {
            window.location.href = link.href;
          }
        );
      });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  function initReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-visible"); });
      return;
    }

    // Stagger siblings that share a parent.
    var groups = new Map();
    nodes.forEach(function (n) {
      var list = groups.get(n.parentElement) || [];
      n.style.setProperty("--d", list.length % 6);
      list.push(n);
      groups.set(n.parentElement, list);
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---------------- Footer year ---------------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (n) {
      n.textContent = new Date().getFullYear();
    });
  }

  renderHeroStrip();
  renderWork();
  initFaq();
  initNav();
  initCopy();
  initReveal();
  initYear();
})();
