import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"

const root = fileURLToPath(new URL("../", import.meta.url))
const historicalDirectories = new Set(["archive", "evidence", "tmp", "work"])
const collect = directory => fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const target = path.join(directory, entry.name)
    if(entry.isDirectory())
        return historicalDirectories.has(entry.name)
            ? [path.join(target, "README.md")].filter(file => fs.existsSync(file))
            : collect(target)
    return entry.name.endsWith(".md") ? [target] : []
})
const requested = process.argv.slice(2)
const files = [...new Set(requested.length
    ? requested.map(file => path.resolve(root, file))
    : ["AGENTS.md", "README.md", "MAINTANER.md", "USER_GUIDE.md"].map(file => path.join(root, file)).concat(collect(path.join(root, "docs"))))]
const issues = []
let checkedLinks = 0

for(const file of files) {
    const name = path.relative(root, file).replaceAll(path.sep, "/")
    if(!fs.existsSync(file)) {
        issues.push(`${name}: document does not exist`)
        continue
    }
    let fence = null
    // Keep line positions, but exclude code examples from the link scan.
    const source = fs.readFileSync(file, "utf8").split(/\r?\n/).map(line => {
        const marker = line.match(/^\s{0,3}(`{3,}|~{3,})/)
        if(marker) {
            if(!fence) fence = marker[1][0]
            else if(fence === marker[1][0]) fence = null
            return ""
        }
        return fence ? "" : line.replace(/(`+).*?\1/g, "")
    }).join("\n")
    const links = /!?\[[^\]\n]*\]\(\s*(?:<([^>\n]+)>|([^\s)]+))(?:\s+["'][^\n]*?["'])?\s*\)|^\s*\[[^\]\n]+\]:\s*(?:<([^>\n]+)>|(\S+))/gm
    for(const match of source.matchAll(links)) {
        const href = match[1] || match[2] || match[3] || match[4]
        if(/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) continue
        const local = href.split(/[?#]/)[0]
        if(!local) continue
        checkedLinks++
        const line = source.slice(0, match.index).split("\n").length
        let decoded
        try { decoded = decodeURIComponent(local).replace(/\\([()])/g, "$1") }
        catch { issues.push(`${name}:${line}: invalid URL encoding: ${href}`); continue }
        const target = path.resolve(decoded.startsWith("/") ? root : path.dirname(file), decoded.replace(/^\//, ""))
        if(!fs.existsSync(target)) issues.push(`${name}:${line}: missing local target: ${href}`)
    }
}

if(issues.length) {
    for(const issue of issues) console.error(issue)
    process.exitCode = 1
} else {
    console.log(`Documentation paths OK: ${files.length} documents, ${checkedLinks} local links. Anchors, prose and historical records are not certified.`)
}
