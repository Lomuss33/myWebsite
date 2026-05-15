import fs from "node:fs"
import path from "node:path"

const ROOT_DIR = process.cwd()
const CANONICAL_CV_PATH = "public/data/cv-machine.json"
const PROFILE_PATH = "public/data/profile.json"
const GENERATED_HEAD_PATH = "public/generated/machine-cv-head.html"
const GENERATED_BODY_PATH = "public/generated/machine-cv-body.html"
const CV_PAGE_PATH = "public/cv/index.html"
const RESUME_JSON_PATH = "public/resume.json"

const readJson = (relativePath) => {
    const absolutePath = path.join(ROOT_DIR, relativePath)
    return JSON.parse(fs.readFileSync(absolutePath, "utf8"))
}

const writeFile = (relativePath, content) => {
    const absolutePath = path.join(ROOT_DIR, relativePath)
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true })
    fs.writeFileSync(absolutePath, `${content.trim()}\n`, "utf8")
}

const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;")

const toAbsoluteUrl = (baseUrl, maybeRelativePath) => {
    if(!maybeRelativePath)
        return ""

    if(/^https?:\/\//.test(maybeRelativePath))
        return maybeRelativePath

    const normalizedPath = maybeRelativePath.startsWith("/") ? maybeRelativePath : `/${maybeRelativePath}`
    return new URL(normalizedPath, baseUrl).toString()
}

const formatYearMonth = (value, locale = "en-US") => {
    if(!value)
        return ""

    const [year, month] = String(value).split("-").map(Number)

    if(!year || !month)
        return String(value)

    return new Intl.DateTimeFormat(locale, {
        month: "short",
        year: "numeric"
    }).format(new Date(Date.UTC(year, month - 1, 1)))
}

const formatDateRange = (startDate, endDate, locale = "en-US") => {
    const formattedStart = formatYearMonth(startDate, locale)
    const formattedEnd = endDate ? formatYearMonth(endDate, locale) : (locale === "de-DE" ? "Heute" : "Present")

    if(!formattedStart)
        return formattedEnd

    return `${formattedStart} - ${formattedEnd}`
}

const normalizeWhitespace = (value) => String(value ?? "").replace(/\s+/g, " ").trim()

const truncateSummary = (value, maxLength = 240) => {
    const normalizedValue = normalizeWhitespace(value)

    if(normalizedValue.length <= maxLength)
        return normalizedValue

    const truncatedValue = normalizedValue.slice(0, maxLength)
    const lastSpaceIndex = truncatedValue.lastIndexOf(" ")
    const safeValue = lastSpaceIndex > 120 ? truncatedValue.slice(0, lastSpaceIndex) : truncatedValue
    return `${safeValue.trim()}…`
}

const dateObjectToYearMonth = (value) => {
    if(!value || value.now)
        return null

    const year = Number(value.year)
    const month = Number(value.month)

    if(!year || !month)
        return null

    return `${year}-${String(month).padStart(2, "0")}`
}

const isUsableUrl = (value) => {
    if(!value || typeof value !== "string")
        return false

    return /^https?:\/\//.test(value) && !value.includes("REPLACE_WITH")
}

const getPrimaryProjectUrl = (links) => {
    const websiteLink = links.find(link => isUsableUrl(link.href) && !link.href.includes("github.com"))
    return websiteLink?.href || ""
}

const getGithubProjectUrl = (links) => {
    return links.find(link => isUsableUrl(link.href) && link.href.includes("github.com"))?.href || ""
}

const normalizeProjectTags = (item) => {
    const tags = item.locales?.en?.tags || []
    const medium = item.locales?.en?.medium

    if(tags.length > 0)
        return tags

    return medium ? [medium] : []
}

const extractProjects = (canonicalCv) => {
    return canonicalCv.projectSources.flatMap(source => {
        const sectionData = readJson(source.path)
        const matchingArticle = (sectionData.articles || []).find(article =>
            article.component === source.component && article.id === source.articleId
        )

        if(!matchingArticle)
            return []

        return (matchingArticle.items || []).map(item => {
            const localeEn = item.locales?.en || {}
            const localeDe = item.locales?.de || {}
            const links = item.preview?.links || []

            return {
                id: `${source.type}-${item.id}`,
                type: source.type,
                title: localeEn.title || "",
                titleDe: localeDe.title || "",
                summary: truncateSummary(localeEn.text || ""),
                summaryDe: truncateSummary(localeDe.text || ""),
                startDate: dateObjectToYearMonth(item.dateStart),
                endDate: dateObjectToYearMonth(item.dateEnd),
                date: dateObjectToYearMonth(item.date),
                tags: normalizeProjectTags(item),
                url: getPrimaryProjectUrl(links),
                githubUrl: getGithubProjectUrl(links),
                sourcePath: source.path
            }
        })
    })
}

const flattenSkills = (skillGroups) => {
    return [...new Set(skillGroups.flatMap(skillGroup => skillGroup.items))]
}

const isAlumniEligibleEducation = (entry) => {
    if(entry.ongoing)
        return false

    const combinedTitle = `${entry.title || ""} ${entry.titleDe || ""}`.toLowerCase()
    return !combinedTitle.includes("exchange")
}

const buildAlumniOf = (educationEntries) => {
    return educationEntries
        .filter(isAlumniEligibleEducation)
        .map(entry => ({
            "@type": "EducationalOrganization",
            "name": entry.institution,
            "address": entry.location
        }))
}

const buildProfilePageJsonLd = ({
    canonicalCv,
    pageUrl,
    pageTitle
}) => {
    const personId = `${canonicalCv.url}#person`

    return {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "url": pageUrl,
        "name": pageTitle,
        "about": {
            "@id": personId
        },
        "mainEntity": {
            "@id": personId,
            "@type": "Person",
            "name": canonicalCv.name,
            "url": canonicalCv.url
        }
    }
}

const buildHomeJsonLd = ({ canonicalCv, imageUrl }) => {
    const websiteId = `${canonicalCv.url}#website`
    const personId = `${canonicalCv.url}#person`

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": websiteId,
                "url": canonicalCv.url,
                "name": canonicalCv.name,
                "alternateName": canonicalCv.alternateName,
                "description": canonicalCv.description,
                "mainEntity": {
                    "@id": personId
                }
            },
            {
                "@type": "Person",
                "@id": personId,
                "name": canonicalCv.name,
                "alternateName": canonicalCv.alternateName,
                "url": canonicalCv.url,
                "mainEntityOfPage": canonicalCv.url,
                "sameAs": canonicalCv.sameAs,
                "image": imageUrl,
                "jobTitle": canonicalCv.jobTitle,
                "description": canonicalCv.description,
                "email": canonicalCv.contact.email,
                "telephone": canonicalCv.contact.telephone,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": canonicalCv.contact.streetAddress,
                    "postalCode": canonicalCv.contact.postalCode,
                    "addressLocality": canonicalCv.contact.addressLocality,
                    "addressCountry": canonicalCv.contact.addressCountry
                },
                "knowsAbout": flattenSkills(canonicalCv.skills),
                "alumniOf": buildAlumniOf(canonicalCv.education),
                "affiliation": [
                    {
                        "@type": "CollegeOrUniversity",
                        "name": "Technische Hochschule Mittelhessen (THM)",
                        "address": "Gießen, Germany"
                    }
                ],
                "hasOccupation": {
                    "@type": "Occupation",
                    "name": "Automation and IT Professional",
                    "description": "Hands-on background across industrial automation, IT support, hardware production, technical writing, and infrastructure projects."
                }
            }
        ]
    }
}

