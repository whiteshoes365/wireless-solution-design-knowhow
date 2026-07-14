/**
 * build-standalone.js
 * index.html + 분리된 CSS/JS/콘텐츠를 하나의 자기완결 HTML로 합친다.
 * 결과물(wireless-kb-standalone.html) 한 파일만 있으면 어디서든 열람 가능.
 *
 * 실행: node build-standalone.js
 * 콘텐츠 수정 후 다시 실행하면 최신본으로 재생성된다.
 */
const fs = require("fs");
const path = require("path");
const root = __dirname;
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

const css = read("assets/css/styles.css");
const scripts = [
  "assets/data/content.js",
  "assets/data/content-wifi.js",
  "assets/data/content-bluetooth.js",
  "assets/data/content-zigbee.js",
  "assets/js/app.js",
].map(read).join("\n");

// assets/img 의 이미지들을 data URI 로 인라인 (단일본 오프라인 동작용)
let scriptsWithImg = scripts;
const imgDir = path.join(root, "assets", "img");
if (fs.existsSync(imgDir)) {
  for (const f of fs.readdirSync(imgDir)) {
    const ext = path.extname(f).slice(1).toLowerCase();
    const mime = ext === "png" ? "image/png" : ext === "svg" ? "image/svg+xml" : "image/jpeg";
    const data = "data:" + mime + ";base64," +
      fs.readFileSync(path.join(imgDir, f)).toString("base64");
    scriptsWithImg = scriptsWithImg.split("assets/img/" + f).join(data);
  }
}

// </script> 가 문자열에 있으면 인라인이 깨지므로 안전 이스케이프
const safeScripts = scriptsWithImg.replace(/<\/script>/gi, "<\\/script>");

// favicon 을 data URI 로 인라인
const favSvg = read("assets/favicon.svg");
const favData = "data:image/svg+xml;base64," + Buffer.from(favSvg, "utf8").toString("base64");

let html = read("index.html");

// (치환 문자열 안의 $& 등이 특수해석되지 않도록 함수 형태로 삽입)
// 1) 외부 CSS 링크 → 인라인 <style>
html = html.replace(
  /<link rel="stylesheet" href="assets\/css\/styles\.css" \/>/,
  () => "<style>\n" + css + "\n</style>"
);

// 2) favicon 링크 → data URI
html = html.replace(
  /href="assets\/favicon\.svg"/,
  'href="' + favData + '"'
);

// 3) og:image 상대경로 제거(단일 파일에선 무의미)
html = html.replace(/\s*<meta property="og:image"[^>]*>/, "");

// 4) 5개의 외부 script 블록 → 하나의 인라인 <script>
html = html.replace(
  /\s*<script src="assets\/data\/content\.js"><\/script>[\s\S]*?<script src="assets\/js\/app\.js"><\/script>/,
  () => "\n  <script>\n" + safeScripts + "\n  </script>"
);

// 5) 단일본 표식 주석
html = html.replace(
  /<head>/,
  "<head>\n  <!-- 단일 파일 빌드 (build-standalone.js 로 생성). 이 파일 하나만 있으면 열람 가능 -->"
);

const out = "wireless-kb-standalone.html";
fs.writeFileSync(path.join(root, out), html, "utf8");
const kb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(0);
console.log("생성 완료: " + out + " (" + kb + " KB)");
