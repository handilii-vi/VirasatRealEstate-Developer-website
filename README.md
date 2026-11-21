# Virasat Real Estate & Developer: website project

Pure HTML + CSS + JavaScript. No build step, no framework. Upload the whole folder to your hosting and it works.

## Folder structure

```
virasat-website/
├── index.html            Home page
├── imperial.html         Drushika Imperial & Paradise Grande
├── vrindavan.html        Drushika Vrindavan
├── premium.html          Drushika Premium
├── heera.html            The Heera Residency
├── ayodhyapuram.html     Drushika Ayodhyapuram
├── broker.html           Broker / channel partner page (with lead form)
├── contractor.html       Contractor page (BLANK, "Coming soon")
├── about.html            About us
├── contact.html          Contact page
├── css/
│   ├── base.css          Colours, fonts, buttons, forms (change colours here)
│   ├── layout.css        Header, menu, footer, popup, floating buttons
│   ├── home.css          Home page design
│   ├── colony.css        Colony pages design (each colony has its own theme at the top)
│   └── pages.css         About and Contact pages
├── js/
│   ├── config.js         PHONE, EMAIL, GOOGLE SHEET URL, popup timing  <-- edit this first
│   ├── i18n.js           English / Hindi system
│   ├── layout.js         Builds header, footer, popup (edit once, all pages change)
│   ├── leads.js          Forms and the name + number popup
│   ├── main.js           Animations, sticky header, mobile menu
│   └── colony.js         Tabs, gallery lightbox, zoomable maps
├── images/
│   ├── imperial/  hero.jpg  g1.jpg ... g4.jpg   map.jpg  location.jpg
│   ├── vrindavan/ hero.jpg  g1.jpg ... g10.jpg  map.jpg  location.jpg
│   ├── premium/   hero.jpg  g1.jpg ... g7.jpg   map.jpg  location.jpg
│   ├── heera/     hero.jpg  g1.jpg ... g12.jpg  map.jpg  location.jpg
│   └── ayodhyapuram/ hero.jpg  g1.jpg ... g12.jpg  map.jpg  location.jpg
├── videos/               Put hero.mp4 here (home page background video)
├── admin/                Leads dashboard (index.html)
└── setup/google-apps-script.gs    Code for Google Sheets
```

To preview on your computer, just double-click `index.html`.

## 1. Replace images and add your video

* Every colony folder has: `hero.jpg` (big top photo), `g1.jpg`, `g2.jpg`... (gallery photos), `map.jpg` (plot layout map) and `location.jpg` (location map).
* Replace a file with your own picture using the **same name**. Use `.jpg` (a PNG renamed to `.jpg` will not work; convert it first, or change the extension inside the HTML).
* Recommended: hero 2000 px wide, gallery 1500 px wide, maps 2400 px wide, each under 1 MB (except maps).
* Home page video: save it as `videos/hero.mp4` (16:9, under 15 MB). If the file is missing, a photo slideshow plays instead.
* To add more gallery photos, copy one `<figure>...</figure>` block inside `<div class="gal">` in the colony HTML file.

## 2. Save leads in Google Sheets (do this before going live)

1. Create a new Google Sheet. Name it "Virasat Leads".
2. In the sheet: **Extensions > Apps Script**. Delete everything, paste the contents of `setup/google-apps-script.gs`.
3. Change `SECRET` to your own long password. Optionally change `NOTIFY_EMAIL` (new leads are emailed there).
4. Click **Deploy > New deployment > Web app**. Execute as: **Me**. Who has access: **Anyone**. Click Deploy and allow the permissions.
5. Copy the **Web app URL** and paste it in `js/config.js` as `sheetUrl`.
6. Test: open the website, submit the popup form, check the sheet. A new row should appear.
7. Dashboard: open `yourdomain.com/admin/` and enter your `SECRET`. You can search, filter by colony, call or WhatsApp a lead, and download CSV.

If you change the Apps Script code later, use **Deploy > Manage deployments > Edit > New version**.

## 3. Change phone, email, colonies

* `js/config.js` controls the header, footer, floating buttons and popup.
* The phone number and email are also written inside the HTML pages (home call-to-action, contact page, colony Connect and Location tabs). Use "Find and replace in all files" in your editor for `84358 23835`, `918435823835` and `sales@virasatrealestate.com`.

## 4. English and Hindi

Every text on the pages looks like this:

```html
<p data-hi="यहाँ हिंदी लिखें">English text here</p>
```

Edit the English between the tags and the Hindi inside `data-hi="..."`. Common words (menu, buttons, form labels) are in `js/i18n.js`.

## 5. Broker and Contractor pages

* `broker.html`: for brokers and channel partners. The form sends leads to the same Google Sheet (Source = `broker-page`, Colony = "Broker enquiry"; Firm and City appear in the Message column).
* `contractor.html`: intentionally blank ("Coming soon"). Open the file and put your content where it says `<!-- CONTRACTOR CONTENT GOES HERE -->`.

## 6. Add another colony later

1. Put photos and maps in `images/<id>/` (hero.jpg, g1.jpg..., map.jpg, location.jpg).
2. Copy `ayodhyapuram.html` to `<id>.html`, change the text, plot table and image paths. Change `data-page` and the `t-...` class on `<body>` (create a new theme at the top of `css/colony.css`).
3. Add one line in `js/config.js` under `colonies`. Menu, footer and form dropdowns update by themselves. On the home page copy one `<article class="cp">` block.

## 7. Go live

Upload everything inside this folder to the `public_html` folder of your hosting (cPanel, Hostinger, GoDaddy etc.), or drag the folder onto Netlify / Cloudflare Pages. Point your domain to it.

## Things to check before launching

* Plot sizes, distances and amenities were taken from the five brochures. Please read each page once. Drushika Imperial & Paradise Grande's brochure shows both "800-3000 sq ft" and "800, 1000, 1200, 1500, 2000 sq ft".
* The RERA number shown on the Imperial page (P-OTH-24-4784) is from the Imperial and Paradise brochure.
* The "About" page text is general wording. Edit it with your real story.
* The images are artist impressions from the brochures. Replace them with your original files for the best quality.
* Add your own privacy policy page if you run ads.
