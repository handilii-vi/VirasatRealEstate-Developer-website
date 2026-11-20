/* ==========================================================
   leads.js  |  every form with  data-lead-form  is handled here
   + the "name and number" popup.
   Leads go to your Google Sheet (see README.md).
   ========================================================== */
(function(){
  var C = window.VIRASAT, I = window.VI18n;

  function cleanPhone(v){
    v = String(v||"").replace(/[\s\-().]/g,"");
    v = v.replace(/^\+?91/,"").replace(/^0/,"");
    return /^[6-9]\d{9}$/.test(v) ? v : "";
  }
  function utm(){
    var o = {}, q = new URLSearchParams(location.search);
    ["utm_source","utm_medium","utm_campaign","gclid","fbclid"].forEach(function(k){ if(q.get(k)) o[k]=q.get(k); });
    try{ if(Object.keys(o).length) sessionStorage.setItem("virasat_utm", JSON.stringify(o)); else o = JSON.parse(sessionStorage.getItem("virasat_utm")||"{}"); }catch(e){}
    return Object.keys(o).map(function(k){ return k+"="+o[k]; }).join("&");
  }

  /* send one lead to the Google Sheet */
  function send(data){
    var payload = {
      time: new Date().toISOString(),
      name: data.name, phone: data.phone, email: data.email||"",
      colony: data.colony||"", plot: data.plot||"", message: data.message||"",
      source: data.source||"form", page: location.pathname.split("/").pop()||"index.html",
      lang: I.get(), utm: utm()
    };
    if(!C.sheetUrl){
      // demo mode: nothing is saved on a server
      try{
        var a = JSON.parse(localStorage.getItem("virasat_demo_leads")||"[]"); a.push(payload);
        localStorage.setItem("virasat_demo_leads", JSON.stringify(a));
      }catch(e){}
      console.info("[Virasat demo mode] Set sheetUrl in js/config.js to save leads. Lead:", payload);
      return Promise.resolve();
    }
    return fetch(C.sheetUrl, {method:"POST", mode:"no-cors", headers:{"Content-Type":"text/plain;charset=utf-8"}, body:JSON.stringify(payload)});
  }
  window.VSend = send;

  function showMsg(form, text, bad){
    var m = form.querySelector(".form-msg"); if(!m) return;
    m.textContent = text; m.classList.toggle("bad", !!bad); m.classList.add("show");
  }

  function handle(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      if(form.querySelector(".hp") && form.querySelector(".hp").value) return;   // bot
      var f = form.elements, ok = true;
      var name = (f.name && f.name.value || "").trim();
      var phone = cleanPhone(f.phone && f.phone.value);
      function flag(el,bad){ var w = el && el.closest(".fld"); if(w) w.classList.toggle("bad", bad); if(bad) ok = false; }
      flag(f.name, name.length < 2);
      flag(f.phone, !phone);
      if(!ok){ var b = form.querySelector(".fld.bad input"); if(b) b.focus(); return; }

      var btn = form.querySelector('button[type="submit"]'), label = btn.innerHTML;
      btn.disabled = true; btn.textContent = I.t("cta.sending");
      var colony = (f.colony && f.colony.value) || form.getAttribute("data-colony") || "";
      send({
        name:name, phone:phone, email:f.email?f.email.value.trim():"",
        colony:colony, plot:f.plot?f.plot.value:"",
        // broker form has extra fields; they are added to the message so they show up in the Sheet
        message:[f.firm&&f.firm.value.trim()?"Firm: "+f.firm.value.trim():"", f.city&&f.city.value.trim()?"City: "+f.city.value.trim():"", f.message?f.message.value.trim():""].filter(Boolean).join(" | "),
        source:form.getAttribute("data-source")||"form"
      }).then(function(){
        form.reset();
        showMsg(form, I.t("ok.thanks"), false);
        remember();
        if(form.closest("#pop")) setTimeout(closePop, 2200);
      }).catch(function(){
        showMsg(form, I.t("err.net"), true);
      }).then(function(){ btn.disabled = false; btn.innerHTML = label; I.apply(btn); });
    });
    form.addEventListener("input", function(e){ var w = e.target.closest(".fld"); if(w) w.classList.remove("bad"); });
  }

  /* ---------- popup ---------- */
  var pop, key = "virasat_popup_until";
  function remember(){
    try{ localStorage.setItem(key, String(Date.now() + C.popupEveryDays*864e5)); }catch(e){}
  }
  function canShow(){
    try{ return Date.now() > Number(localStorage.getItem(key)||0); }catch(e){ return true; }
  }
  function openPop(){
    if(!pop || pop.classList.contains("show")) return;
    pop.classList.add("show"); document.body.classList.add("nolock");
    setTimeout(function(){ var i = pop.querySelector("input[name=name]"); if(i) i.focus({preventScroll:true}); }, 400);
  }
  function closePop(){
    if(!pop) return;
    pop.classList.remove("show"); document.body.classList.remove("nolock"); remember();
  }
  window.VPop = {open:openPop, close:closePop};

  function init(){
    var forms = document.querySelectorAll("form[data-lead-form]");
    for(var i=0;i<forms.length;i++) handle(forms[i]);

    pop = document.getElementById("pop");
    if(pop){
      document.getElementById("pop-x").addEventListener("click", closePop);
      document.getElementById("pop-skip").addEventListener("click", closePop);
      pop.addEventListener("click", function(e){ if(e.target === pop) closePop(); });
      document.addEventListener("keydown", function(e){ if(e.key === "Escape" && pop.classList.contains("show")) closePop(); });
      if(canShow()) setTimeout(function(){ if(canShow()) openPop(); }, C.popupDelay);
    }
  }
  document.addEventListener("layoutready", init);
})();
