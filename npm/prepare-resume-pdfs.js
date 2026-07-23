import fs from "node:fs"
import path from "node:path"
import {
    DEFAULT_RESUME_PDF_LANGUAGE_ID,
    getResumePdfPath,
    LEGACY_RESUME_PDF_PATH,
    RESUME_PDF_LANGUAGE_IDS
} from "../src/config/resumePdfConfig.js"

const ROOT_DIR = process.cwd()
const COPY_RETRY_DELAY_MS = 150
const COPY_RETRY_COUNT = 5

const toWorkspacePath = (webPath) => {
    const relativePublicPath = webPath.replace(/^\//, "").replaceAll("/", path.sep)
    return path.join(ROOT_DIR, "public", relativePublicPath)
}

const verifyFileExists = (webPath) => {
    const absolutePath = toWorkspacePath(webPath)
    if(!fs.existsSync(absolutePath)) {
        throw new Error(`Required resume PDF is missing: ${webPath}`)
    }
    return absolutePath
}

const sleep = (ms) => {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

const copyFileWithRetry = (sourcePath, targetPath) => {
    let lastError = null

    for(let attempt = 0; attempt < COPY_RETRY_COUNT; attempt += 1) {
        try {
            fs.copyFileSync(sourcePath, targetPath)
            return
        }
        catch (error) {
            lastError = error
            if(error?.code !== "EBUSY" && error?.code !== "EPERM")
                throw error

            sleep(COPY_RETRY_DELAY_MS)
        }
    }

    throw lastError
}

const prepareResumePdfs = () => {
    const resumePdfSourcePaths = RESUME_PDF_LANGUAGE_IDS.map(getResumePdfPath)
    resumePdfSourcePaths.forEach(verifyFileExists)

    const englishResumeSourcePath = verifyFileExists(getResumePdfPath(DEFAULT_RESUME_PDF_LANGUAGE_ID))
    const legacyResumePath = toWorkspacePath(LEGACY_RESUME_PDF_PATH)

    fs.mkdirSync(path.dirname(legacyResumePath), { recursive: true })
    copyFileWithRetry(englishResumeSourcePath, legacyResumePath)

    console.log(`Prepared resume PDFs (${resumePdfSourcePaths.join(", ")}) and refreshed ${LEGACY_RESUME_PDF_PATH}.`)
}

prepareResumePdfs()
