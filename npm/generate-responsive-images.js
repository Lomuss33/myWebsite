import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const ROOT = process.cwd()
const PUBLIC_DIR = path.join(ROOT, "public")
const SOURCE_DIRECTORIES = [
    "images/contant",
    "images/private",
    "images/personal_art",
    "images/writing/books"
]
const OUTPUT_ROOT = "images/__responsive"
const GENERATED_MODULE_PATH = path.join(ROOT, "src", "data", "generated", "imageManifest.generated.js")
const WIDTHS = [160, 320, 480, 640, 960, 1280, 1600]
const VALID_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"])

const ensureDirectory = (dirPath) => {
    fs.mkdirSync(dirPath, {recursive: true})
}

const toPosix = (value) => value.replace(/\\/g, "/")

const walkFiles = (directoryPath) => {
    const entries = fs.readdirSync(directoryPath, {withFileTypes: true})
    const results = []

    for(const entry of entries) {
        const absolutePath = path.join(directoryPath, entry.name)
        if(entry.isDirectory()) {
            results.push(...walkFiles(absolutePath))
            continue
        }

        if(!VALID_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
            continue

        results.push(absolutePath)
    }

    return results
}

const buildVariantWidths = (originalWidth) => {
    const widths = WIDTHS.filter(width => width < originalWidth)
    widths.push(originalWidth)
    return Array.from(new Set(widths)).sort((a, b) => a - b)
}

const buildVariantOutputPath = (relativeSourcePath, width) => {
    const parsed = path.parse(relativeSourcePath)
    return path.join(PUBLIC_DIR, OUTPUT_ROOT, parsed.dir, `${parsed.name}-w${width}.webp`)
}

const buildVariantPublicPath = (absoluteVariantPath) => {
    const relativeToPublic = path.relative(PUBLIC_DIR, absoluteVariantPath)
    return `/${toPosix(relativeToPublic)}`
}

const processFile = async (absoluteSourcePath) => {
    const relativeToPublic = toPosix(path.relative(PUBLIC_DIR, absoluteSourcePath))
    const metadata = await sharp(absoluteSourcePath).metadata()
    const originalWidth = metadata.width || 0
    const originalHeight = metadata.height || 0

    if(!originalWidth || !originalHeight)
        return null

    const variantWidths = buildVariantWidths(originalWidth)
    const variants = []

    for(const width of variantWidths) {
        const absoluteOutputPath = buildVariantOutputPath(relativeToPublic, width)
        ensureDirectory(path.dirname(absoluteOutputPath))

        const variantHeight = Math.round((originalHeight / originalWidth) * width)
        await sharp(absoluteSourcePath)
            .resize({
                width,
                withoutEnlargement: true
            })
            .webp({
                quality: 82,
                effort: 5
            })
            .toFile(absoluteOutputPath)

        variants.push({
            src: buildVariantPublicPath(absoluteOutputPath),
            width,
            height: variantHeight
        })
    }

    if(!variants.length)
        return null

    const largestVariant = variants[variants.length - 1]

    return {
        key: `/${relativeToPublic}`,
        value: {
            src: largestVariant.src,
            srcSet: variants.map(variant => `${variant.src} ${variant.width}w`).join(", "),
            width: largestVariant.width,
            height: largestVariant.height
        }
    }
}

const main = async () => {
    const manifest = {}

    for(const relativeDirectory of SOURCE_DIRECTORIES) {
        const absoluteDirectory = path.join(PUBLIC_DIR, relativeDirectory)
        if(!fs.existsSync(absoluteDirectory))
            continue

        const files = walkFiles(absoluteDirectory)
        for(const file of files) {
            const processed = await processFile(file)
            if(!processed)
                continue

            manifest[processed.key] = processed.value
        }
    }

    ensureDirectory(path.dirname(GENERATED_MODULE_PATH))
    const moduleSource = `const imageManifest = ${JSON.stringify(manifest, null, 4)}\n\nexport default imageManifest\n`
    fs.writeFileSync(GENERATED_MODULE_PATH, moduleSource, "utf8")

    console.log(`Generated responsive manifest entries: ${Object.keys(manifest).length}`)
}

main().catch(error => {
    console.error(error)
    process.exit(1)
})
