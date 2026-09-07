# AEVU replacement — 2026-09-07

Replaces the conceptual fragrance project Awwal Nafha with إيڤو — AEVU, as requested by the site owner, including publication. Existing Awwal Nafha, Naysar and Qira project URLs permanently redirect to AEVU. Other portfolio projects remain available.

## Deliverables

- 36-page Arabic strategy, identity and feasibility guide in `public/downloads/AEVU-Strategy-Identity-Feasibility.pdf`.
- Editable, formula-based, seven-sheet workbook in `public/downloads/AEVU-Financial-Model.xlsx`.
- Arabic and English project and feasibility routes, home card, metadata, sitemap entry and download links.
- Three AEVU imagery assets. All product and direction imagery was generated for this concept with AI; no stock product mockup or third-party campaign photograph was used. Letterforms and custom glass details remain concept proposals requiring vector artwork and manufacturing prototypes.

## Financial scope and reconciliation

Saudi e-commerce; one 50 ml contract-manufactured fragrance and one bottle per order. All commercial inputs are planning assumptions, not quotations or achieved sales. Published trademark fees and VAT are separately attributed. No owned factory, physical store, wholesale, exclusive glass tooling, financing, depreciation or zakat/income-tax calculation is included.

Base: 3,650 annual orders, SAR 195.216 net revenue and SAR 139.227 variable cost per order. Annual operating surplus is SAR 24,359.85 after founder allowance. Base funding is SAR 200,000, plus a separate assumed SAR 10,000 VAT timing buffer.

The reusable web calculator pays COGS monthly and holds inventory constant. Its closing cash is SAR 84,359.85. The PDF and workbook explicitly model supplier installments and opening inventory falling from 1,000 to 350 units; closing cash is SAR 124,659.85. The SAR 40,300 difference equals the stock reduction at SAR 62. Profitability reconciles across all three outputs. The workbook includes stock, cash, scenario and early-deposit checks. Supplier schedules must be revised when volume or lead time changes.

## Sources and rebuilding

Primary links and dated desk observations appear in the guide, workbook and website. No market-size estimate or trademark-availability conclusion is asserted.

`scripts/build-aevu-study.py` authors the JSON content, financial reference and PDF. Requires Python, Pillow, WeasyPrint and the named IBM Plex Sans Arabic / Manrope font files in `AEVU_FONTS_DIR` (default `../aevu-build/fonts`). Published WebP assets are sufficient when the original generated PNGs are unavailable.

`scripts/build-aevu-financial.mjs` requires `@oai/artifact-tool` in the execution environment. Run it after the PDF builder, which writes `sources.json` to `../aevu-build`. It calculates and checks formulas, exports XLSX and renders seven previews outside the repository. Optional `AEVU_REPO` and `AEVU_BUILD_DIR` override paths. These authoring dependencies are not production application dependencies.

## Verification

The 36-page PDF was rendered and reviewed, including corrected cash-table spacing. Every workbook sheet was rendered; formula error search was empty and all nine finance checks returned OK. Independent Python Decimal calculations reconciled base economics, monthly supplier cash, stock and three scenarios. Next.js production build and targeted portfolio, download, routing and financial contract tests were run before publication.