const renderContactArticle = (canonicalCv) => {
    const contact = canonicalCv.contact

    return `
        <article class="machine-cv__article">
            <h2>Contact</h2>
            <address>
                <p><a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a></p>
                <p><a href="tel:${escapeHtml(contact.telephone.replace(/\s+/g, ""))}">${escapeHtml(contact.telephone)}</a></p>
                <p>${escapeHtml(contact.streetAddress)}, ${escapeHtml(contact.postalCode)} ${escapeHtml(contact.addressLocality)}, ${escapeHtml(contact.addressCountry)}</p>
                <p><a href="${escapeHtml(contact.linkedin)}" rel="noopener noreferrer">LinkedIn</a></p>
                <p><a href="${escapeHtml(contact.github)}" rel="noopener noreferrer">GitHub</a></p>
                <p><a href="${escapeHtml(canonicalCv.url)}" rel="noopener noreferrer">${escapeHtml(canonicalCv.url)}</a></p>
                <p><a href="${escapeHtml(canonicalCv.cvUrl)}" rel="noopener noreferrer">CV Page</a> | <a href="/resume.json" rel="noopener noreferrer">resume.json</a></p>
            </address>
        </article>
    `
}

const renderSummaryArticle = (canonicalCv) => {
    return `
        <article class="machine-cv__article">
            <h2>Summary</h2>
            <p>${escapeHtml(canonicalCv.description)}</p>
        </article>
    `
}

