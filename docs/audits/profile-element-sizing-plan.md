# Profile element sizing — next implementation plan

The additional arrangements are implemented. This plan covers the next sizing refinement, not additional whole-site modes.

1. Define shared minimum, preferred and maximum sizes for portrait, name, action buttons, sentence band and gaps. Use the card's inner width and available height; keep navigation's reserved space authoritative.
2. Let gaps compress first, then the portrait. Keep profile actions usable and choose a horizontal or vertical pair from their actual combined footprint. Use remaining width to move the left action toward the portrait without crossing its safe boundary.
3. Size the name against its actual grid cell, allowing a complete single line or natural two-line name. Preserve the script style and avoid horizontal stretching or cutting off glyphs. Refit after fonts or translated names change.
4. Keep the sentence band's text readable and its height stable. Reveal it only when the complete arrangement fits. Keep the selected arrangement at its natural height and return surplus space to navigation.
5. Limit the final spacious stage to modest growth (currently 8% for profile controls and the portrait ceiling). Navigation receives most additional vertical space. Add hysteresis only if boundary resizing shows visible oscillation.
6. Extend the focused fit test at the relevant transition boundaries. Assert containment, no overlap, full name bounds and reachable controls; visually check one tight and one spacious card. Avoid repeating the whole website matrix.

Current checks: seventeen rail-size cases passed, including explicit side-band, name/actions, name-only and hidden stages. Lint and production build passed for the added arrangements.
