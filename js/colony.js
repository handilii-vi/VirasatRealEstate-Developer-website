/* ==========================================================
   colony.js  |  colony pages only:
   tabs, gallery lightbox, zoomable map viewer
   ========================================================== */
(function(){
  var I = window.VI18n;

  /* ---------- tabs ---------- */
  function tabs(){
    var btns = document.querySelectorAll(".tab[data-tab]"), panels = document.querySelectorAll(".panel");
    if(!btns.length) return;
    function show(id, scroll){
      var found = false;
      panels.forEach(function(p){ var on = p.id === id; p.classList.toggle("on", on); if(on) found = true; });
      if(!found) return show("overview", scroll);
      btns.forEach(function(b){
        var on = b.getAttribute("data-tab") === id; b.classList.toggle("on", on); b.setAttribute("aria-selected", on);
        // keep the active tab visible inside the (mobile) tab strip without moving the page
        if(on && b.parentNode.scrollWidth > b.parentNode.clientWidth){
          b.parentNode.scrollTo({left: b.offsetLeft - (b.parentNode.clientWidth - b.offsetWidth)/2, behavior: "smooth"});
        }
      });
      if(scroll && history.replaceState) history.replaceState(null, "", "#" + id);   // only when the visitor clicks (changing the URL during page load makes the browser jump)
      var bar = document.querySelector(".tabs");
      if(scroll && bar){
        var y = bar.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--hh"))||70) + 1;
        window.scrollTo({top:y, behavior:"smooth"});
      }
      document.dispatchEvent(new CustomEvent("tabshown", {detail:id}));
    }
    btns.forEach(function(b){ b.addEventListener("click", function(){ show(b.getAttribute("data-tab"), true); }); });
    // any link like <a href="#connect"> switches tab
    document.addEventListener("click", function(e){
      var a = e.target.closest('a[href^="#"]');
      if(!a) return;
      var id = a.getAttribute("href").slice(1);
      if(document.getElementById(id) && document.getElementById(id).classList.contains("panel")){ e.preventDefault(); show(id, true); }
    });
    var start = (location.hash || "#overview").slice(1);
    show(document.getElementById(start) ? start : "overview", false);
    window.addEventListener("hashchange", function(){ var h = location.hash.slice(1); if(document.getElementById(h) && document.getElementById(h).classList.contains("panel")) show(h, false); });
  }

  /* ---------- lightbox ---------- */
  function lightbox(){
    var figs = Array.prototype.slice.call(document.querySelectorAll(".gal figure"));
    if(!figs.length) return;
    var lb = document.createElement("div");
    lb.className = "lb"; lb.setAttribute("role","dialog"); lb.setAttribute("aria-modal","true");
    lb.innerHTML = '<span class="lb-c"></span>'+
      '<button class="lb-b lb-x" type="button" aria-label="Close">'+VIcon("x")+'</button>'+
      '<button class="lb-b lb-p" type="button" aria-label="Previous">'+VIcon("left")+'</button>'+
      '<button class="lb-b lb-n" type="button" aria-label="Next">'+VIcon("right")+'</button>'+
      '<figure><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(lb);
    var img = lb.querySelector("img"), cap = lb.querySelector("figcaption"), cnt = lb.querySelector(".lb-c"), cur = 0;
    function go(i){
      cur = (i + figs.length) % figs.length;
      var f = figs[cur], im = f.querySelector("img"), c = f.querySelector("figcaption");
      img.src = im.currentSrc || im.src; img.alt = im.alt;
      cap.innerHTML = c ? c.innerHTML : "";
      cnt.textContent = (cur+1) + " / " + figs.length;
    }
    function open(i){ go(i); lb.classList.add("show"); document.body.classList.add("nolock"); }
    function close(){ lb.classList.remove("show"); document.body.classList.remove("nolock"); }
    figs.forEach(function(f,i){
      f.tabIndex = 0; f.setAttribute("role","button");
      f.addEventListener("click", function(){ open(i); });
      f.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); open(i); } });
    });
    lb.querySelector(".lb-x").addEventListener("click", close);
    lb.querySelector(".lb-p").addEventListener("click", function(){ go(cur-1); });
    lb.querySelector(".lb-n").addEventListener("click", function(){ go(cur+1); });
    lb.addEventListener("click", function(e){ if(e.target === lb || e.target.tagName === "FIGURE") close(); });
    document.addEventListener("keydown", function(e){
      if(!lb.classList.contains("show")) return;
      if(e.key === "Escape") close(); if(e.key === "ArrowLeft") go(cur-1); if(e.key === "ArrowRight") go(cur+1);
    });
    var sx = 0;
    lb.addEventListener("touchstart", function(e){ sx = e.touches[0].clientX; }, {passive:true});
    lb.addEventListener("touchend", function(e){ var dx = e.changedTouches[0].clientX - sx; if(Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1)); });
  }

  /* ---------- zoomable map viewer ---------- */
  function viewer(box){
    var img = box.querySelector("img"), s = 1, x = 0, y = 0, min = 1, max = 8;
    var pts = {}, last = null;
    function fit(){
      var bw = box.clientWidth, bh = box.clientHeight, iw = img.naturalWidth, ih = img.naturalHeight;
      if(!iw || !bw || !bh) return;
      img.style.width = iw + "px"; img.style.height = ih + "px";
      min = Math.min(bw/iw, bh/ih); s = min; max = Math.max(min*8, 3);
      x = (bw - iw*s)/2; y = (bh - ih*s)/2; draw();
    }
    function clamp(){
      var bw = box.clientWidth, bh = box.clientHeight, w = img.naturalWidth*s, h = img.naturalHeight*s;
      x = w <= bw ? (bw - w)/2 : Math.min(0, Math.max(bw - w, x));
      y = h <= bh ? (bh - h)/2 : Math.min(0, Math.max(bh - h, y));
    }
    function draw(){ clamp(); img.style.transform = "translate("+x+"px,"+y+"px) scale("+s+")"; }
    function zoom(f, cx, cy){
      var ns = Math.min(max, Math.max(min, s*f)); f = ns/s;
      x = cx - (cx - x)*f; y = cy - (cy - y)*f; s = ns; draw();
    }
    function center(){ var r = box.getBoundingClientRect(); return [r.width/2, r.height/2]; }
    if(img.complete) fit(); else img.addEventListener("load", fit);
    window.addEventListener("resize", fit);
    document.addEventListener("fullscreenchange", function(){ setTimeout(fit, 120); });
    document.addEventListener("tabshown", function(){ setTimeout(fit, 30); });

    box.addEventListener("wheel", function(e){
      e.preventDefault();
      var r = box.getBoundingClientRect();
      zoom(e.deltaY < 0 ? 1.18 : 1/1.18, e.clientX - r.left, e.clientY - r.top);
    }, {passive:false});
    box.addEventListener("pointerdown", function(e){
      if(e.target.closest(".mv-ctl")) return;
      box.setPointerCapture(e.pointerId); pts[e.pointerId] = {x:e.clientX, y:e.clientY}; box.classList.add("drag");
      last = null;
    });
    box.addEventListener("pointermove", function(e){
      if(!pts[e.pointerId]) return;
      var ids = Object.keys(pts), p = pts[e.pointerId];
      if(ids.length === 1){
        x += e.clientX - p.x; y += e.clientY - p.y; draw();
      }else if(ids.length === 2){
        var o = pts[ids[0] == e.pointerId ? ids[1] : ids[0]], nx = e.clientX, ny = e.clientY;
        var d0 = Math.hypot(p.x - o.x, p.y - o.y), d1 = Math.hypot(nx - o.x, ny - o.y);
        var r = box.getBoundingClientRect();
        if(d0 > 0) zoom(d1/d0, (nx + o.x)/2 - r.left, (ny + o.y)/2 - r.top);
      }
      pts[e.pointerId] = {x:e.clientX, y:e.clientY};
    });
    function up(e){ delete pts[e.pointerId]; if(!Object.keys(pts).length) box.classList.remove("drag"); }
    box.addEventListener("pointerup", up); box.addEventListener("pointercancel", up);
    box.addEventListener("dblclick", function(e){ var r = box.getBoundingClientRect(); zoom(2, e.clientX - r.left, e.clientY - r.top); });

    var ctl = box.querySelector(".mv-ctl");
    ctl.addEventListener("click", function(e){
      var b = e.target.closest("button"); if(!b) return;
      var a = b.getAttribute("data-a"), c = center();
      if(a === "in") zoom(1.5, c[0], c[1]);
      if(a === "out") zoom(1/1.5, c[0], c[1]);
      if(a === "reset") fit();
      if(a === "full"){
        if(document.fullscreenElement) document.exitFullscreen();
        else if(box.requestFullscreen) box.requestFullscreen();
        else { var u = img.src; window.open(u, "_blank"); }
      }
    });
  }

  function init(){
    tabs(); lightbox();
    document.querySelectorAll(".mv").forEach(viewer);
  }
  document.addEventListener("layoutready", init);
})();