const renderTimelineItem = (entry) => {
    const englishDateRange = formatDateRange(entry.startDate, entry.endDate, "en-US")

    return `
        <li>
            <h3>${escapeHtml(entry.title)}</h3>
            <p><strong>${escapeHtml(entry.institution)}</strong> · ${escapeHtml(entry.location)}</p>
            <p><time datetime="${escapeHtml(entry.startDate)}">${escapeHtml(englishDateRange)}</time></p>
            <p>${escapeHtml(entry.summary)}</p>
            <ul>
                ${entry.bullets.map(bullet => `<li>${escapeHtml(bullet)}</li>`).join("")}
            </ul>
        </li>
    `
}

const renderTimelineArticle = (title, entries) => {
    return `
        <article class="machine-cv__article">
            <h2>${escapeHtml(title)}</h2>
            <ul>
                ${entries.map(renderTimelineItem).join("")}
            </ul>
        </article>
    `
}

const groupProjectsByType = (projects) => {
    const projectGroups = {
        software: {
            title: "Software Projects",
            titleDe: "Softwareprojekte",
            items: []
        },
        hardware: {
            title: "Hardware Projects",
            titleDe: "Hardwareprojekte",
            items: []
        },
        publication: {
            title: "Technical Writings & Presentations",
            titleDe: "Technische Texte & Präsentationen",
            items: []
        }
    }

    for(const project of projects) {
        projectGroups[project.type]?.items.push(project)
    }

    return Object.values(projectGroups).filter(group => group.items.length > 0)
}

const renderProjectLinkLine = (project) => {
    const links = []

    if(project.url)
        links.push(`<a href="${escapeHtml(project.url)}" rel="noopener noreferrer">Project Link</a>`)

    if(project.githubUrl)
        links.push(`<a href="${escapeHtml(project.githubUrl)}" rel="noopener noreferrer">GitHub</a>`)

    return links.length > 0 ? `<p>${links.join(" | ")}</p>` : ""
}

const renderProjectsArticle = (projects) => {
    const projectGroups = groupProjectsByType(projects)

    return `
        <article class="machine-cv__article">
            <h2>Projects</h2>
            ${projectGroups.map(group => `
                <section class="machine-cv__subsection">
                    <h3>${escapeHtml(group.title)}</h3>
                    <ul>
                        ${group.items.map(project => `
                            <li>
                                <strong>${escapeHtml(project.title)}</strong>
                                ${project.date ? `<p><time datetime="${escapeHtml(project.date)}">${escapeHtml(formatYearMonth(project.date, "en-US"))}</time></p>` : ""}
                                ${project.startDate ? `<p><time datetime="${escapeHtml(project.startDate)}">${escapeHtml(formatDateRange(project.startDate, project.endDate, "en-US"))}</time></p>` : ""}
                                <p>${escapeHtml(project.summary)}</p>
                                ${project.tags.length > 0 ? `<p>${escapeHtml(project.tags.join(", "))}</p>` : ""}
                                ${renderProjectLinkLine(project)}
                            </li>
                        `).join("")}
                    </ul>
                </section>
            `).join("")}
        </article>
    `
}

