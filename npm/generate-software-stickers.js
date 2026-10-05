import fs from 'node:fs/promises'
import path from 'node:path'

// Authoring source: shared geometry and the former dark palette in every theme.
// The application consumes the inline vectors and generated palette stylesheet.
const root = process.cwd()
const assetRoot = path.join(root, 'public/images/stickers/software')
const output = assetRoot
const componentRoot = path.join(root, 'src/components/sections/decorations/software')
const palette = {
        ink: '#10263B', edge: '#98DAF3', surface: '#15324A', quiet: '#45647F',
        paper: '#DAEAFA', 'ice-shadow': '#A2BED5', blue: '#78AEFF', 'blue-light': '#ABCDFF', 'blue-deep': '#2562AD',
        cyan: '#57E0D4', 'cyan-light': '#A7F0E5', 'cyan-deep': '#208A98',
        violet: '#C29BFF', 'violet-light': '#DBC4FF', 'violet-deep': '#8554D2',
        rose: '#FF91B9', 'rose-light': '#FFC2D6', 'rose-deep': '#BF537F', highlight: '#EDFAFF'
}
const variable = token => `var(--sticker-${token})`
const paletteDeclarations = palette => Object.entries(palette).map(([key, value]) => `--sticker-${key}:${value}`).join(';')

function drawing(prefix) {
    const gradients = new Map()
    const colour = token => token === 'none' || token.startsWith('url(') ? token : variable(token)
    const gradient = (top, bottom, diagonal = false) => {
        const id = `${prefix}-${top}-${bottom}${diagonal ? '-diagonal' : ''}`
        gradients.set(id, `<linearGradient id="${id}" x1="0" y1="0" x2="${diagonal ? '.8' : '0'}" y2="1"><stop stop-color="${variable(top)}"/><stop offset="1" stop-color="${variable(bottom)}"/></linearGradient>`)
        return `url(#${id})`
    }
    const line = (d, token, width = 5, opacity = 1) => `<path d="${d}" fill="none" stroke="${colour(token)}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}"/>`
    const shape = (d, token, width = 4.5) => `<path d="${d}" fill="${colour(token)}" stroke="${variable('edge')}" stroke-width="${width + 3}" stroke-linejoin="round"/><path d="${d}" fill="${colour(token)}" stroke="${variable('ink')}" stroke-width="${width}" stroke-linejoin="round"/>`
    const fill = (d, token, opacity = 1) => `<path d="${d}" fill="${colour(token)}" opacity="${opacity}"/>`
    const circle = (x, y, r, token, outline = false) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${colour(token)}"${outline ? ` stroke="${variable('ink')}" stroke-width="4.5"` : ''}/>`
    const rect = (x, y, w, h, r, token) => shape(`M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`, token)
    const group = (transform, art) => `<g transform="${transform}">${art}</g>`
    const heart = (x, y, scale, token) => group(`translate(${x} ${y}) scale(${scale})`, fill('M0 22C-17 10-30-1-30-15C-30-35-8-40 0-24C8-40 30-35 30-15C30-1 17 10 0 22Z', token))
    const club = (x, y, scale, token) => group(`translate(${x} ${y}) scale(${scale})`, fill('M0-43C19-43 30-24 22-8C43-16 59-1 53 18C49 34 30 39 14 29C16 45 23 55 29 65H-29C-23 55-16 45-14 29C-30 39-49 34-53 18C-59-1-43-16-22-8C-30-24-19-43 0-43Z', token))
    return {gradient, line, shape, fill, circle, rect, group, heart, club, definitions: () => `<defs>${[...gradients.values()].join('')}</defs>`}
}

