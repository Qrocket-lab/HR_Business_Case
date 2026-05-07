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

const SITE_URL   = process.env.SITE_URL || 'http://localhost:3000/';
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
        background:linear-gradient(180deg, #262626 0%, #333333 45%, #2d2d2d 100%);
        display:flex; flex-direction:column;
        align-items:center; justify-content:center;
        page-break-after:always; break-after:page;
        position:relative; box-sizing:border-box;
        padding:60px 40px;
        overflow:hidden;
      ">
        <!-- Grid background -->
        <div style="
          position:absolute; inset:0;
          background-image:linear-gradient(rgba(222,255,154,1) 1px, transparent 1px), linear-gradient(90deg, rgba(222,255,154,1) 1px, transparent 1px);
          background-size:60px 60px;
          opacity:0.035;
          pointer-events:none;
        "></div>

        <!-- Radial glow -->
        <div style="
          position:absolute; top:30%; left:50%;
          transform:translate(-50%, -50%);
          width:800px; height:600px;
          background:radial-gradient(ellipse at center, rgba(222,255,154,0.07) 0%, transparent 70%);
          pointer-events:none;
        "></div>

        <!-- Content -->
        <div style="
          position:relative; z-index:10;
          text-align:center;
        ">
          <!-- Badge -->
          <div style="
            display:inline-flex;
            align-items:center;
            gap:8px;
            background:rgba(222,255,154,0.1);
            border:1px solid rgba(222,255,154,0.2);
            border-radius:9999px;
            padding:6px 16px;
            margin-bottom:40px;
            font-family:system-ui,sans-serif;
          ">
            <span style="
              display:inline-block;
              width:8px; height:8px;
              border-radius:50%;
              background:#DEFF9A;
              animation:pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            "></span>
            <span style="
              color:#DEFF9A;
              font-size:11px;
              font-weight:600;
              letter-spacing:1px;
              text-transform:uppercase;
            ">Strategic HR Case Study · ABC Corporation · FY2026</span>
          </div>

          <!-- Main headline -->
          <h1 style="
            font-family:system-ui,sans-serif;
            font-size:88px;
            font-weight:800;
            line-height:1.05;
            margin:0 0 24px;
            color:#ffffff;
          ">Project <span style="
            background:linear-gradient(135deg, #DEFF9A, #a8f0ff);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
            background-clip:text;
          ">Horizon</span></h1>

          <!-- Subtitle -->
          <p style="
            font-family:system-ui,sans-serif;
            font-size:24px;
            font-weight:600;
            color:#cbd5e1;
            margin:0 0 16px;
            max-width:800px;
          ">Re-engineering the Employee Lifecycle for a Digital Era</p>

          <!-- Description -->
          <p style="
            font-family:system-ui,sans-serif;
            font-size:16px;
            color:#94a3b8;
            margin:0 0 48px;
            max-width:700px;
            line-height:1.6;
          ">A critical inflection point where a 5,000-employee legacy workforce must transition into a tech-forward banking leader, backed by a data-driven IDR 2 Billion strategy.</p>

          <!-- Author section -->
          <div style="
            margin:0 0 32px;
            font-family:system-ui,sans-serif;
          ">
            <p style="
              color:#64748b;
              font-size:12px;
              letter-spacing:2px;
              text-transform:uppercase;
              margin:0 0 8px;
              font-weight:600;
            ">Prepared by</p>
            <p style="
              color:#ffffff;
              font-size:22px;
              font-weight:700;
              margin:0;
            ">Qodri Muhamad</p>
            <p style="
              color:#94a3b8;
              font-size:14px;
              margin:4px 0 0;
            ">Business Intelligence Analyst</p>
          </div>

          <!-- URL link -->
          <a href="${siteUrl}" style="
            display:inline-block;
            color:#a8f0ff;
            font-family:system-ui,sans-serif;
            font-size:14px;
            text-decoration:none;
            background:rgba(168,240,255,0.08);
            border:1px solid rgba(168,240,255,0.25);
            padding:12px 24px;
            border-radius:8px;
            font-weight:500;
          ">${siteUrl}</a>
        </div>

        <!-- Footer -->
        <p style="
          position:absolute; bottom:32px;
          color:#475569;
          font-family:system-ui,sans-serif;
          font-size:12px;
          margin:0;
          letter-spacing:0.5px;
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
