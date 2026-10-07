// Guide copy supports rows, known decorative icons and **emphasised actions**.
// Build text nodes rather than interpreting translations as HTML.
const icons = {
    left: "fa-arrow-left",
    down: "fa-arrow-down",
    up: "fa-arrow-up",
    settings: "fa-sliders",
    language: "fa-language",
    theme: "fa-circle-half-stroke",
    resume: "fa-file-arrow-down",
}

const renderedCopy = new WeakMap()
const tones = new Set(["navigation", "tools", "download"])

export function renderStartupGuideCaption(element, rows) {
    if(renderedCopy.get(element) === rows)
        return

    const fragment = document.createDocumentFragment()
    for(const {icon, text, tone = "navigation", accents = []} of rows) {
        const row = document.createElement("span")
        row.className = "startup-guide-caption-row"
        if(tones.has(tone))
            row.dataset.tone = tone
        if(icons[icon]) {
            const symbol = document.createElement("i")
            symbol.className = `startup-guide-caption-icon fa-solid ${icons[icon]}`
            symbol.setAttribute("aria-hidden", "true")
            row.append(symbol)
        }
        else {
            row.classList.add("startup-guide-caption-row-lead")
        }

        const copy = document.createElement("span")
        copy.className = "startup-guide-caption-copy"
        let actionIndex = 0
        for(const part of text.split(/(\*\*[^*]+\*\*)/g)) {
            if(part.startsWith("**") && part.endsWith("**")) {
                const action = document.createElement("strong")
                action.className = "startup-guide-caption-action"
                const accent = accents[actionIndex++]
                if(tones.has(accent))
                    action.dataset.tone = accent
                action.textContent = part.slice(2, -2)
                copy.append(action)
            }
            else {
                copy.append(document.createTextNode(part))
            }
        }
        row.append(copy)
        fragment.append(row)
    }
    element.replaceChildren(fragment)
    renderedCopy.set(element, rows)
}
