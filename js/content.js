/* =========================================================
   EDIT YOUR PORTFOLIO CONTENT HERE
   ---------------------------------------------------------
   Images: put files in the  thumbnails/  folder and reference
   them like  "thumbnails/my-thumb.webp"  (1280 × 720 works best).
   Leave an image as "" to show the styled placeholder.
   ========================================================= */

window.PORTFOLIO = {

  /* Tilted, auto-scrolling row of cards under the hero.
     - label: small tab shown above the card ("" = no tab)
     The first card starts half off-screen, so "Latest drop" goes second. */
  heroStrip: [
    { label: "",            image: "thumbnails/why-i-switched-A.webp" },
    { label: "Latest drop", image: "thumbnails/airrack.webp" },
    { label: "",            image: "thumbnails/invest-split-A.webp" },
    { label: "",            image: "thumbnails/just-copy-me-A.webp" },
    { label: "",            image: "thumbnails/donut-burger-A.webp" },
    { label: "",            image: "thumbnails/iman-gadzhi-million-A.webp" },
    { label: "",            image: "thumbnails/how-he-tricked-us-A.webp" }
  ],

  /* "Selected work" gallery. Cards with an image open full size on click.
     - title:    shown on the card ("Concept #15" for the next one)
     - desc:     short description, used for screen readers and search
     - category: used for the filter chips (new categories appear automatically)
     - variantA: image for variant A ("" = placeholder)
     - variantB: image for variant B ("" = placeholder, null = no A/B toggle)
     - abNote:   one line on what the A/B test compares ("" = hide)
     - views:    text for the white views badge ("" = hide the badge)
     - channel:  channel name ("" = personal project, hides the channel row)
     - avatar:   channel avatar image ("" = grey circle)
     - concept:  true = practice redesign (shows a "Concept" label next to the
                 channel name). Remove it once the creator actually hires you.
     Order: newest first, with all Gaming thumbnails grouped after the others. */
  work: [
    { category: "Entertainment", title: "Concept #8", desc: "Hiding in a suitcase at airport security", channel: "Airrack", concept: true, views: "", variantA: "thumbnails/airrack.webp", variantB: null, avatar: "" },
    { category: "Finance",     title: "Concept #7", desc: "The 50/25/25 Split", abNote: "Office vs. home studio background", channel: "", views: "", variantA: "thumbnails/invest-split-A.webp", variantB: "thumbnails/invest-split-B.webp", avatar: "" },
    { category: "Informative", title: "Concept #6", desc: "Just Copy Me", abNote: "“Just copy me” vs. “The Blueprint”", channel: "", views: "", variantA: "thumbnails/just-copy-me-A.webp", variantB: "thumbnails/just-copy-me-B.webp", avatar: "" },
    { category: "Food",        title: "Concept #5", desc: "So Disgusting", abNote: "1-star review bubble vs. no text", channel: "", views: "", variantA: "thumbnails/donut-burger-A.webp", variantB: "thumbnails/donut-burger-B.webp", avatar: "" },
    { category: "Finance",     title: "Concept #4", desc: "$1 Million", channel: "Iman Gadzhi", concept: true, views: "", variantA: "thumbnails/iman-gadzhi-million-A.webp", variantB: null, avatar: "" },
    { category: "Finance",     title: "Concept #3", desc: "How He Tricked All of Us", channel: "", views: "", variantA: "thumbnails/how-he-tricked-us-A.webp", variantB: null, avatar: "" },
    { category: "Tech",        title: "Concept #2", desc: "Why I Switched", abNote: "App logos vs. code editor background", channel: "Chris Raroque", concept: true, views: "", variantA: "thumbnails/why-i-switched-A.webp", variantB: "thumbnails/why-i-switched-B.webp", avatar: "thumbnails/avatar-chris-raroque.jpg" },
    { category: "Informative", title: "Concept #1", desc: "I Wish I Knew Sooner", channel: "Leo Gibson", concept: true, views: "", variantA: "thumbnails/gibson.webp", variantB: null, avatar: "thumbnails/avatar-leo-gibson.jpg" },
    { category: "Gaming",      title: "Concept #14", desc: "Valorant: “ENEMY”", channel: "", views: "", variantA: "thumbnails/valorant-6.webp", variantB: null, avatar: "" },
    { category: "Gaming",      title: "Concept #13", desc: "Valorant: Neon five-kill feed", channel: "", views: "", variantA: "thumbnails/valorant-5.webp", variantB: null, avatar: "" },
    { category: "Gaming",      title: "Concept #12", desc: "Valorant: “Fade ur sooo good!!!!”", channel: "", views: "", variantA: "thumbnails/valorant-4.webp", variantB: null, avatar: "" },
    { category: "Gaming",      title: "Concept #11", desc: "Valorant: “ur so smart wtf????”", channel: "", views: "", variantA: "thumbnails/valorant-3.webp", variantB: null, avatar: "" },
    { category: "Gaming",      title: "Concept #10", desc: "Valorant: “ISO IS BROKEN”", channel: "", views: "", variantA: "thumbnails/valorant-2.webp", variantB: null, avatar: "" },
    { category: "Gaming",      title: "Concept #9", desc: "Valorant: “You are insane fade”", channel: "", views: "", variantA: "thumbnails/valorant-1.webp", variantB: null, avatar: "" }
  ]
};
