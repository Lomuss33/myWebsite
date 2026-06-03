import fs from "node:fs"
import path from "node:path"

const ROOT_DIR = process.cwd()
const DATA_DIR = path.join(ROOT_DIR, "public", "data")
const EXTRA_FILES = [
    path.join(ROOT_DIR, "public", "resume.json"),
    path.join(ROOT_DIR, "src", "components", "articles", "ArticleWebArt.jsx"),
]

const URL_IGNORE_TOKENS = [
    "http://",
    "https://",
    "href",
    "src=",
    "?raw",
    "?view=",
    "?usp=",
    "?v=",
]

const WORD_INTERNAL_QUESTION_MARK_PATTERN = /\p{L}\?\p{L}/u
const MOJIBAKE_PATTERNS = [
    /[\u00C3\u00C4\u00C5](?=[\u0080-\uFFFF])/u,
    /\u00C2(?=[\u0080-\uFFFF])/u,
    /\u00E2\u20AC/u,
    /\u00F0\u0178/u,
    /\u00EF\u00B8/u,
]

const getDataFiles = (targetPath) => {
    const stat = fs.statSync(targetPath)
    if(stat.isFile())
        return [targetPath]

    return fs.readdirSync(targetPath, {withFileTypes: true})
        .flatMap(entry => {
            const entryPath = path.join(targetPath, entry.name)
            if(entry.isDirectory())
                return getDataFiles(entryPath)
            return entryPath.endsWith(".json") ? [entryPath] : []
        })
}

const getScopedFiles = () => {
    const files = [
        ...getDataFiles(DATA_DIR),
        ...EXTRA_FILES,
    ]

    return [...new Set(files)].sort((a, b) => a.localeCompare(b))
}

const isIgnoredQuestionMarkLine = (line) => {
    return URL_IGNORE_TOKENS.some(token => line.includes(token))
}

const getIssuesForLine = (line) => {
    const issues = []

    if(MOJIBAKE_PATTERNS.some(pattern => pattern.test(line)))
        issues.push("mojibake")

    if(!isIgnoredQuestionMarkLine(line) && WORD_INTERNAL_QUESTION_MARK_PATTERN.test(line))
        issues.push("word-internal-question-mark")

    return issues
}

const getExcerpt = (line) => {
    const compact = line.trim().replace(/\s+/g, " ")
    if(compact.length <= 180)
        return compact
    return `${compact.slice(0, 177)}...`
}

const main = () => {
    const files = getScopedFiles()
    const findings = []

    for(const filePath of files) {
        const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/)
        lines.forEach((line, index) => {
            const issues = getIssuesForLine(line)
            if(issues.length === 0)
                return

            findings.push({
                filePath,
                lineNumber: index + 1,
                issues,
                excerpt: getExcerpt(line),
            })
        })
    }

    if(findings.length === 0) {
        console.log("i18n text validation passed")
        return
    }

    for(const finding of findings) {
        const relativePath = path.relative(ROOT_DIR, finding.filePath).replaceAll("\\", "/")
        console.error(`${relativePath}:${finding.lineNumber} [${finding.issues.join(", ")}]`)
        console.error(`  ${finding.excerpt}`)
    }

    process.exitCode = 1
}

main()