const entries = [
    {
        projectId: 1, filename: '01-language.svg', title: 'A conversation across languages',
        idea: 'Two interlocking, angled speech bubbles; large custom German and Croatian glyphs, with no miniature interface.',
        draw: ({shape, gradient, fill, line, circle}) =>
            shape('M37 35L144 27Q155 26 158 39L170 126Q172 139 158 140L100 145L66 170L63 148L47 149Q35 150 33 137L23 51Q21 37 37 35Z', gradient('blue-light', 'blue')) +
            fill('M27 62L160 49L157 36Q156 29 143 30L38 38Q25 39 25 52Z', 'blue-deep', .45) +
            shape('M119 104L215 94Q229 92 230 107L237 182Q238 195 224 197L215 198L215 222L183 202L129 208Q116 209 114 195L106 122Q104 105 119 104Z', gradient('violet-light', 'violet')) +
            line('M57 118L79 67L110 112M65 100L99 96', 'paper', 9) + circle(69, 53, 4, 'paper') + circle(86, 51, 4, 'paper') +
            line('M190 128C166 115 136 135 142 161C147 185 178 190 195 173M159 104L167 112L175 103', 'paper', 8) +
            line('M122 123L148 120', 'highlight', 3, .6)
    },
    {
        projectId: 1, filename: '02-practice.svg', title: 'Listen, learn, complete',
        idea: 'Headphones embrace one angled practice tile; a single large check is the focal point.',
        draw: ({shape, gradient, rect, group, fill, line}) =>
            shape('M49 120V92C49 47 84 23 128 23C172 23 207 47 207 92V120H190V94C190 59 163 41 128 41C93 41 66 59 66 94V120Z', gradient('cyan-light', 'cyan')) +
            group('rotate(-11 128 143)', rect(71, 72, 117, 151, 13, gradient('violet-light', 'violet')) +
                fill('M78 79H180V109H78Z', 'violet-deep', .27) + line('M90 156L117 183L167 125', 'ink', 17) + line('M90 156L117 183L167 125', 'cyan-light', 10)) +
            shape('M47 101H64Q74 101 74 113V156Q74 168 62 168H50Q38 168 38 155V114Q38 103 47 101Z', gradient('blue-light', 'blue')) +
            shape('M193 101H206Q218 103 218 114V155Q218 168 206 168H194Q182 168 182 156V113Q182 101 193 101Z', gradient('blue-light', 'blue')) +
            line('M46 116V151M210 116V151', 'paper', 4, .75)
    },
    {
        projectId: 2, filename: '03-cards.svg', title: 'The Belot hand',
        idea: 'A newly drawn diagonal three-card hand, with crisp folds and a large club on the foreground card.',
        draw: ({group, rect, gradient, club, heart, line, fill}) =>
            group('translate(17 10) scale(.88)', group('rotate(-29 126 194)', rect(58, 46, 118, 158, 9, gradient('rose-light', 'rose')) + heart(112, 112, .8, 'rose-deep')) +
            group('rotate(15 126 194)', rect(71, 44, 118, 158, 9, gradient('blue-light', 'blue')) + fill('M85 65H173V180H85Z', 'blue-deep', .24)) +
            group('rotate(-8 126 194)', rect(76, 39, 116, 163, 9, gradient('paper', 'ice-shadow')) + club(134, 111, .64, 'cyan-deep') +
                club(94, 59, .16, 'cyan-deep') + club(174, 172, .16, 'cyan-deep') + line('M86 189H157', 'quiet', 2.5)))
    },
    {
        projectId: 2, filename: '04-club.svg', title: 'A winning Belot trick',
        idea: 'An angular split-colour club medallion with two small ribbon tails; one clear game symbol.',
        draw: ({shape, gradient, fill, line}) =>
            shape('M62 148L53 222L88 204L111 226L124 153Z', gradient('violet', 'violet-deep')) +
            shape('M136 152L146 226L170 204L204 223L194 148Z', gradient('blue', 'blue-deep')) +
            shape('M128 24L191 49L221 104L207 162L155 195L95 195L44 161L30 102L63 49Z', gradient('surface', 'quiet')) +
            shape('M128 44L179 64L203 106L191 150L150 177H101L61 149L49 105L76 64Z', gradient('cyan-light', 'cyan')) +
            fill('M128 44V177H150L191 150L203 106L179 64Z', 'cyan-deep', .30) +
            shape('M127 66C145 66 156 85 147 98C165 92 181 106 176 122C172 135 157 140 143 130C145 143 151 153 155 159H101C105 153 111 143 113 130C99 140 84 135 80 122C75 106 91 92 109 98C100 85 111 66 127 66Z', 'paper', 3.5) +
            line('M63 143L55 106L81 68', 'highlight', 3, .55)
    },
    {
        projectId: 3, filename: '05-pepper.svg', title: 'Pepper, ready to play',
        idea: 'A new three-quarter Pepper portrait with an elongated ceramic face, optical eyes and visible neck joint.',
        draw: ({shape, gradient, circle, fill, line}) =>
            shape('M90 179L165 173L178 224L73 224Z', gradient('surface', 'quiet')) +
            shape('M102 181L157 177V207L103 211Z', 'cyan-deep') +
            shape('M43 84Q32 81 30 98L29 131Q31 149 44 146L58 140L60 88Z', gradient('blue', 'blue-deep')) +
            shape('M188 82Q211 72 215 94L220 126Q220 146 201 151L185 143Z', gradient('blue-light', 'blue')) +
            shape('M67 42Q123 14 184 41L200 124Q197 171 139 199Q80 180 56 142L54 84Z', gradient('paper', 'quiet')) +
            fill('M69 46Q124 23 180 45L186 70Q121 52 61 79Z', 'surface') +
            fill('M183 52L196 123Q196 164 142 193L164 156L170 92Z', 'quiet', .38) +
            circle(94, 107, 19, 'ink') + circle(158, 100, 20, 'ink') + circle(94, 107, 9, 'blue') + circle(158, 100, 10, 'cyan') +
            circle(92, 103, 3.5, 'highlight') + circle(155, 96, 3.5, 'highlight') + circle(126, 60, 6, 'ink') +
            line('M108 155Q127 165 145 151', 'ink', 6) + line('M65 91L70 57L88 49', 'highlight', 3, .7)
    },
    {
        projectId: 3, filename: '06-dealing.svg', title: 'One precise deal',
        idea: 'A diagonal two-joint robot arm lifts a single diamond card. The mechanism has clear, plausible articulation.',
        draw: ({shape, gradient, circle, group, rect, line, fill}) =>
            shape('M28 194L100 188L112 223L25 227Z', gradient('surface', 'quiet')) +
            shape('M53 194L37 139L57 123L99 179L90 200Z', gradient('blue-light', 'blue')) +
            shape('M48 134L132 100L147 124L64 155Z', gradient('cyan-light', 'cyan')) +
            circle(59, 141, 23, 'ink') + circle(59, 141, 15, 'blue') + circle(59, 141, 6, 'paper') +
            circle(138, 110, 19, 'ink') + circle(138, 110, 12, 'cyan') +
            group('rotate(16 187 85)', rect(157, 27, 70, 110, 7, gradient('violet-light', 'violet')) +
                fill('M192 51L211 80L192 109L173 80Z', 'paper') + line('M164 39H200', 'highlight', 3, .6)) +
            shape('M137 97L157 76L172 83L157 103L173 122L159 137L138 121Z', 'surface') +
            line('M69 132L119 113', 'highlight', 3, .7)
    },
    {
        projectId: 4, filename: '07-house.svg', title: 'Villa Bagara, in perspective',
        idea: 'An architectural cutout of a compact mountain house: pitched roof, shaded side wall and generous windows.',
        draw: ({shape, gradient, fill, line}) =>
            shape('M39 116L132 78L216 112V192L140 221L41 188Z', gradient('surface', 'quiet')) +
            fill('M140 131L213 106V189L140 217Z', 'cyan-deep') +
            shape('M25 113L93 44L175 66L232 115L142 145L87 91L42 129Z', gradient('blue-light', 'blue')) +
            fill('M93 47L175 69L229 114L142 140Z', 'blue-deep', .48) +
            line('M91 55L144 131L218 108', 'paper', 3, .6) +
            shape('M101 158L126 166V210L101 203Z', 'ink', 3) +
            shape('M55 142L83 151V177L55 168Z', 'cyan-light', 3) +
            shape('M156 153L190 142V169L156 180Z', 'cyan-light', 3) +
            line('M171 149V172M69 148V173', 'cyan-deep', 3) + line('M45 181L95 197', 'quiet', 3)
    },
    {
        projectId: 4, filename: '08-mountain.svg', title: 'The mountain path',
        idea: 'A new asymmetric mountain silhouette with strong geological planes and one winding path through the foreground.',
        draw: ({shape, gradient, fill, line}) =>
            shape('M26 190L77 93L111 122L160 35L234 190L224 211L58 224Z', gradient('blue-light', 'blue')) +
            fill('M160 39L145 112L181 206L228 191Z', 'blue-deep') +
            fill('M77 98L65 165L110 210L112 128Z', 'violet', .7) +
            fill('M160 41L130 95L145 84L155 95L165 77L183 94Z', 'paper') +
            fill('M77 99L58 135L78 125L96 140Z', 'surface') +
            shape('M27 192Q88 155 135 184Q180 160 230 191L222 210L60 224Z', gradient('cyan-light', 'cyan')) +
            line('M82 216C66 196 141 211 137 195C133 183 115 188 112 177', 'paper', 7)
    },
    {
        projectId: 5, filename: '09-family.svg', title: 'A family that branches',
        idea: 'Three anonymous people form one growing family shape; a branching stem connects generations without tiny portraits.',
        draw: ({shape, gradient, circle, fill, line}) =>
            shape('M111 185L111 218H149V183L166 155L144 140L128 171L112 140L90 155Z', gradient('cyan-light', 'cyan')) +
            shape('M34 147Q34 115 66 112H93Q109 119 112 151L110 177L35 166Z', gradient('blue-light', 'blue')) +
            shape('M146 148Q149 119 169 112H195Q224 117 224 147V166L146 177Z', gradient('violet-light', 'violet')) +
            circle(77, 87, 25, 'blue', true) + circle(181, 86, 25, 'violet', true) +
            shape('M85 166Q87 141 113 138H143Q169 142 171 166V190H85Z', gradient('rose-light', 'rose')) +
            circle(128, 117, 22, 'rose', true) +
            fill('M113 211Q80 201 82 180Q108 180 119 198Z', 'cyan-light') +
            line('M121 205L98 190', 'cyan-deep', 3) + line('M47 138Q50 126 59 126M197 126Q211 130 211 143', 'highlight', 3, .6)
    },
    {
        projectId: 5, filename: '10-privacy.svg', title: 'The guarded archive',
        idea: 'A private archive folder is guarded by one broad shield with a large keyhole, using clear overlapping planes.',
        draw: ({shape, gradient, fill, line, circle}) =>
            shape('M32 54H93L110 74H217V189Q217 202 202 202H45Q32 202 32 188Z', gradient('blue-light', 'blue')) +
            shape('M46 84H223L206 201H32Z', gradient('surface', 'quiet')) +
            fill('M47 89H218L215 110H44Z', 'paper', .65) +
            shape('M132 89L201 117L195 164Q187 202 132 229Q80 202 72 164L66 117Z', gradient('violet-light', 'violet')) +
            fill('M132 93V222Q183 196 191 161L197 119Z', 'violet-deep', .43) +
            circle(132, 145, 17, 'paper') + fill('M124 153H140L146 188H118Z', 'paper') +
            line('M81 130L85 159Q88 179 105 191', 'highlight', 3, .65)
    },
    {
        projectId: 6, filename: '11-cv.svg', title: 'A carefully written CV',
        idea: 'A new angled CV sheet with a strong editorial grid and a fountain pen crossing its edge. No tiny readable copy.',
        draw: ({group, shape, gradient, rect, fill, circle, line}) =>
            group('rotate(-10 115 129)', shape('M49 28H145L180 63V217H49Z', gradient('paper', 'ice-shadow')) +
                fill('M145 30V65H178Z', 'blue-light') + line('M145 31V65H176', 'ink', 3) +
                circle(83, 94, 15, 'blue') + line('M110 86H154M110 99H142', 'ink', 6) +
                rect(67, 124, 96, 10, 2, 'violet') + line('M67 148H155M67 164H139M67 188H151', 'ink', 5, .7)) +
            group('rotate(29 184 131)', shape('M170 67Q170 57 183 57Q196 57 196 67V180L184 207L170 180Z', gradient('blue-light', 'blue')) +
                fill('M170 166H196V180L184 207L170 180Z', 'paper') + line('M184 173V193', 'ink', 3) +
                fill('M176 77H181V158H176Z', 'highlight', .65) + line('M198 71V112', 'cyan', 5))
    },
    {
        projectId: 6, filename: '12-type.svg', title: 'TeX, drawn as type',
        idea: 'A bespoke three-letter TeX composition with the lowered E, coloured cuts and generous negative space.',
        draw: ({shape, gradient, fill, line}) =>
            shape('M19 56H96V85H83L79 72H68V166L80 172V184H35V172L47 166V72H36L32 85H19Z', gradient('rose-light', 'rose'), 3.5) +
            shape('M94 88H159V115H146L143 104H121V129H144V144H121V171H146L150 157H164V190H94V177L102 173V105L94 101Z', gradient('violet-light', 'violet'), 3.5) +
            shape('M165 55H196V68L189 73L205 101L220 73L213 68V55H240V68L233 75L216 114L235 165L243 171V184H210V171L217 165L203 135L188 165L195 171V184H163V171L172 165L193 117L175 75L165 68Z', gradient('blue-light', 'blue'), 3.5) +
            fill('M24 59H91V64H24Z', 'highlight', .6) + line('M99 207H162', 'cyan', 5)
    },
    {
        projectId: 7, filename: '13-website.svg', title: 'A website in motion',
        idea: 'A perspective browser canvas with two broad content blocks and a large cursor crossing its edge.',
        draw: ({shape, gradient, fill, line, circle}) =>
            shape('M34 60L197 30L214 166L53 202Z', gradient('surface', 'quiet')) +
            fill('M37 63L194 34L197 62L41 91Z', 'blue-deep') +
            circle(53, 70, 4, 'paper') + circle(67, 67, 4, 'paper') + circle(81, 65, 4, 'paper') +
            fill('M50 104L181 79L186 116L54 143Z', 'violet') +
            fill('M57 153L110 142L114 175L61 187Z', 'cyan') + fill('M123 139L189 125L193 158L127 173Z', 'blue') +
            shape('M141 126L230 165L194 177L214 214L194 226L174 188L153 213Z', gradient('paper', 'ice-shadow')) +
            line('M146 135L154 189', 'highlight', 3, .7)
    },
    {
        projectId: 7, filename: '14-code.svg', title: 'The working code studio',
        idea: 'A newly drawn perspective laptop with one bold code expression. The base and screen create a substantial silhouette.',
        draw: ({shape, gradient, fill, line}) =>
            shape('M47 33H219L193 175H26Z', gradient('cyan-light', 'cyan')) +
            shape('M60 47H204L184 159H43Z', 'ink', 3) +
            fill('M64 52H199L194 76H60Z', 'blue-deep', .6) +
            line('M95 88L75 104L90 121M154 88L170 104L150 121', 'blue-light', 9) + line('M135 85L116 127', 'violet-light', 8) +
            shape('M26 175H193L229 211L65 227L24 193Z', gradient('blue-light', 'blue')) +
            fill('M50 182H177L193 196L68 207Z', 'blue-deep') +
            fill('M98 207L143 203L156 215L113 220Z', 'surface') + line('M29 195L65 219L224 205', 'cyan-light', 3)
    }
]

