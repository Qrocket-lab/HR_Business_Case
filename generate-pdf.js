/**
 * generate-pdf.js
 * ──────────────────────────────────────────────────────────────────────────
 * Generates an A4-landscape PDF from https://hr-business-case.vercel.app/
 * with a cover page, one slide per page, and clickable hyperlinks.
 *
 * Requirements:
 *   npm install --save-dev puppeteer
 *
 * Run:
 *   node generate-pdf.js
 *
 * Output:
 *   Project-Horizon-HR-Case-Study.pdf  (in the project root)
 * ──────────────────────────────────────────────────────────────────────────
 */

const puppeteer = require('puppeteer');
const path = require('path');

const SITE_URL   = process.env.SITE_URL || 'https://hr-business-case.vercel.app/';
const OUTPUT     = path.join(__dirname, 'Project-Horizon-HR-Case-Study.pdf');
const TITLE      = 'Project Horizon – ABC Corporation HR Case Study';
const DATE_LABEL = 'Strategic HR Initiative · May 2025';

// Section IDs in page order (matches app/page.tsx component order)
const SECTIONS = [
  'mandate',          // Hero
  'root-cause',       // RootCause
  'priority',         // PriorityMatrix
  'solutions',        // SolutionPillars
  'budget',           // BudgetSection
  'roi',              // Dashboard / Financial Simulation
  'implementation',   // ImplementationRoadmap
  'metrics',          // SuccessMetrics
  'conclusion',       // Conclusion
];

async function generate() {
  console.log('🚀 Launching headless Chromium…');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });

  const page = await browser.newPage();

  // A4 landscape at 96 dpi ≈ 1122 × 794 px
  await page.setViewport({ width: 1122, height: 794, deviceScaleFactor: 1 });

  console.log(`📡 Loading ${SITE_URL} …`);
  await page.goto(SITE_URL, { waitUntil: 'networkidle0', timeout: 90_000 });

  // Let React hydration + animations settle
  await delay(3_000);

  console.log('🎨 Injecting cover page & print layout…');
  await page.evaluate((sections, siteUrl, title, dateLabel) => {
    // ── 1. Hide sticky navbar (would bleed across all PDF pages) ──────────
    const nav = document.querySelector('nav');
    if (nav) nav.style.display = 'none';

    // ── 2. Inject cover page ──────────────────────────────────────────────
    const coverHTML = `
      <div style="
        width:100%; height:100vh; min-height:100vh;
        background:#0f172a;
        display:flex; flex-direction:column;
        align-items:center; justify-content:center;
        page-break-after:always; break-after:page;
        position:relative; box-sizing:border-box;
        padding:40px;
      ">
        <p style="
          color:#10b981; font-family:system-ui,sans-serif;
          font-size:12px; letter-spacing:4px;
          text-transform:uppercase; margin:0 0 20px;
        ">HR Case Study</p>

        <h1 style="
          color:#ffffff; font-family:system-ui,sans-serif;
          font-size:56px; font-weight:800; line-height:1.1;
          margin:0 0 12px; text-align:center;
        ">Project Horizon</h1>

        <h2 style="
          color:#94a3b8; font-family:system-ui,sans-serif;
          font-size:26px; font-weight:400;
          margin:0 0 48px; text-align:center;
        ">ABC Corporation · Strategic HR Case Study</h2>

        <div style="
          margin:0 0 28px; text-align:center;
          font-family:system-ui,sans-serif;
        ">
          <p style="
            color:#64748b; font-size:11px;
            letter-spacing:2px; text-transform:uppercase;
            margin:0 0 8px;
          ">Prepared by</p>
          <p style="
            color:#ffffff; font-size:20px;
            font-weight:700; margin:0;
          ">Qodri Muhamad</p>
          <p style="
            color:#94a3b8; font-size:13px;
            margin:4px 0 0;
          ">Business Intelligence Analyst</p>
        </div>

        <a href="${siteUrl}" style="
          color:#60a5fa; font-family:system-ui,sans-serif;
          font-size:14px; text-decoration:underline;
          background:rgba(96,165,250,0.08);
          border:1px solid rgba(96,165,250,0.3);
          padding:10px 22px; border-radius:8px;
          display:inline-block;
        ">${siteUrl}</a>

        <p style="
          position:absolute; bottom:28px;
          color:#475569; font-family:system-ui,sans-serif;
          font-size:11px; margin:0;
        ">${dateLabel}</p>
      </div>
    `;
    const cover = document.createElement('div');
    cover.innerHTML = coverHTML;
    document.body.insertBefore(cover, document.body.firstChild);

    // ── 3. Force each section onto its own A4-landscape page and fit safely ─
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Measure natural size first (before any clipping styles are applied).
      el.style.height = 'auto';
      el.style.minHeight = '0';
      el.style.maxHeight = 'none';
      el.style.overflow = 'visible';

      const naturalHeight = el.scrollHeight;
      const naturalWidth = Math.max(el.scrollWidth, viewportWidth);

      // Wrap existing content so we can scale contents without affecting page breaks.
      const fitWrapper = document.createElement('div');
      fitWrapper.style.width = '100%';
      fitWrapper.style.height = 'auto';
      fitWrapper.style.transformOrigin = 'top left';

      while (el.firstChild) {
        fitWrapper.appendChild(el.firstChild);
      }
      el.appendChild(fitWrapper);

      const scale = Math.min(viewportWidth / naturalWidth, viewportHeight / naturalHeight, 1);
      if (scale < 1) {
        fitWrapper.style.transform = `scale(${scale})`;
        fitWrapper.style.width = `${100 / scale}%`;
      }

      el.style.pageBreakBefore = 'always';
      el.style.breakBefore     = 'page';
      el.style.pageBreakAfter  = 'always';
      el.style.breakAfter      = 'page';
      el.style.height          = '100vh';
      el.style.minHeight       = '100vh';
      el.style.maxHeight       = '100vh';
      el.style.overflow        = 'hidden';
      el.style.boxSizing       = 'border-box';
    });

    // ── 4. Global print-colour-fidelity rule ─────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust:          exact !important;
        color-adjust:                exact !important;
      }
      html, body { margin:0; padding:0; }
      @page { margin:0; }
    `;
    document.head.appendChild(style);
  }, SECTIONS, SITE_URL, TITLE, DATE_LABEL);

  // Brief pause after DOM changes
  await delay(1_000);

  console.log('📄 Rendering PDF…');
  await page.pdf({
    path: OUTPUT,
    format: 'A4',
    landscape: true,
    printBackground: true,
    tagged: true,           // accessibility + preserves link annotations
    displayHeaderFooter: false,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();

  console.log(`\n✅  PDF saved → ${OUTPUT}`);
  console.log(`    Pages: 1 cover + ${SECTIONS.length} slides = ${SECTIONS.length + 1} total`);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

generate().catch((err) => {
  console.error('❌ PDF generation failed:', err);
  process.exit(1);
});
