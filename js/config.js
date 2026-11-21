/* ==========================================================
   config.js  |  EDIT THIS FILE for contact details & leads
   ========================================================== */
window.VIRASAT = {
  brand:    "Virasat Real Estate & Developer",
  phone:    "+91 84358 23835",
  phoneRaw: "918435823835",          // for WhatsApp / tel links (no + or spaces)
  email:    "sales@virasatrealestate.com",
  city:     "Indore, Madhya Pradesh",

  // Paste your Google Apps Script "Web app" URL here (see README.md, step 2).
  // While this is empty the forms work in demo mode (leads are NOT saved anywhere).
  sheetUrl: "https://script.google.com/macros/s/AKfycbzsj5XfBGqdwBOB2YGsLxMchtb6MTJx29008YBaGRiPVIMMkRQNAsjE4Lxa_gRBKV_5/exec",

  popupDelay: 3500,                  // milliseconds after page load
  popupEveryDays: 3,                 // do not show again for N days after the visitor closes or submits

  // The colonies shown in the menu, footer and forms.
  // To add a new colony: add a line here, copy an existing colony page, and put its photos in images/<id>/.
  colonies: [
    { id:"imperial",     name:"Drushika Imperial & Paradise Grande", short:"Imperial & Paradise", page:"imperial.html",     cls:"f-imperial"     },
    { id:"vrindavan",    name:"Drushika Vrindavan",                  short:"Vrindavan",           page:"vrindavan.html",    cls:"f-vrindavan"    },
    { id:"premium",      name:"Drushika Premium",                    short:"Premium",             page:"premium.html",      cls:"f-premium"      },
    { id:"heera",        name:"The Heera Residency",                 short:"Heera Residency",     page:"heera.html",        cls:"f-heera"        },
    { id:"ayodhyapuram", name:"Drushika Ayodhyapuram",               short:"Ayodhyapuram",        page:"ayodhyapuram.html", cls:"f-ayodhyapuram" }
  ]
};