await fs.mkdir(output, {recursive: true})
await fs.mkdir(path.join(output, 'dark'), {recursive: true})
const drawings = {}
for(const entry of entries) {
    const tools = drawing(`software-v5-${entry.filename.replace('.svg', '')}`)
    const body = entry.draw(tools)
    const markup = tools.definitions() + body
    drawings[entry.filename] = {title: entry.title, markup}
    const resolved = markup.replace(/var\(--sticker-([a-z-]+)\)/g, (_, token) => palette[token])
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><title>${entry.title}</title>${resolved}</svg>\n`
    await fs.writeFile(path.join(output, 'dark', entry.filename), svg)
}
const modulePath = path.join(root, 'src/data/generated/softwareStickerArt.generated.js')
await fs.writeFile(modulePath, `// Generated by npm/generate-software-stickers.js. Edit the generator.\nexport const softwareStickerArt = ${JSON.stringify(drawings, null, 2)}\n`)
const selector = 'section#section-my-software .section-content > .software-project-sticker-layer'
await fs.writeFile(path.join(componentRoot, 'softwareStickerPalettes.generated.css'), `/* Generated by npm/generate-software-stickers.js. */\n${selector}{${paletteDeclarations(palette)}}\n`)
const manifest = {
    generator: 'npm/generate-software-stickers.js', revision: 5, status: 'installed',
    artDirection: 'Entirely new geometric editorial compositions. One coherent action or object per drawing, crisp perspective, substantial colour planes, controlled highlights, no diffuse glow or textured carrier.',
    themeTreatment: 'The former dark-mode palette and artwork are shared unchanged across light and dark themes. No theme overrides or colour filters.',
    palette,
    stickers: entries.map(({draw, ...entry}) => ({...entry, file: `dark/${entry.filename}`}))
}
await fs.writeFile(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
const gallery = entries.map(entry => `<figure><figcaption>${entry.title}<small>${entry.idea}</small></figcaption><div class="comparison">${['light', 'dark'].map(theme => `<div class="stage ${theme}"><b>${theme} background</b><div class="sizes">${[40, 104, 256].map(size => `<div><img src="dark/${entry.filename}" width="${size}" height="${size}" alt="${entry.title}"><small>${size}px</small></div>`).join('')}</div></div>`).join('')}</div></figure>`).join('\n')
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Redrawn Software stickers</title><style>*{box-sizing:border-box}body{margin:0;font:15px/1.5 system-ui,sans-serif;background:#10192b;color:#d7e2f1}main{max-width:1280px;margin:auto;padding:32px 20px}h1{font-size:clamp(28px,4vw,42px);letter-spacing:-.035em;line-height:1.12}p,small{color:#aabbd2}a{color:#91c5e0}figure{margin:24px 0;border:1px solid #34465e;border-radius:10px;overflow:hidden}figcaption{padding:16px 20px;font-weight:700}figcaption small{display:block;font-weight:400}.comparison{display:grid;grid-template-columns:1fr 1fr}.stage{padding:16px;min-width:0}.light{background:linear-gradient(135deg,#fff,#f6e2e9);color:#26344d}.dark{background:linear-gradient(135deg,#101c33,#52221f);color:#d7e2f1}.stage b{text-transform:uppercase;font-size:11px;letter-spacing:.1em}.sizes{display:flex;align-items:center;justify-content:space-evenly;gap:10px;padding:12px 0}.sizes>div{text-align:center}.sizes img{display:block;margin:auto;max-width:100%;object-fit:contain;filter:drop-shadow(0 2px 2px #0003)}.sizes small{display:block;color:inherit;opacity:.7;font-size:11px;margin-top:12px}@media(max-width:1050px){.comparison{grid-template-columns:1fr}}@media(max-width:540px){.sizes{justify-content:flex-start;overflow-x:auto}.sizes>div{flex-shrink:0}main{padding:20px 10px}}</style></head><body><main><h1>Rebuilt, from the drawing up.</h1><p>14 drawings, one shared palette in both themes, crisp vector geometry. Compare at 40px, 104px and 256px.</p><p><a href="manifest.json">Design briefs and shared palette</a></p>${gallery}</main></body></html>\n`
await fs.writeFile(path.join(assetRoot, 'index.html'), html)

if(process.argv.includes('--preview')) {
    const {default: sharp} = await import('sharp')
    const previewRoot = path.join(root, 'docs/tmp/software-stickers-v5')
    await fs.mkdir(previewRoot, {recursive: true})
    for(let project = 1; project <= 7; project++) {
        const pair = entries.filter(entry => entry.projectId === project)
        const layers = []
        for(let row = 0; row < 2; row++) {
            for(let col = 0; col < 2; col++) {
                const theme = col ? 'dark' : 'light'
                const x = col * 480
                const y = row * 304
                const panel = `<svg width="480" height="304"><rect width="480" height="304" fill="${col ? '#18243A' : '#FFF5F7'}"/><text x="18" y="25" fill="${col ? '#DAEAFA' : '#183048'}" font-family="sans-serif" font-size="13">${pair[row].title} · ${theme}</text></svg>`
                layers.push({input: Buffer.from(panel), left: x, top: y})
                for(const [index, size] of [40, 104, 256].entries()) {
                    const image = await sharp(path.join(output, 'dark', pair[row].filename)).resize(size, size).png().toBuffer()
                    layers.push({input: image, left: x + [18, 90, 214][index], top: y + 40 + Math.round((256 - size) / 2)})
                }
            }
        }
        await sharp({create: {width: 960, height: 608, channels: 4, background: '#18243A'}}).composite(layers).png().toFile(path.join(previewRoot, `project-${project}.png`))
    }
}
console.log(`Generated ${entries.length} shared stickers using the former dark palette in both themes.`)
