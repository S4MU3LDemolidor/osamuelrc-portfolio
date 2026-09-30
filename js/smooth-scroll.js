/* Smooth (inertia) scrolling with Lenis.
   Mouse wheel and trackpad only; phones and tablets keep native touch
   scrolling. Skipped when "reduce motion" is on or if the library fails
   to load, so the page always scrolls normally. */
(function () {
  "use strict";

  if (!window.Lenis) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  window.lenis = new Lenis({
    lerp: 0.1,       // lower = smoother/slower, higher = snappier
    autoRaf: true,
    // In-page links (#work, #faq…) glide to their section. Lenis reads
    // scroll-padding-top from styles.css, so they stop below the fixed nav.
    anchors: true
  });
})();
