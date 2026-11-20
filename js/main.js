/* ==========================================================
   main.js  |  preloader, sticky header, mobile menu,
   scroll reveal, number counters, hero video
   ========================================================== */
(function(){
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* preloader */
  function hidePre(){
    var p = document.getElementById("pre"); if(!p) return;
    p.classList.add("hide"); setTimeout(function(){ if(p.parentNode) p.parentNode.removeChild(p); }, 900);
  }
  window.addEventListener("load", function(){ setTimeout(hidePre, reduce ? 0 : 900); });
  setTimeout(hidePre, 4000);   // safety

  function init(){
    var hdr = document.getElementById("hdr");

    /* header: solid after scrolling, and publish its height as --hh */
    function onScroll(){
      if(hdr) hdr.classList.toggle("solid", window.scrollY > 40);
    }
    function setHH(){
      if(hdr) document.documentElement.style.setProperty("--hh", hdr.offsetHeight + "px");
    }
    onScroll(); setHH();
    window.addEventListener("scroll", onScroll, {passive:true});
    window.addEventListener("resize", setHH);
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(setHH);
    // keep --hh at the solid (smaller) height so sticky tabs sit right under it
    window.addEventListener("scroll", function(){ setTimeout(setHH, 450); }, {passive:true, once:true});

    /* mobile menu */
    var mm = document.getElementById("mm"), burger = document.getElementById("burger"), mmx = document.getElementById("mmx");
    function openMM(){ mm.classList.add("open"); document.body.classList.add("nolock"); }
    function closeMM(){ mm.classList.remove("open"); document.body.classList.remove("nolock"); }
    if(burger && mm){
      burger.addEventListener("click", openMM);
      mmx.addEventListener("click", closeMM);
      mm.addEventListener("click", function(e){ if(e.target.closest("nav a, .wa-link, .btn")) closeMM(); });
      document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeMM(); });
    }

    /* scroll reveal */
    var rv = document.querySelectorAll(".rv, .rv-l");
    if("IntersectionObserver" in window && !reduce){
      var io = new IntersectionObserver(function(es){
        es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
      }, {threshold:.12, rootMargin:"0px 0px -6% 0px"});
      rv.forEach(function(el){ io.observe(el); });
    }else{
      rv.forEach(function(el){ el.classList.add("in"); });
    }

    /* counters: <b data-count="420" data-suffix="+"> */
    var cs = document.querySelectorAll("[data-count]");
    function run(el){
      var end = parseFloat(el.getAttribute("data-count")), suf = el.getAttribute("data-suffix")||"", pre = el.getAttribute("data-prefix")||"";
      var fmt = function(n){ return pre + Math.round(n).toLocaleString("en-IN") + suf; };
      if(reduce){ el.textContent = fmt(end); return; }
      var t0 = null, dur = 1800;
      function step(ts){
        if(!t0) t0 = ts;
        var p = Math.min((ts - t0)/dur, 1), e = 1 - Math.pow(1-p, 3);
        el.textContent = fmt(end*e);
        if(p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if("IntersectionObserver" in window){
      var co = new IntersectionObserver(function(es){
        es.forEach(function(en){ if(en.isIntersecting){ run(en.target); co.unobserve(en.target); } });
      }, {threshold:.5});
      cs.forEach(function(el){ co.observe(el); });
    }else{ cs.forEach(run); }

    /* hero video: shows only if videos/hero.mp4 really exists */
    var v = document.getElementById("hero-video");
    if(v){
      v.addEventListener("canplay", function(){ v.classList.add("ready"); });
      v.addEventListener("error", function(){ v.remove(); });
      var src = v.querySelector("source");
      if(src) src.addEventListener("error", function(){ v.remove(); });
      var pr = v.play(); if(pr && pr.catch) pr.catch(function(){});
    }
  }
  document.addEventListener("layoutready", init);
})();
