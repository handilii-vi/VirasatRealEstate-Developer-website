/* admin dashboard: reads leads from your Google Sheet through the Apps Script */
(function(){
  var C = window.VIRASAT || {}, rows = [], head = [], pw = "", timer = null;
  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }

  function load(silent){
    if(!C.sheetUrl){ $("lmsg").textContent = "Set sheetUrl in js/config.js first."; return Promise.resolve(false); }
    return fetch(C.sheetUrl + "?key=" + encodeURIComponent(pw)).then(function(r){ return r.json(); }).then(function(d){
      if(d.error){ if(!silent) $("lmsg").textContent = "Wrong password."; return false; }
      head = d[0] || []; rows = d.slice(1);
      $("login").hidden = true; $("app").hidden = false;
      try{ sessionStorage.setItem("virasat_admin", pw); }catch(e){}
      build(); return true;
    }).catch(function(){ if(!silent) $("lmsg").textContent = "Could not reach the Google Sheet. Check sheetUrl and deployment."; return false; });
  }

  function colonies(){ var s = {}; rows.forEach(function(r){ if(r[4]) s[r[4]] = (s[r[4]]||0) + 1; }); return s; }

  function build(){
    var cs = colonies(), sel = $("fc"), cur = sel.value;
    sel.innerHTML = '<option value="">All colonies</option>' + Object.keys(cs).map(function(k){ return '<option>'+esc(k)+'</option>'; }).join("");
    sel.value = cur;
    var today = rows.filter(function(r){ return sameDay(new Date(r[0]), new Date()); }).length;
    $("cards").innerHTML = '<div><b>'+rows.length+'</b><small>Total leads</small></div><div><b>'+today+'</b><small>Today</small></div>' +
      Object.keys(cs).map(function(k){ return '<div><b>'+cs[k]+'</b><small>'+esc(k)+'</small></div>'; }).join("");
    draw();
  }
  function sameDay(a,b){ return a.toDateString() === b.toDateString(); }

  function filtered(){
    var q = $("q").value.trim().toLowerCase(), c = $("fc").value, d = Number($("fd").value||0), now = Date.now();
    return rows.filter(function(r){
      if(c && r[4] !== c) return false;
      if(d && (now - new Date(r[0]).getTime()) > d*864e5) return false;
      if(q && (String(r[1]).toLowerCase().indexOf(q) < 0 && String(r[2]).indexOf(q) < 0)) return false;
      return true;
    }).reverse();
  }
  function draw(){
    var list = filtered();
    $("count").textContent = list.length + " shown";
    var h = "<thead><tr><th>Time</th><th>Name</th><th>Phone</th><th>Colony</th><th>Plot</th><th>Message</th><th>Source</th><th>Email</th></tr></thead><tbody>";
    list.forEach(function(r){
      var t = new Date(r[0]), ph = String(r[2]).replace(/\D/g,"");
      h += "<tr><td>"+esc(isNaN(t) ? r[0] : t.toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}))+"</td>"+
           "<td>"+esc(r[1])+"</td>"+
           '<td><a href="tel:+91'+esc(ph.slice(-10))+'">'+esc(r[2])+'</a><a href="https://wa.me/91'+esc(ph.slice(-10))+'" target="_blank" rel="noopener">WhatsApp</a></td>'+
           "<td>"+esc(r[4])+"</td><td>"+esc(r[5])+'</td><td class="m">'+esc(r[6])+"</td><td>"+esc(r[7])+"</td><td>"+esc(r[3])+"</td></tr>";
    });
    $("tb").innerHTML = h + "</tbody>";
  }
  function csv(){
    var list = [head].concat(filtered());
    var s = list.map(function(r){ return r.map(function(c){ return '"' + String(c == null ? "" : c).replace(/"/g,'""') + '"'; }).join(","); }).join("\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + s], {type:"text/csv"}));
    a.download = "virasat-leads-" + new Date().toISOString().slice(0,10) + ".csv";
    a.click();
  }

  $("lf").addEventListener("submit", function(e){ e.preventDefault(); pw = $("pw").value; $("lmsg").textContent = "Loading..."; load(false); });
  $("rf").addEventListener("click", function(){ load(true); });
  $("csv").addEventListener("click", csv);
  $("out").addEventListener("click", function(){ try{ sessionStorage.removeItem("virasat_admin"); }catch(e){} location.reload(); });
  ["q","fc","fd"].forEach(function(id){ $(id).addEventListener("input", draw); });
  try{ var s = sessionStorage.getItem("virasat_admin"); if(s){ pw = s; load(true); } }catch(e){}
  timer = setInterval(function(){ if(pw && !$("app").hidden) load(true); }, 60000);
})();