const renderSkillsArticle = (canonicalCv) => {
    return `
        <article class="machine-cv__article">
            <h2>Skills</h2>
            ${canonicalCv.skills.map(skillGroup => `
                <section class="machine-cv__subsection">
                    <h3>${escapeHtml(skillGroup.category)}</h3>
                    <ul>
                        ${skillGroup.items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
                    </ul>
                </section>
            `).join("")}
            <section class="machine-cv__subsection">
                <h3>Languages</h3>
                <ul>
                    ${canonicalCv.languages.map(language => `
                        <li>${escapeHtml(language.language)} — ${escapeHtml(language.level)}</li>
                    `).join("")}
                </ul>
            </section>
            <section class="machine-cv__subsection">
                <h3>Certifications</h3>
                <ul>
                    ${canonicalCv.certifications.map(certification => `
                        <li>
                            <strong>${escapeHtml(certification.name)}</strong> — ${escapeHtml(certification.statusLabel)}
                            <time datetime="${escapeHtml(certification.targetDate)}"> (${escapeHtml(formatYearMonth(certification.targetDate, "en-US"))})</time>
                            ${certification.url ? `<p><a href="${escapeHtml(certification.url)}" rel="noopener noreferrer">${escapeHtml(certification.issuer)}</a></p>` : `<p>${escapeHtml(certification.issuer)}</p>`}
                        </li>
                    `).join("")}
                </ul>
            </section>
            <section class="machine-cv__subsection">
                <h3>Additional Information</h3>
                <ul>
                    <li>Interests: ${escapeHtml(canonicalCv.interests.join(", "))}</li>
                    <li>Driver license: ${escapeHtml(canonicalCv.driverLicense)}</li>
                </ul>
            </section>
        </article>
    `
}

const buildCvSectionMarkup = ({ canonicalCv, projects, hidden, headingTag = "h1", includeContact = false }) => {
    const hiddenClassName = hidden ? " machine-cv-sr-only" : ""
    const ariaLabel = hidden
        ? `Machine-readable curriculum vitae for ${canonicalCv.name}`
        : `Curriculum vitae of ${canonicalCv.name}`
    const normalizedHeadingTag = headingTag === "p" ? "p" : "h1"

    return `
        <section class="machine-cv${hiddenClassName}" aria-label="${escapeHtml(ariaLabel)}" lang="en">
            <${normalizedHeadingTag}>${escapeHtml(canonicalCv.name)}</${normalizedHeadingTag}>
            <p>${escapeHtml(canonicalCv.jobTitle)}</p>
            ${includeContact ? renderContactArticle(canonicalCv) : ""}
            ${renderSummaryArticle(canonicalCv)}
            ${renderTimelineArticle("Education", canonicalCv.education)}
            ${renderTimelineArticle("Experience", canonicalCv.experience)}
            ${renderProjectsArticle(projects)}
            ${renderSkillsArticle(canonicalCv)}
        </section>
    `
}

const buildHomeHeadHtml = ({ canonicalCv, imageUrl }) => {
    const pageTitle = "Lovro Musić | Official Portfolio & Personal Website"
    const metaDescription = "Official personal website of Lovro Musić, with portfolio projects, technical work, contact links, and supporting CV resources."
    const homeJsonLd = buildHomeJsonLd({ canonicalCv, imageUrl })

    return `
        <title>${escapeHtml(pageTitle)}</title>
        <meta name="author" content="${escapeHtml(canonicalCv.name)}" />
        <meta name="description" content="${escapeHtml(metaDescription)}" />
        <meta name="keywords" content="Lovro Musić, Lovro Music, engineering computer science, industrial automation, IT support, embedded systems, hardware, portfolio, CV, resume" />
        <link rel="canonical" href="${escapeHtml(canonicalCv.url)}" />
        <link rel="alternate" type="application/json" href="/resume.json" title="${escapeHtml(canonicalCv.name)} Resume JSON" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="${escapeHtml(canonicalCv.name)}" />
        <meta property="og:url" content="${escapeHtml(canonicalCv.url)}" />
        <meta property="og:title" content="${escapeHtml(pageTitle)}" />
        <meta property="og:description" content="${escapeHtml(metaDescription)}" />
        <meta property="og:image" content="${escapeHtml(imageUrl)}" />
        <meta property="og:image:alt" content="Profile portrait of ${escapeHtml(canonicalCv.name)}" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="${escapeHtml(canonicalCv.url)}" />
        <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
        <meta name="twitter:description" content="${escapeHtml(metaDescription)}" />
        <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
        <meta name="twitter:image:alt" content="Profile portrait of ${escapeHtml(canonicalCv.name)}" />

        <style>
            .machine-cv-sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                clip-path: inset(50%);
                white-space: nowrap;
                border: 0;
            }

            .machine-cv {
                color: inherit;
            }
        </style>

        <script type="application/ld+json">
${JSON.stringify(homeJsonLd, null, 4)}
        </script>
    `
}

const buildCvPageHtml = ({ canonicalCv, projects, imageUrl }) => {
    const pageTitle = "Lovro Musić English CV | Experience & Projects"
    const metaDescription = "CV and resume page for Lovro Musić, provided as a supporting document for education, experience, technical skills, projects, and structured resume data."
    const profilePageJsonLd = buildProfilePageJsonLd({
        canonicalCv,
        pageUrl: canonicalCv.cvUrl,
        pageTitle
    })

    return `
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content="${escapeHtml(metaDescription)}" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="${escapeHtml(canonicalCv.name)}" />
        <title>${escapeHtml(pageTitle)}</title>
        <link rel="canonical" href="${escapeHtml(canonicalCv.cvUrl)}" />
        <link rel="author" href="${escapeHtml(canonicalCv.url)}" />
        <link rel="alternate" type="application/json" href="/resume.json" title="${escapeHtml(canonicalCv.name)} Resume JSON" />

        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="${escapeHtml(canonicalCv.name)}" />
        <meta property="og:url" content="${escapeHtml(canonicalCv.cvUrl)}" />
        <meta property="og:title" content="${escapeHtml(pageTitle)}" />
        <meta property="og:description" content="${escapeHtml(metaDescription)}" />
        <meta property="og:image" content="${escapeHtml(imageUrl)}" />
        <meta property="og:image:alt" content="Profile portrait of ${escapeHtml(canonicalCv.name)}" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="${escapeHtml(canonicalCv.cvUrl)}" />
        <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
        <meta name="twitter:description" content="${escapeHtml(metaDescription)}" />
        <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
        <meta name="twitter:image:alt" content="Profile portrait of ${escapeHtml(canonicalCv.name)}" />

        <style>
            :root {
                color-scheme: light;
            }

            body {
                margin: 0;
                font-family: "Segoe UI", Arial, sans-serif;
                line-height: 1.55;
                color: #111827;
                background: #f8fafc;
            }

            .machine-cv-page {
                max-width: 960px;
                margin: 0 auto;
                padding: 2rem 1.25rem 3rem;
            }

            .machine-cv-page__links {
                margin-bottom: 1.5rem;
                font-size: 0.95rem;
            }

            .machine-cv-page__links a {
                color: #0f4c81;
            }

            .machine-cv {
                background: #ffffff;
                border: 1px solid #dbe3ee;
                border-radius: 12px;
                padding: 2rem;
                box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
            }

            .machine-cv h1,
            .machine-cv h2,
            .machine-cv h3 {
                color: #0f172a;
            }

            .machine-cv h1 {
                margin-top: 0;
            }

            .machine-cv__article + .machine-cv__article {
                margin-top: 2rem;
            }

            .machine-cv__subsection + .machine-cv__subsection {
                margin-top: 1.25rem;
            }

            .machine-cv ul {
                padding-left: 1.25rem;
            }

            .machine-cv a {
                color: #0f4c81;
            }

            @media (max-width: 640px) {
                .machine-cv {
                    padding: 1.25rem;
                }
            }
        </style>

        <script type="application/ld+json">
${JSON.stringify(profilePageJsonLd, null, 4)}
        </script>
    </head>
    <body>
        <main class="machine-cv-page">
            <p class="machine-cv-page__links">
                <a href="/">Portfolio</a> |
                <a href="/resume.json">resume.json</a> |
                <a href="${escapeHtml(canonicalCv.contact.github)}" rel="noopener noreferrer">GitHub</a> |
                <a href="${escapeHtml(canonicalCv.contact.linkedin)}" rel="noopener noreferrer">LinkedIn</a>
            </p>
            ${buildCvSectionMarkup({ canonicalCv, projects, hidden: false, headingTag: "h1" })}
        </main>
    </body>
</html>
    `
}

const buildResumeJson = ({ canonicalCv, projects }) => {
    return {
        name: canonicalCv.name,
        alternate_name: canonicalCv.alternateName,
        job_title: canonicalCv.jobTitle,
        job_title_de: canonicalCv.jobTitleDe,
        summary: canonicalCv.description,
        summary_de: canonicalCv.descriptionDe,
        website: canonicalCv.url,
        cv_url: canonicalCv.cvUrl,
        pdf_url: resumePdfUrl,
        same_as: canonicalCv.sameAs,
        contact: {
            email: canonicalCv.contact.email,
            telephone: canonicalCv.contact.telephone,
            street_address: canonicalCv.contact.streetAddress,
            postal_code: canonicalCv.contact.postalCode,
            address_locality: canonicalCv.contact.addressLocality,
            address_country: canonicalCv.contact.addressCountry,
            linkedin: canonicalCv.contact.linkedin,
            github: canonicalCv.contact.github,
            website: canonicalCv.contact.website
        },
        education: canonicalCv.education.map(entry => ({
            id: entry.id,
            title: entry.title,
            title_de: entry.titleDe,
            institution: entry.institution,
            location: entry.location,
            start_date: entry.startDate,
            end_date: entry.endDate,
            ongoing: entry.ongoing,
            summary: entry.summary,
            summary_de: entry.summaryDe,
            bullets: entry.bullets,
            bullets_de: entry.bulletsDe
        })),
        experience: canonicalCv.experience.map(entry => ({
            id: entry.id,
            title: entry.title,
            title_de: entry.titleDe,
            institution: entry.institution,
            location: entry.location,
            start_date: entry.startDate,
            end_date: entry.endDate,
            ongoing: entry.ongoing,
            summary: entry.summary,
            summary_de: entry.summaryDe,
            bullets: entry.bullets,
            bullets_de: entry.bulletsDe
        })),
        projects: projects.map(project => ({
            id: project.id,
            type: project.type,
            title: project.title,
            title_de: project.titleDe,
            summary: project.summary,
            summary_de: project.summaryDe,
            start_date: project.startDate,
            end_date: project.endDate,
            date: project.date,
            tags: project.tags,
            url: project.url,
            github_url: project.githubUrl,
            source_path: project.sourcePath
        })),
        skills: canonicalCv.skills.map(skillGroup => ({
            category: skillGroup.category,
            category_de: skillGroup.categoryDe,
            items: skillGroup.items
        })),
        languages: canonicalCv.languages.map(language => ({
            language: language.language,
            language_de: language.languageDe,
            level: language.level
        })),
        certifications: canonicalCv.certifications.map(certification => ({
            name: certification.name,
            status: certification.status,
            status_label: certification.statusLabel,
            target_date: certification.targetDate,
            issuer: certification.issuer,
            url: certification.url
        })),
        interests: canonicalCv.interests,
        driver_license: canonicalCv.driverLicense
    }
}

const canonicalCv = readJson(CANONICAL_CV_PATH)
const profileData = readJson(PROFILE_PATH)
const imageUrl = toAbsoluteUrl(canonicalCv.url, profileData.profilePictureUrl || "/images/contant/profilePix.webp")
const resumePdfUrl = toAbsoluteUrl(canonicalCv.url, profileData.resumePdfUrl || "/resume.pdf")
const projects = extractProjects(canonicalCv)

writeFile(GENERATED_HEAD_PATH, buildHomeHeadHtml({ canonicalCv, imageUrl }))
writeFile(GENERATED_BODY_PATH, buildCvSectionMarkup({ canonicalCv, projects, hidden: true, headingTag: "p" }))
writeFile(CV_PAGE_PATH, buildCvPageHtml({ canonicalCv, projects, imageUrl }))
writeFile(RESUME_JSON_PATH, JSON.stringify(buildResumeJson({ canonicalCv, projects }), null, 4))
