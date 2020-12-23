var convertBtn = document.getElementById("convertBtn");
var switchBtn = document.getElementById("switchBtn");
var downloadBtn = document.getElementById("downloadBtn");

var titleBox = document.getElementById("title");
var descriptionBox = document.getElementById("description");
var mdBox = document.getElementById("markdown");
var htmlBox = document.getElementById("html");
var htmlDisplay = document.getElementById("htmlDisplay");

var HIDDEN = "hidden";
var htmlFile = null;

var HTML_HEAD_START =
  '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><title>';
var HTML_HEAD_MID = '</title><meta name="description" content="';
var HTML_HEAD_END =
  '" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta http-equiv="X-UA-Compatible" content="ie=edge" /><meta name="mobile-web-app-capable" content="yes" /><meta name="apple-mobile-web-app-capable" content="yes" /><link type="text/plain" rel="author" href="/humans.txt" /><link href="https://fonts.googleapis.com/css?family=Libre+Baskerville:400,700|Roboto:400,400i,700&display=swap" rel="stylesheet" /><link rel="stylesheet" href="/assets/index.css" /><link rel="apple-touch-icon" sizes="57x57" href="/assets/icons/apple-icon-57x57.png" /><link rel="apple-touch-icon" sizes="60x60" href="/assets/icons/apple-icon-60x60.png" /><link rel="apple-touch-icon" sizes="72x72" href="/assets/icons/apple-icon-72x72.png" /><link rel="apple-touch-icon" sizes="76x76" href="/assets/icons/apple-icon-76x76.png" /><link rel="apple-touch-icon" sizes="114x114" href="/assets/icons/apple-icon-114x114.png" /><link rel="apple-touch-icon" sizes="120x120" href="/assets/icons/apple-icon-120x120.png" /><link rel="apple-touch-icon" sizes="144x144" href="/assets/icons/apple-icon-144x144.png" /><link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/apple-icon-152x152.png" /><link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-icon-180x180.png" /><link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/android-icon-192x192.png" /><link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" /><link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/favicon-96x96.png" /><link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" /><link rel="icon" href="/assets/favicon.ico" type="image/x-icon" /><link rel="manifest" href="/assets/manifest.json" /><meta name="msapplication-TileImage" content="/assets/icons/ms-icon-144x144.png" /><meta name="msapplication-TileColor" content="#ffffff" /><meta name="theme-color" content="#ffffff" /></head><body><div class="page-logo"><a class="page-logo-link" href="http://dominicwarren.com/" ><img alt="Dominic Warren" class="post-profile-photo" src="/assets/Dominic Warren - Summer - 2019.jpg" /></a></div><main id="wrapper">';
var HTML_BODY_END =
  '</main><p id="spacer-bottom">&nbsp;</p><footer class="footer"><div class="footer-content"><p>Made with <span class="heart">&hearts;</span> by Dominic Warren.</p></div></footer></body></html>';

function switchDisplay() {
  if (htmlDisplay.classList.contains(HIDDEN)) {
    htmlDisplay.classList.remove(HIDDEN);
    htmlBox.classList.add(HIDDEN);
    switchBtn.firstChild.textContent = "View Raw";
  } else {
    htmlDisplay.classList.add(HIDDEN);
    htmlBox.classList.remove(HIDDEN);
    switchBtn.firstChild.textContent = "View Styled";
  }
}

function makeHtmlFile(content, title) {
  var data = new Blob([content], { type: "text/html" });
  if (htmlFile !== null) {
    window.URL.revokeObjectURL(htmlFile);
  }

  htmlFile = window.URL.createObjectURL(data);
  downloadBtn.href = htmlFile;
  downloadBtn.download = title || "Your post";
  downloadBtn.classList.remove(HIDDEN);
}

function convertMarkdown(shouldDownload) {
  var title =
    DOMPurify.sanitize(titleBox.value) ||
    "Dominic Warren • Content Designer and UX Writer";
  var description =
    DOMPurify.sanitize(descriptionBox.value) ||
    "Dominic is a content designer and UX writer based in Brighton.";

  var dirty = marked(mdBox.value);
  var clean = DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });

  htmlDisplay.innerHTML = clean;
  htmlBox.value = clean;

  if (shouldDownload) {
    var fullHtml =
      HTML_HEAD_START +
      title +
      HTML_HEAD_MID +
      description +
      HTML_HEAD_END +
      clean +
      HTML_BODY_END;
    makeHtmlFile(fullHtml, title);
  }
}

convertMarkdown();

convertBtn.addEventListener("click", convertMarkdown);
switchBtn.addEventListener("click", switchDisplay);
