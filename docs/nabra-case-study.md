# NABRA complete case study

The NABRA case study publishes the complete substantive content of the reviewed
41-page Arabic strategy and visual identity guide. Its 39 content sections are
grouped into nine navigable chapters. Cover and closing messages appear in the
web hero and closing section.

- Routes: `/ar/work/nabra` and `/en/work/nabra`.
- Both routes include the full Arabic study, explicitly marked `lang="ar"`
  and `dir="rtl"`. The English route has an English introduction and controls.
- Editorial source: `content/nabra-guide.json`. HTML fragments are trusted,
  checked-in content; do not replace them with unsanitized CMS or visitor input.
- Images and backgrounds retain the existing NABRA identity, converted to WebP.
- Fonts retain the Noto families with their SIL Open Font License.
- Download: `/downloads/NABRA-Strategy-and-Visual-Identity.pdf`.
  The web copy preserves all 41 pages, text, links and bookmarks, with image
  compression for a smaller download.

NABRA is a fictional healthcare concept by ATHR. Proposed services, research,
journeys and launch plans must not be described as operating services, completed
field research, actual treatment results or production-ready deliverables.
The existing guide's source references and research limitations remain visible.

Validation: production build, existing SEO contract checks, and static checks of
chapter coverage, fragment targets, metadata, images, font paths and PDF content.
