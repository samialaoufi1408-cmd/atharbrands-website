# Complete portfolio studies

The seven existing cases now match NABRA's complete-study structure: nine chapters, 39 substantive sections, and one 41-page Arabic PDF per brand. The English routes retain English navigation and summaries and explicitly identify the full study and download as Arabic.

Each case has its own strategy, audience, positioning, voice, customer journey, validation plan, identity rules, applications, launch plan, measures and ownership. Content lives in `content/studies/` and drives both the server-rendered pages and PDFs. The renderer does not accept visitor or CMS rich text.

| Case | Preserved source and decisions |
| --- | --- |
| ATHR | Actual studio identity, v1.2 source guide and v2.0 site; five fixed values and the existing seal. Digital colors follow the current site. Proposed custom fonts remain unimplemented concepts. |
| AWWAL NAFHA | Approved name update, open ellipse, wine/rose palette and three approved product images. Fragrance families remain product-development concepts. |
| RAHB ALDAR | Approved name update, open frames, architectural palette and three project images. No invented sales, area or availability claims. |
| TATABU | Approved name update, double chevrons, blue/orange and vehicle, parcel and workwear assets. States are proposed workflows, not a live tracking system. |
| WIZAN | Complete v1.2 guide, mark, four values, typography and palette. Original interface scores are explicitly illustrative and not validated health measures. |
| SUMRA | Original 29-page guide, six colors, IBM Plex families, logo variants and minimum sizes. The roast indicator is distinct from the three-arch logo. |
| DAHSHA | Original 22-page illustrated guide, mark, eight colors, fonts and six values. Conflicting source clear-space rules are consolidated to 10%, explicitly recorded in the study. |

All concept cases retain their concept status. Desk comparisons cite official sector sources and distinguish observed presentation from proposed differentiation. No field interviews, product manufacture, operating results, clinical outcomes or child-development outcomes are claimed. Contrast ratios are recalculated from the supplied HEX values.

## Implementation

- Existing routes, canonical URLs and legacy-name redirects are preserved.
- Shared `CompleteStudy` is a server component with native Arabic text, chapter anchors, accessible table regions, captioned optimized assets and PDF download links.
- NABRA's approved study remains intact; the home-page case link label now invites reading the complete studies.
- Existing source images and vector marks are reused. Additional figures are extracts from the supplied WIZAN and DAHSHA guides.
- The former DAHSHA PDF URL remains available as a legacy asset; the new complete guide is the primary download.

## Rebuilding the PDFs

Run `python3 scripts/build-project-guides.py` with PyMuPDF, Pillow and fontTools installed. Set `ATHR_GUIDE_OUTPUT_DIR` to write review copies elsewhere; otherwise output goes to `public/downloads`. The script reads the existing four licensed Noto WOFF files, creates temporary TTF files and embeds subsets in the PDFs. Missing fonts fail before rendering. Every text box must fit without scaling; each table cell is measured individually. The output includes chapter and section bookmarks and source links.

## Verification

Type checking, the production build and all four existing SEO contract checks pass. All 14 locale routes were checked for 39-section coverage, unique IDs, nine chapter targets, descriptive metadata, language marking and download mapping. Image dimensions and downloadable file copies were verified against their sources.

All seven PDFs have 41 pages and 50 bookmarks, embedded Arabic fonts and working source-link annotations. The renderer measured 2,968 text boxes with zero overflow. All 287 pages were rendered and their contact sheets inspected, with additional full-size checks of dense tables, palettes and application figures.
