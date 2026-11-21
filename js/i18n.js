/* ==========================================================
   i18n.js  |  English / Hindi switch
   - Text with  data-i18n="key"  comes from the dictionary below.
   - Text with  data-hi="हिंदी text"  keeps its English inside the
     tag and swaps to the Hindi in the attribute.
   ========================================================== */
(function(){
  var D = {
    en:{
      "nav.home":"Home","nav.broker":"Brokers","nav.contractor":"Contractors","nav.about":"About","nav.contact":"Contact","nav.menu":"Menu","nav.colonies":"Our colonies",
      "cta.call":"Call now","cta.wa":"WhatsApp us","cta.enquire":"Enquire now","cta.explore":"Explore colonies","cta.visit":"Book a site visit",
      "cta.view":"View colony","cta.send":"Send enquiry","cta.sending":"Sending...","cta.callback":"Request a call back","cta.skip":"Skip for now",
      "tab.overview":"Overview","tab.gallery":"Gallery","tab.map":"Layout map","tab.location":"Location","tab.connect":"Connect",
      "f.firm":"Firm / agency name (optional)","f.city":"City / area (optional)","f.name":"Your name","f.phone":"Phone number","f.email":"Email (optional)","f.plot":"Plot size (optional)","f.colony":"Colony","f.msg":"Message (optional)",
      "f.any":"Not sure yet","f.ph.name":"Full name","f.ph.phone":"10-digit mobile number","f.ph.msg":"Tell us what you are looking for",
      "err.name":"Please enter your name.","err.phone":"Please enter a valid 10-digit mobile number.",
      "ok.thanks":"Thank you. Our team will call you shortly.","err.net":"Could not send. Please call us on the number below.",
      "pop.title":"Find your dream plot","pop.desc":"Share your name and number. Our team will call you with plots, prices and site visit options.",
      "pop.img":"Your legacy begins here","pop.img2":"Premium plots in Indore's Super Corridor",
      "ft.about":"Virasat means legacy. As a real estate and development partner, we help families, investors and brokers find premium plotted colonies in Indore, with honest guidance at every step.",
      "ft.col":"Colonies","ft.links":"Quick links","ft.contact":"Contact",
      "ft.disc":"All images are artist impressions. Specifications, sizes and layouts are tentative and subject to change as decided by the architects or promoters. This website is not a legal offering. Colonies are developed by Drushika Real Estate and marketed by Virasat Real Estate & Developer's.",
      "ft.rights":"All rights reserved.","ft.dev":"Developed by Drushika Real Estate",
      "map.hint":"Drag to move, scroll or pinch to zoom","map.fs":"Full screen","map.reset":"Reset","map.zi":"Zoom in","map.zo":"Zoom out","map.dl":"Download map",
      "loc.open":"Open in Google Maps","nb.near":"Nearby","pn.prev":"Previous colony","pn.next":"Next colony",
      "sz":"Plot size","area":"Area","type":"Type","sq":"sq ft","close":"Close","prev":"Previous","next":"Next"
    },
    hi:{
      "nav.home":"होम","nav.broker":"ब्रोकर","nav.contractor":"कॉन्ट्रैक्टर","nav.about":"हमारे बारे में","nav.contact":"संपर्क","nav.menu":"मेन्यू","nav.colonies":"हमारी कॉलोनियाँ",
      "cta.call":"अभी कॉल करें","cta.wa":"व्हाट्सऐप करें","cta.enquire":"पूछताछ करें","cta.explore":"कॉलोनियाँ देखें","cta.visit":"साइट विज़िट बुक करें",
      "cta.view":"कॉलोनी देखें","cta.send":"पूछताछ भेजें","cta.sending":"भेज रहे हैं...","cta.callback":"मुझे कॉल करें","cta.skip":"अभी छोड़ें",
      "tab.overview":"जानकारी","tab.gallery":"गैलरी","tab.map":"लेआउट नक्शा","tab.location":"लोकेशन","tab.connect":"संपर्क करें",
      "f.firm":"फ़र्म / एजेंसी का नाम (वैकल्पिक)","f.city":"शहर / क्षेत्र (वैकल्पिक)","f.name":"आपका नाम","f.phone":"फ़ोन नंबर","f.email":"ईमेल (वैकल्पिक)","f.plot":"प्लॉट साइज़ (वैकल्पिक)","f.colony":"कॉलोनी","f.msg":"संदेश (वैकल्पिक)",
      "f.any":"अभी तय नहीं","f.ph.name":"पूरा नाम","f.ph.phone":"10 अंकों का मोबाइल नंबर","f.ph.msg":"आप क्या ढूँढ रहे हैं, बताइए",
      "err.name":"कृपया अपना नाम लिखें।","err.phone":"कृपया सही 10 अंकों का मोबाइल नंबर लिखें।",
      "ok.thanks":"धन्यवाद। हमारी टीम जल्द ही आपको कॉल करेगी।","err.net":"भेज नहीं सके। कृपया नीचे दिए नंबर पर कॉल करें।",
      "pop.title":"अपना सपनों का प्लॉट खोजें","pop.desc":"अपना नाम और नंबर दें। हमारी टीम आपको प्लॉट, कीमत और साइट विज़िट की जानकारी के लिए कॉल करेगी।",
      "pop.img":"आपकी विरासत यहीं से शुरू","pop.img2":"इंदौर सुपर कॉरिडोर में प्रीमियम प्लॉट",
      "ft.about":"विरासत का अर्थ है धरोहर। रियल एस्टेट और डेवलपमेंट पार्टनर के रूप में हम परिवारों, निवेशकों और ब्रोकरों को इंदौर में प्रीमियम प्लॉटेड कॉलोनियाँ चुनने में हर कदम पर ईमानदार सलाह देते हैं।",
      "ft.col":"कॉलोनियाँ","ft.links":"त्वरित लिंक","ft.contact":"संपर्क",
      "ft.disc":"सभी चित्र कलाकार की कल्पना हैं। विनिर्देश, साइज़ और लेआउट अस्थायी हैं और आर्किटेक्ट या प्रमोटर के निर्णय अनुसार बदल सकते हैं। यह वेबसाइट कोई कानूनी प्रस्ताव नहीं है। कॉलोनियाँ Drushika रियल एस्टेट द्वारा विकसित और विरासत रियल एस्टेट एंड डेवलपर द्वारा विपणित हैं।",
      "ft.rights":"सर्वाधिकार सुरक्षित।","ft.dev":"विकासक: Drushika रियल एस्टेट",
      "map.hint":"खिसकाने के लिए खींचें, ज़ूम के लिए स्क्रोल या पिंच करें","map.fs":"फ़ुल स्क्रीन","map.reset":"रीसेट","map.zi":"ज़ूम इन","map.zo":"ज़ूम आउट","map.dl":"नक्शा डाउनलोड करें",
      "loc.open":"गूगल मैप में खोलें","nb.near":"पास में","pn.prev":"पिछली कॉलोनी","pn.next":"अगली कॉलोनी",
      "sz":"प्लॉट साइज़","area":"क्षेत्रफल","type":"प्रकार","sq":"वर्ग फुट","close":"बंद करें","prev":"पिछला","next":"अगला"
    }
  };

  var lang = "en";
  try{ lang = localStorage.getItem("virasat_lang") || "en"; }catch(e){}
  if(!D[lang]) lang = "en";

  function t(k){ return (D[lang] && D[lang][k]) || D.en[k] || k; }

  function apply(root){
    root = root || document;
    var i, els;
    els = root.querySelectorAll("[data-i18n]");
    for(i=0;i<els.length;i++) els[i].innerHTML = t(els[i].getAttribute("data-i18n"));
    els = root.querySelectorAll("[data-i18n-ph]");
    for(i=0;i<els.length;i++) els[i].setAttribute("placeholder", t(els[i].getAttribute("data-i18n-ph")));
    els = root.querySelectorAll("[data-i18n-label]");
    for(i=0;i<els.length;i++) els[i].setAttribute("aria-label", t(els[i].getAttribute("data-i18n-label")));
    els = root.querySelectorAll("[data-hi]");
    for(i=0;i<els.length;i++){
      var el = els[i];
      if(el.getAttribute("data-en") === null) el.setAttribute("data-en", el.innerHTML);
      el.innerHTML = (lang === "hi") ? el.getAttribute("data-hi") : el.getAttribute("data-en");
    }
    var titleEl = document.querySelector("title[data-hi]");
    if(titleEl){ document.title = (lang === "hi") ? titleEl.getAttribute("data-hi") : titleEl.getAttribute("data-en"); }
  }

  function set(l){
    if(!D[l]) return;
    lang = l;
    try{ localStorage.setItem("virasat_lang", l); }catch(e){}
    document.documentElement.lang = l;
    document.body.classList.toggle("lang-hi", l === "hi");
    apply(document);
    document.dispatchEvent(new CustomEvent("langchange", {detail:l}));
  }

  window.VI18n = { t:t, apply:apply, set:set, get:function(){ return lang; } };
})();
