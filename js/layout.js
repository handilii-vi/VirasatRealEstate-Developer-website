/* ==========================================================
   layout.js  |  builds the parts shared by every page:
   icon sprite, header, mobile menu, footer, lead popup,
   floating call / WhatsApp buttons, toast.
   Edit here once and every page updates.
   ========================================================== */
(function(){
  var C = window.VIRASAT, I = window.VI18n;
  var page = document.body.getAttribute("data-page") || "home";

  /* ---------- icons ---------- */
  var ICONS = {
    play:'<path d="M5 21V4h3v17M8 7h4l6 11M15 21h6"/>',
    temple:'<path d="M12 2v3M8 21V11l4-5 4 5v10M4 21h16M10 21v-4h4v4M9 11h6"/>',
    yoga:'<circle cx="12" cy="5" r="2"/><path d="M12 8v5M5 12l7 1 7-1M7 20l5-7 5 7"/>',
    gazebo:'<path d="M3 10l9-6 9 6M5 10v10M19 10v10M10 10v10M14 10v10M3 20h18"/>',
    gym:'<path d="M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12"/>',
    vastu:'<circle cx="12" cy="12" r="9"/><path d="M12 6l2.2 5.8L12 18l-2.2-6.2z"/>',
    shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    cctv:'<path d="M3 8l13-3 2 5-13 3zM11 13l-2 6M7 19h6"/>',
    road:'<path d="M8 3L5 21M16 3l3 18M12 4v3M12 10v4M12 17v3"/>',
    tree:'<path d="M12 21v-6M7 15a4 4 0 01-1-7 5 5 0 019-2 4 4 0 013 7 4 4 0 01-4 2H8a4 4 0 01-1 0z"/>',
    water:'<path d="M12 3c2.5 3.5 4 5.5 4 8a4 4 0 01-8 0c0-2.5 1.5-4.5 4-8z"/><path d="M3 18c3 0 3-2 6-2s3 2 6 2 3-2 6-2"/>',
    light:'<path d="M12 21V9M8 21h8M7 9h10l-2-5H9z"/>',
    theatre:'<path d="M3 17a9 9 0 0118 0M6.5 17a5.5 5.5 0 0111 0M10 17a2 2 0 014 0M3 21h18"/>',
    track:'<path d="M3 12a5 5 0 015-5h8a5 5 0 010 10H8a5 5 0 01-5-5z"/>',
    gate:'<path d="M4 21V8l8-4 8 4v13M4 21h16M9 21v-7h6v7"/>',
    ball:'<circle cx="12" cy="12" r="8.5"/><path d="M9 9h.01M14.5 8.5h.01M12 13h.01M16 13.5h.01M8.5 14.5h.01"/>',
    leaf:'<path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14zM5 19l8-8"/>',
    sign:'<path d="M12 3v18M5 5h11l3 3-3 3H5zM19 13H8l-3 3 3 3h11z"/>',
    wall:'<path d="M3 8h18v12H3zM3 12h18M3 16h18M9 8v4M15 12v4M9 16v4"/>',
    pool:'<path d="M7 3v12M15 3v12M7 7h8M7 11h8"/><path d="M2 19c2.5 0 2.5-1.5 5-1.5S9.5 19 12 19s2.5-1.5 5-1.5S19.5 19 22 19"/>',
    tank:'<path d="M7 3h10l1 6H6zM8 9v12M16 9v12M6 21h12M8 14h8"/>',
    plot:'<path d="M4 4h16v16H4zM4 12h16M12 4v16"/>',
    pin:'<path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    phone:'<path d="M5 3h4l2 5-2.5 1.5a11 11 0 005 5L15 12l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z"/>',
    wa:'<path d="M3 21l1.6-5A9 9 0 1112 21a9 9 0 01-4.3-1.1z"/><path d="M9 9c0 3.5 2.5 6 6 6l1.2-1.6-2-1-1 .8a4 4 0 01-2-2l.8-1-1-2z"/>',
    mail:'<path d="M3 6h18v12H3z"/><path d="M3 7l9 7 9-7"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    left:'<path d="M15 5l-7 7 7 7"/>',
    right:'<path d="M9 5l7 7-7 7"/>',
    x:'<path d="M6 6l12 12M18 6L6 18"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    minus:'<path d="M5 12h14"/>',
    reset:'<path d="M4 12a8 8 0 108-8H7M7 4L4 7l3 3"/>',
    full:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h10"/>',
    eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    map:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    img:'<path d="M3 5h18v14H3z"/><circle cx="9" cy="10" r="1.6"/><path d="M3 17l5-4 4 3 4-5 5 5"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    key:'<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v4M15 12v3"/>',
    chat:'<path d="M4 5h16v11H10l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    star:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
    ruler:'<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
    check:'<path d="M5 12l5 5 9-10"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    building:'<path d="M5 21V5l9-2v18M14 8h5v13M5 21h14M8 8h3M8 12h3M8 16h3"/>',
    down:'<path d="M6 9l6 6 6-6"/>',
    bike:'<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l4-8h5l3 8M10 8l3 8M9 5h3"/>',
    briefcase:'<path d="M3 8h18v12H3zM9 8V5h6v3M3 13h18M11 13h2"/>',
    hammer:'<path d="M14 4l6 6-3 3-6-6zM12 8L4 16l4 4 8-8M3 21l3-3"/>',
    users:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.2c3 0 5 2 5 5.3"/>',
    doc:'<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>'
  };
  window.VIcon = function(n,cls){
    return '<svg class="ic'+(cls?' '+cls:'')+'" aria-hidden="true"><use href="#i-'+n+'"/></svg>';
  };
  var ic = window.VIcon;

  function sprite(){
    var s = '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true"><defs>';
    for(var k in ICONS) s += '<symbol id="i-'+k+'" viewBox="0 0 24 24">'+ICONS[k]+'</symbol>';
    s += '</defs></svg>';
    document.body.insertAdjacentHTML("afterbegin", s);
  }

  /* ---------- emblem ---------- */
  var EMBLEM = '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M20 2l17 18-17 18L3 20z"/><path d="M11.5 14.5L20 29l8.5-14.5M15.5 14.5H24.5"/></svg>';

  function brand(){
    return '<a class="brand" href="index.html" aria-label="Virasat Real Estate &amp; Developer, home">'+EMBLEM+
           '<span class="brand-t"><b>Virasat</b><small>Real Estate &amp; Developer</small></span></a>';
  }

  /* ---------- header + mobile menu ---------- */
  function navLinks(mobile){
    var h = '', n = 0;
    function a(href,label,cls,on,idx){
      if(mobile) return '<a href="'+href+'" class="'+(cls||'')+(on?' on':'')+'"><i>'+idx+'</i><span'+(label.i?' data-i18n="'+label.i+'"':'')+'>'+label.t+'</span></a>';
      return '<a href="'+href+'" class="'+(cls?'c ':'')+(cls||'')+(on?' on':'')+'"'+(label.i?' data-i18n="'+label.i+'"':'')+'>'+label.t+'</a>';
    }
    function num(){ n++; return (n<10?"0":"")+n; }
    var isColony = C.colonies.some(function(c){ return c.id === page; });
    h += a("index.html",{i:"nav.home",t:"Home"},"",page==="home",num());
    if(mobile){
      C.colonies.forEach(function(c){ h += a(c.page,{t:c.short},c.cls,page===c.id,num()); });
    }else{
      // desktop: the colonies sit in a dropdown, each in its own font
      h += '<div class="dd"><button type="button" class="dd-b'+(isColony?' on':'')+'" aria-haspopup="true" aria-expanded="false"><span data-i18n="nav.colonies">Our colonies</span>'+ic("down")+'</button><div class="dd-m">'+
        C.colonies.map(function(c){ return '<a href="'+c.page+'" class="'+c.cls+(page===c.id?' on':'')+'">'+c.name+'</a>'; }).join("")+'</div></div>';
    }
    h += a("broker.html",{i:"nav.broker",t:"Brokers"},"",page==="broker",num());
    h += a("contractor.html",{i:"nav.contractor",t:"Contractors"},"",page==="contractor",num());
    if(!mobile) h += '<span class="sep"></span>';
    h += a("about.html",{i:"nav.about",t:"About"},"",page==="about",num());
    h += a("contact.html",{i:"nav.contact",t:"Contact"},"",page==="contact",num());
    return h;
  }
  function langSwitch(){
    return '<div class="lang" role="group" aria-label="Language"><button type="button" data-l="en">EN</button><button type="button" data-l="hi">हिं</button></div>';
  }
  function buildHeader(){
    var hdr = document.createElement("header");
    hdr.className = "hdr"; hdr.id = "hdr";
    hdr.innerHTML = '<div class="hdr-in">'+brand()+
      '<nav class="nav" aria-label="Main">'+navLinks(false)+'</nav>'+
      '<div class="hdr-r"><a class="tel" href="tel:+'+C.phoneRaw+'">'+ic("phone")+'<span>'+C.phone+'</span></a>'+langSwitch()+
      '<button class="burger" type="button" id="burger" data-i18n-label="nav.menu" aria-label="Menu">'+ic("menu")+'</button></div></div>';
    document.body.insertBefore(hdr, document.body.firstChild);

    var mm = document.createElement("div");
    mm.className = "mm"; mm.id = "mm";
    mm.innerHTML = '<div class="mm-top">'+brand()+'<button class="mm-close" type="button" id="mmx" aria-label="Close">'+ic("x")+'</button></div>'+
      '<nav>'+navLinks(true)+'</nav>'+
      '<div class="mm-foot">'+langSwitch()+
      '<a class="btn" href="tel:+'+C.phoneRaw+'">'+ic("phone")+'<span data-i18n="cta.call">Call now</span> &nbsp;'+C.phone+'</a>'+
      '<a class="btn ghost wa-link" target="_blank" rel="noopener" href="'+wa()+'">'+ic("wa")+'<span data-i18n="cta.wa">WhatsApp us</span></a></div>';
    document.body.insertBefore(mm, hdr.nextSibling);
  }
  function wa(msg){
    return "https://wa.me/"+C.phoneRaw+"?text="+encodeURIComponent(msg || "Hello Virasat Real Estate & Developer, I would like to know more about your colonies.");
  }
  window.VWa = wa;

  /* ---------- footer ---------- */
  function buildFooter(){
    var cols = C.colonies.map(function(c){ return '<li><a class="'+c.cls+'" href="'+c.page+'">'+c.name+'</a></li>'; }).join("");
    var f = document.createElement("footer");
    f.className = "ftr";
    f.innerHTML = '<div class="wrap"><div class="ftr-grid">'+
      '<div>'+brand()+'<p data-i18n="ft.about"></p></div>'+
      '<div><h4 data-i18n="ft.col"></h4><ul>'+cols+'</ul></div>'+
      '<div><h4 data-i18n="ft.links"></h4><ul><li><a href="index.html" data-i18n="nav.home"></a></li><li><a href="broker.html" data-i18n="nav.broker"></a></li><li><a href="contractor.html" data-i18n="nav.contractor"></a></li><li><a href="about.html" data-i18n="nav.about"></a></li><li><a href="contact.html" data-i18n="nav.contact"></a></li></ul></div>'+
      '<div class="ftr-contact"><h4 data-i18n="ft.contact"></h4>'+
        '<a href="tel:+'+C.phoneRaw+'">'+ic("phone")+'<span>'+C.phone+'</span></a>'+
        '<a href="mailto:'+C.email+'">'+ic("mail")+'<span>'+C.email+'</span></a>'+
        '<a target="_blank" rel="noopener" href="'+wa()+'">'+ic("wa")+'<span data-i18n="cta.wa"></span></a>'+
        '<a href="https://www.google.com/maps/search/?api=1&query=Super+Corridor+Indore" target="_blank" rel="noopener">'+ic("pin")+'<span>'+C.city+'</span></a></div>'+
      '</div><p class="ftr-disc" data-i18n="ft.disc"></p>'+
      '<div class="ftr-bot"><span>&copy; '+new Date().getFullYear()+' '+C.brand+'. <span data-i18n="ft.rights"></span></span><span data-i18n="ft.dev"></span></div></div>';
    var main = document.getElementById("main");
    main.parentNode.insertBefore(f, main.nextSibling);
  }

  /* ---------- floating buttons + toast ---------- */
  function buildFab(){
    var d = document.createElement("div");
    d.className = "fab";
    d.innerHTML = '<a class="w" target="_blank" rel="noopener" href="'+wa()+'" aria-label="WhatsApp">'+ic("wa")+'</a>'+
                  '<a class="p" href="tel:+'+C.phoneRaw+'" aria-label="Call">'+ic("phone")+'</a>';
    document.body.appendChild(d);
    var t = document.createElement("div");
    t.className = "toast"; t.id = "toast"; t.setAttribute("role","status");
    document.body.appendChild(t);
  }
  window.VToast = function(msg){
    var t = document.getElementById("toast"); if(!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._t); t._t = setTimeout(function(){ t.classList.remove("show"); }, 4500);
  };

  /* ---------- lead popup ---------- */
  function buildPopup(){
    var p = document.createElement("div");
    p.className = "pop"; p.id = "pop";
    p.setAttribute("role","dialog"); p.setAttribute("aria-modal","true"); p.setAttribute("aria-labelledby","pop-t");
    p.innerHTML =
      '<div class="pop-box">'+
        '<button class="pop-x" type="button" id="pop-x" data-i18n-label="close" aria-label="Close">'+ic("x")+'</button>'+
        '<div class="pop-img"><img src="images/premium/hero.jpg" alt="" loading="lazy"><div><span data-i18n="pop.img"></span><small data-i18n="pop.img2"></small></div></div>'+
        '<form class="pop-form" data-lead-form data-source="popup" data-colony="Website popup" novalidate>'+
          '<span class="eyebrow">Virasat Real Estate &amp; Developer</span>'+
          '<h2 id="pop-t" data-i18n="pop.title"></h2>'+
          '<p data-i18n="pop.desc"></p>'+
          '<input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">'+
          '<div class="fld"><label for="pp-n" data-i18n="f.name"></label><input id="pp-n" name="name" type="text" autocomplete="name" data-i18n-ph="f.ph.name" required><span class="err" data-i18n="err.name"></span></div>'+
          '<div class="fld"><label for="pp-p" data-i18n="f.phone"></label><input id="pp-p" name="phone" type="tel" inputmode="tel" autocomplete="tel" data-i18n-ph="f.ph.phone" required><span class="err" data-i18n="err.phone"></span></div>'+
          '<button class="btn" type="submit" data-i18n="cta.callback"></button>'+
          '<div class="form-msg" role="status"></div>'+
          '<button class="pop-skip" type="button" id="pop-skip" data-i18n="cta.skip"></button>'+
        '</form>'+
      '</div>';
    document.body.appendChild(p);
  }

  /* ---------- go ---------- */
  function init(){
    sprite();
    buildHeader();
    buildFooter();
    buildFab();
    buildPopup();
    I.set(I.get());              // apply saved language to everything

    // language buttons
    document.addEventListener("click", function(e){
      var b = e.target.closest(".lang button");
      if(b) I.set(b.getAttribute("data-l"));
      // colonies dropdown (click for touch screens and keyboards; hover also works from CSS)
      var d = e.target.closest(".dd-b"), open = document.querySelector(".dd.open");
      if(open && (!d || d.parentNode !== open)){ open.classList.remove("open"); open.querySelector(".dd-b").setAttribute("aria-expanded","false"); }
      if(d){ var o = d.parentNode.classList.toggle("open"); d.setAttribute("aria-expanded", o ? "true" : "false"); }
    });
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape"){ var o = document.querySelector(".dd.open"); if(o){ o.classList.remove("open"); o.querySelector(".dd-b").setAttribute("aria-expanded","false"); } }
    });
    document.addEventListener("langchange", function(){
      var bs = document.querySelectorAll(".lang button");
      for(var i=0;i<bs.length;i++) bs[i].classList.toggle("on", bs[i].getAttribute("data-l")===I.get());
    });
    document.dispatchEvent(new CustomEvent("langchange"));
    document.dispatchEvent(new CustomEvent("layoutready"));
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
