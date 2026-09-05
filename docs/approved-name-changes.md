# Approved portfolio name changes

The user approved replacing the names of the three most recently added concept projects after client feedback. The identities retain their sectors, visual motifs, colors and application scenes.

| Previous name | Approved Arabic name | Latin wordmark | Canonical route |
| --- | --- | --- | --- |
| NAYSAR | أوّل نفحة | AWWAL NAFHA | /{locale}/work/awwal-nafha |
| NAWSAQ | رَحْب الدار | RAHB ALDAR | /{locale}/work/rahb-aldar |
| DARWAQ | تَتابُع | TATABU | /{locale}/work/tatabu |

## Naming rationale

- **أوّل نفحة** refers to the first encounter with a fragrance. It replaces the previous coined-name explanation in both languages.
- **رَحْب الدار** evokes a spacious home and connects the architectural identity with comfortable residential life.
- **تَتابُع** describes the succession of connected steps from parcel collection through delivery.

These remain explicitly fictional identity studies. Approval of a portfolio name does not imply formal trademark clearance.

## Implementation

Homepage cards, case-study copy, wordmarks, image descriptions, interface concepts, contact messages and page metadata use the approved names in Arabic and English. Longer names receive adjusted responsive typography.

The previous case routes redirect permanently to the corresponding new route in both locales. Qira also redirects directly to AWWAL NAFHA, avoiding an unnecessary intermediate redirect. The sitemap contains the same sixteen canonical pages, with the three renamed routes replacing their predecessors.

All nine application photographs are edited using the built-in image generation tool to replace the wordmarks while retaining their existing scenes. Stable asset directory names and existing social-image URLs are preserved for compatibility. In-page image URLs use a new version query so cached image optimization cannot reuse the old lettering.

The older creative-notes documents preserve the original generation history. The approved names and current naming rationale in this document supersede their naming sections.

## Image editing prompts and review

Method: built-in image generation in edit mode, one request per source photograph. Each local edit target was visually inspected before editing. Every final image is 1536 × 1024 and was reviewed for the approved wordmark. Generative editing can vary fine surface textures slightly.

### naysar applications

Targets: `public/assets/naysar/hero.png`, `public/assets/naysar/packaging.png`, `public/assets/naysar/campaign.png`.

Exact prompt used once for each target:

Use case: text-localization. Input image 1 is the edit target. Edit this existing portfolio application photo, preserving its entire scene. Replace EVERY old NAYSAR wordmark with exact uppercase "AWWAL NAFHA" (A-W-W-A-L space N-A-F-H-A), classy fine serif uppercase matching original. Stack AWWAL over NAFHA for bottle labels and wherever width needs. Keep original 01, 02, 03 numerals. On the three tiny miniature perfume labels, use the existing elegant oval logo mark alone above the original numeral, no wordmark at all; never abbreviate or invent tiny text. Change ONLY the old Latin wordmarks. Preserve all original objects, logo symbols, colors, surfaces, textures, geometry, placements, camera perspective, lighting, reflections, shadows, framing and original 1536x1024 dimensions. No Arabic, no additional text, no nonsense tiny lettering, no watermark. Make the new names correctly spelled and visually consistent across every application in the image.

### nawsaq applications

Targets: `public/assets/nawsaq/hero.png`, `public/assets/nawsaq/presentation.png`, `public/assets/nawsaq/wayfinding.png`.

Exact prompt used once for each target:

Use case: text-localization. Input image 1 is the edit target. Edit this existing portfolio application photo, preserving its entire scene. Replace EVERY old NAWSAQ wordmark with exact uppercase "RAHB ALDAR" (R-A-H-B space A-L-D-A-R), restrained sans serif matching original. Preserve the open-corner frame logo mark exactly. If needed stack RAHB over ALDAR at same original wordmark location. On the presentation image also replace the sign inside the printed architectural photo as well as folder and both business cards. Keep all original numbers and arrows. Change ONLY the old Latin wordmarks. Preserve all original objects, logo symbols, colors, surfaces, textures, geometry, placements, camera perspective, lighting, reflections, shadows, framing and original 1536x1024 dimensions. No Arabic, no additional text, no nonsense tiny lettering, no watermark. Make the new names correctly spelled and visually consistent across every application in the image.

### darwaq applications

Targets: `public/assets/darwaq/hero.png`, `public/assets/darwaq/parcels.png`, `public/assets/darwaq/uniform.png`.

Exact prompt used once for each target:

Use case: text-localization. Input image 1 is the edit target. Edit this existing portfolio application photo, preserving its entire scene. Replace EVERY old DARWAQ wordmark with exact uppercase "TATABU" (T-A-T-A-B-U), same bold slightly italic lettering, size balance and color as original. Preserve orange double chevrons exactly. On tape and cap that currently have only chevrons, retain symbols only and add no lettering. Change ONLY the old Latin wordmarks. Preserve all original objects, logo symbols, colors, surfaces, textures, geometry, placements, camera perspective, lighting, reflections, shadows, framing and original 1536x1024 dimensions. No Arabic, no additional text, no nonsense tiny lettering, no watermark. Make the new names correctly spelled and visually consistent across every application in the image.

### Perfume hero correction

The first hero edit put oval symbols on two full-size bottle labels. A targeted edit restored the complete name on both. The final hero contains AWWAL NAFHA on all full-size bottles and boxes; only the miniature samples in the separate packaging photograph use symbols and edition numbers.

Use case: text-localization. Input image 1 is the edit target. Make one targeted correction ONLY: on the foreground left bottle label 01 and foreground right bottle label 03, replace each thin oval icon with the exact two-line fine uppercase serif wordmark "AWWAL" over "NAFHA" (A-W-W-A-L then N-A-F-H-A). Match the already correct center bottle 02 lettering style. Both foreground bottles are full-size and need the complete wordmark legibly. Keep 01 and 03 numerals below. All five brand applications must now read AWWAL NAFHA. Preserve the already correct wordmarks on both boxes and center bottle, their oval box embossing, every object, all colors, burgundy labels, glass, reflections, original scene, geometry, perspective, lighting, shadows, texture and framing. Output original 1536x1024 dimensions. No other text or changes.
