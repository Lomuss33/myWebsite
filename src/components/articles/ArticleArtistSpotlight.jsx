import "./ArticleArtistSpotlight.scss"
import React, {useEffect, useId, useRef, useState} from "react"
import Article from "./base/Article.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useUtils} from "../../hooks/utils.js"

let spotifyApiPromise

const platformIcons = {
    spotify: "fa-brands fa-spotify",
    "apple-music": "fa-brands fa-apple",
    youtube: "fa-brands fa-youtube",
    deezer: "fa-brands fa-deezer",
    "amazon-music": "fa-brands fa-amazon"
}

function loadSpotifyIframeApi() {
    if(typeof window === "undefined") return Promise.reject(new Error("Spotify is only available in the browser."))
    if(window.__portfolioSpotifyIframeApi) return Promise.resolve(window.__portfolioSpotifyIframeApi)
    if(spotifyApiPromise) return spotifyApiPromise

    spotifyApiPromise = new Promise((resolve, reject) => {
        const previousReady = window.onSpotifyIframeApiReady
        const ready = (api) => {
            window.__portfolioSpotifyIframeApi = api
            try {
                previousReady?.(api)
            } finally {
                resolve(api)
            }
        }
        window.onSpotifyIframeApiReady = ready

        let script = document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]')
        if(!script) {
            script = document.createElement("script")
            script.src = "https://open.spotify.com/embed/iframe-api/v1"
            script.async = true
            document.body.appendChild(script)
        }
        script.addEventListener("error", () => reject(new Error("Spotify player could not be loaded.")), {once: true})
    }).catch((error) => {
        spotifyApiPromise = null
        throw error
    })

    return spotifyApiPromise
}

function SpotifyTrackPlayer({trackUri, playerRef, setIsPlaying, pendingPlayRef}) {
    const mountRef = useRef(null)

    useEffect(() => {
        let mounted = true
        let controller

        if(!trackUri || !mountRef.current) return undefined

        loadSpotifyIframeApi().then((api) => {
            if(!mounted || !mountRef.current) return
            api.createController(mountRef.current, {
                ...(trackUri.startsWith("https://open.spotify.com/") ? {url: trackUri} : {uri: trackUri}),
                width: "100%",
                height: 152
            }, (embedController) => {
                if(!mounted) {
                    embedController.destroy?.()
                    return
                }
                controller = embedController
                playerRef.current = embedController
                embedController.addListener("playback_update", (event) => {
                    setIsPlaying(!event?.data?.isPaused)
                })
                embedController.addListener("playback_started", () => setIsPlaying(true))
                if(pendingPlayRef.current) {
                    pendingPlayRef.current = false
                    embedController.resume()
                }
            })
        }).catch(() => {})

        return () => {
            mounted = false
            playerRef.current = null
            controller?.destroy?.()
        }
    }, [trackUri, playerRef, setIsPlaying, pendingPlayRef])

    return <div ref={mountRef} className="artist-spotlight-player" role="group" aria-label="Spotify track player"/>
}

function AssetPlaceholder({kind, label, className = ""}) {
    return (
        <div className={`artist-spotlight-placeholder artist-spotlight-placeholder-${kind} ${className}`}
             role="img"
             aria-label={label}>
            <span aria-hidden="true">{kind === "portrait" ? "✳" : kind === "cover" ? "♫" : "✦"}</span>
            <small>{label}</small>
        </div>
    )
}

function formatTrackTime(seconds) {
    const wholeSeconds = Math.max(0, Math.floor(Number(seconds) || 0))
    return `${Math.floor(wholeSeconds / 60)}:${String(wholeSeconds % 60).padStart(2, "0")}`
}

function ArticleArtistSpotlight({dataWrapper}) {
    const language = useLanguage()
    const utils = useUtils()
    const data = dataWrapper.settings.artistSpotlight || {}
    const release = data.latestRelease || {}
    const text = (key, fallback) => language.getTranslation(data.labels || {}, key, fallback)
    const genreStatement = text("artistGenreStatement", data.artistGenreStatement || "")
    const releaseEyebrow = text("releaseEyebrow", "THE LATEST RELEASE")
    const trackUri = release.spotifyTrackUri || release.spotifyTrackUrl || ""
    const audioSrc = release.audioSrc || ""
    const startOffsetSeconds = Math.max(0, Number(release.startOffsetSeconds) || 0)
    const knownDuration = Math.max(0, Number(release.durationSeconds) || 0)
    const playerRef = useRef(null)
    const pendingPlayRef = useRef(false)
    const audioRef = useRef(null)
    const releaseDragRef = useRef(null)
    const spotlightShellRef = useRef(null)
    const avatarRef = useRef(null)
    const platformPreviewsRef = useRef([])
    const platformPreviewDelayRef = useRef(new Map())
    const localAudioPreparedRef = useRef(false)
    const playerId = useId()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(startOffsetSeconds)
    const [duration, setDuration] = useState(knownDuration)
    const [volume, setVolume] = useState(0.35)
    const [isSpotlightPageActive, setIsSpotlightPageActive] = useState(false)
    const [isSpotlightDeviceActive, setIsSpotlightDeviceActive] = useState(false)
    const [audioReady, setAudioReady] = useState(false)
    const [audioError, setAudioError] = useState(false)
    const hasProfile = Boolean(data.profileImage)
    const profileImage = utils.image.normalizeSource(data.profileImage)
    const hasBanner = Boolean(data.bannerImage)
    const hasLocalAudio = Boolean(audioSrc)
    const hasSpotifyTrack = Boolean(trackUri)
    const canPlay = (hasLocalAudio || hasSpotifyTrack) && !audioError
    const hasArtistLink = Boolean(data.spotifyArtistUrl)
    const artistLinks = Array.isArray(data.links) ? data.links.filter(link => link?.url && link?.label) : []
    const platformLinks = [
        ...(hasArtistLink ? [{label: "Spotify", url: data.spotifyArtistUrl, platform: "spotify", target: "artist"}] : []),
        ...artistLinks
    ]

    useEffect(() => {
        if(audioRef.current) audioRef.current.volume = volume
    }, [volume, audioSrc])

    const resetAvatarTilt = () => {
        const avatar = avatarRef.current
        if(!avatar) return
        avatar.style.setProperty("--avatar-tilt-x", "0deg")
        avatar.style.setProperty("--avatar-tilt-y", "0deg")
        avatar.style.setProperty("--avatar-light-x", "28%")
        avatar.style.setProperty("--avatar-light-y", "20%")
        avatar.style.setProperty("--avatar-image-x", "0px")
        avatar.style.setProperty("--avatar-image-y", "0px")
        avatar.style.setProperty("--avatar-ring-x", "0px")
        avatar.style.setProperty("--avatar-ring-y", "0px")
    }

    useEffect(() => {
        if(!isSpotlightPageActive) {
            resetAvatarTilt()
            return undefined
        }

        const handlePointerMove = (event) => {
            if(event.pointerType === "touch") return
            const avatar = avatarRef.current
            if(!avatar) return
            const bounds = avatar.getBoundingClientRect()
            if(!bounds.width || !bounds.height) return
            const viewportWidth = Math.max(1, window.innerWidth)
            const viewportHeight = Math.max(1, window.innerHeight)
            // Track the full-screen pointer so movement outside the portrait still
            // has a clear direction without pinning the effect at the portrait edge.
            const x = Math.max(-1, Math.min(1, (event.clientX / viewportWidth - 0.5) * 2))
            const y = Math.max(-1, Math.min(1, (event.clientY / viewportHeight - 0.5) * 2))
            const smoothResponse = (value) => Math.sign(value) * Math.pow(Math.abs(value), 1.25)
            const sizeScale = Math.max(0.68, Math.min(1.15, bounds.width / 136))
            const responseX = smoothResponse(x)
            const responseY = smoothResponse(y)
            const lightX = Math.max(0, Math.min(100, (x + 1) * 50))
            const lightY = Math.max(0, Math.min(100, (y + 1) * 50))
            avatar.style.setProperty("--avatar-tilt-x", `${responseX * 16 * sizeScale}deg`)
            avatar.style.setProperty("--avatar-tilt-y", `${-responseY * 11.5 * sizeScale}deg`)
            avatar.style.setProperty("--avatar-light-x", `${lightX}%`)
            avatar.style.setProperty("--avatar-light-y", `${lightY}%`)
            avatar.style.setProperty("--avatar-image-x", `${-responseX * 5 * sizeScale}px`)
            avatar.style.setProperty("--avatar-image-y", `${-responseY * 5 * sizeScale}px`)
            avatar.style.setProperty("--avatar-ring-x", `${responseX * 3 * sizeScale}px`)
            avatar.style.setProperty("--avatar-ring-y", `${responseY * 3 * sizeScale}px`)
        }

        window.addEventListener("pointermove", handlePointerMove, {passive: true})
        return () => window.removeEventListener("pointermove", handlePointerMove)
    }, [isSpotlightPageActive])

    useEffect(() => {
        const shell = spotlightShellRef.current
        if(!shell || typeof IntersectionObserver === "undefined") return undefined

        const mobileViewport = window.matchMedia("(max-width: 760px)")
        const section = shell.closest("section.section")
        let isIntersecting = false
        let intersectionRatio = 0
        const syncSpotlightVisibility = () => {
            const isCurrentSection = !section || section.classList.contains("section-shown")
            const isVisible = isCurrentSection && isIntersecting
            setIsSpotlightPageActive(isVisible)
            setIsSpotlightDeviceActive(isVisible && mobileViewport.matches && intersectionRatio >= 0.55)
        }

        const observer = new IntersectionObserver(([entry]) => {
            isIntersecting = entry.isIntersecting
            intersectionRatio = entry.intersectionRatio
            syncSpotlightVisibility()
        }, {threshold: [0, 0.01, 0.55, 0.8]})
        observer.observe(shell)
        const sectionObserver = section ? new MutationObserver(syncSpotlightVisibility) : null
        sectionObserver?.observe(section, {attributes: true, attributeFilter: ["class"]})
        mobileViewport.addEventListener("change", syncSpotlightVisibility)
        return () => {
            observer.disconnect()
            sectionObserver?.disconnect()
            mobileViewport.removeEventListener("change", syncSpotlightVisibility)
        }
    }, [])

    useEffect(() => {
        if(!isSpotlightDeviceActive || !avatarRef.current) {
            resetAvatarTilt()
            return undefined
        }
        if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined

        const handleDeviceTilt = (event) => {
            if(!Number.isFinite(event.gamma) || !Number.isFinite(event.beta)) return
            const horizontalTilt = Math.max(-15, Math.min(15, event.gamma * 0.45))
            const verticalTilt = Math.max(-11, Math.min(11, (45 - event.beta) * 0.28))
            avatarRef.current?.style.setProperty("--avatar-tilt-x", `${horizontalTilt}deg`)
            avatarRef.current?.style.setProperty("--avatar-tilt-y", `${verticalTilt}deg`)
        }
        window.addEventListener("deviceorientation", handleDeviceTilt, {passive: true})
        return () => window.removeEventListener("deviceorientation", handleDeviceTilt)
    }, [isSpotlightDeviceActive])

    const balancePlatformPreviewVolume = () => {
        const previews = platformPreviewsRef.current
        const totalGain = previews.reduce((sum, preview) => sum + preview.fadeGain, 0)
        const mixScale = totalGain > 1 ? 1 / totalGain : 1

        previews.forEach((preview) => {
            preview.audioTracks.forEach((audio) => {
                audio.volume = preview.trackVolume * preview.fadeGain * mixScale
            })
        })
    }

    const stopPlatformPreview = (previewToStop = null) => {
        if(!previewToStop) {
            platformPreviewDelayRef.current.forEach((timer) => window.clearTimeout(timer))
            platformPreviewDelayRef.current.clear()
        }
        const previewsToStop = previewToStop ? [previewToStop] : platformPreviewsRef.current
        previewsToStop.forEach((preview) => {
            if(preview.fadeInterval !== null) window.clearInterval(preview.fadeInterval)
            preview.audioTracks.forEach((audio) => {
                audio.pause()
                audio.removeAttribute("src")
                audio.load()
            })
        })
        platformPreviewsRef.current = platformPreviewsRef.current.filter((preview) => !previewsToStop.includes(preview))
        balancePlatformPreviewVolume()
    }

    const fadeOutPlatformPreview = (preview) => {
        if(preview.fadeInterval !== null) window.clearInterval(preview.fadeInterval)
        const initialGain = preview.fadeGain
        const fadeStartedAt = performance.now()
        preview.fadeInterval = window.setInterval(() => {
            if(!platformPreviewsRef.current.includes(preview)) return

            const fadeProgress = Math.min((performance.now() - fadeStartedAt) / 3000, 1)
            preview.fadeGain = initialGain * (1 - fadeProgress)
            balancePlatformPreviewVolume()
            if(fadeProgress >= 1) stopPlatformPreview(preview)
        }, 40)
    }

    const schedulePlatformPreviewStop = (event) => {
        const previewKey = event.currentTarget.dataset.previewKey
        const pendingTimer = platformPreviewDelayRef.current.get(previewKey)
        if(pendingTimer !== undefined) {
            window.clearTimeout(pendingTimer)
            platformPreviewDelayRef.current.delete(previewKey)
        }
        const preview = platformPreviewsRef.current.find((entry) => entry.key === previewKey)
        if(preview) fadeOutPlatformPreview(preview)
    }

    const playPlatformPreview = (target, platformIndices) => {
        const previewKey = platformIndices.join(":")
        const existingPreview = platformPreviewsRef.current.find((entry) => entry.key === previewKey)
        if(existingPreview) {
            if(existingPreview.fadeInterval !== null) window.clearInterval(existingPreview.fadeInterval)
            existingPreview.fadeInterval = null
            existingPreview.fadeGain = 1
            balancePlatformPreviewVolume()
            return
        }

        const activePreview = {
            key: previewKey,
            audioTracks: [],
            trackVolume: 0.035 / platformIndices.length,
            fadeGain: 1,
            fadeInterval: null
        }
        platformPreviewsRef.current.push(activePreview)
        balancePlatformPreviewVolume()

        platformIndices.forEach((platformIndex) => {
            const audio = new Audio(audioSrc)
            activePreview.audioTracks.push(audio)
            audio.preload = "auto"

            const beginPreview = () => {
                if(!platformPreviewsRef.current.includes(activePreview)) return
                const actualDuration = Number.isFinite(audio.duration) ? audio.duration : knownDuration
                if(actualDuration <= 0) return

                audio.currentTime = Math.min(actualDuration * ((platformIndex + 0.5) / 5), actualDuration - 0.25)
                audio.play().catch(() => stopPlatformPreview(activePreview))
            }

            audio.addEventListener("loadedmetadata", beginPreview, {once: true})
            audio.addEventListener("ended", () => stopPlatformPreview(activePreview), {once: true})
            audio.addEventListener("error", () => stopPlatformPreview(activePreview), {once: true})
            if(audio.readyState >= 1) beginPreview()
            else audio.load()
        })
        balancePlatformPreviewVolume()
    }

    const schedulePlatformPreviewStart = (event, platformIndices) => {
        if(event.pointerType !== "mouse" || !hasLocalAudio) return

        const target = event.currentTarget
        const previewKey = platformIndices.join(":")
        const pendingTimer = platformPreviewDelayRef.current.get(previewKey)
        if(pendingTimer !== undefined) window.clearTimeout(pendingTimer)

        const timer = window.setTimeout(() => {
            platformPreviewDelayRef.current.delete(previewKey)
            if(target.isConnected) playPlatformPreview(target, platformIndices)
        }, 1000)
        platformPreviewDelayRef.current.set(previewKey, timer)
    }

    useEffect(() => {
        return () => {
            stopPlatformPreview()
        }
    }, [audioSrc])

    const portrait = hasProfile ? (
        <img className="artist-spotlight-portrait"
             src={profileImage.resolvedSrc || data.profileImage}
             srcSet={profileImage.srcSet || undefined}
             sizes="(max-width: 560px) 28vw, 224px"
             loading="lazy" decoding="async"
             alt={data.profileImageAlt || data.artistName || text("artistPortrait", "Artist portrait")}/>
    ) : (
        <AssetPlaceholder kind="portrait" label={text("portraitPlaceholder", "Artist portrait")}/>
    )

    const prepareLocalAudio = (audio) => {
        const actualDuration = Number.isFinite(audio.duration) ? audio.duration : knownDuration
        setDuration(actualDuration)
        setAudioReady(true)
        if(localAudioPreparedRef.current) return
        const offset = Math.min(startOffsetSeconds, Math.max(0, actualDuration - 0.25))
        audio.currentTime = offset
        setCurrentTime(offset)
        localAudioPreparedRef.current = true
    }

    const seekLocalAudio = (event) => {
        const nextTime = Number(event.target.value)
        const audio = audioRef.current
        if(!audio || !Number.isFinite(nextTime)) return
        audio.currentTime = nextTime
        setCurrentTime(nextTime)
        localAudioPreparedRef.current = true
    }

    const startTrack = () => {
        if(!canPlay) return
        if(hasLocalAudio) {
            const audio = audioRef.current
            if(!audio) return
            if(audio.readyState >= 1 && !localAudioPreparedRef.current)
                prepareLocalAudio(audio)
            if(audio.paused) audio.play().catch(() => setAudioError(true))
            return
        }
        if(playerRef.current) {
            if(!isPlaying) playerRef.current.resume()
            return
        }
        pendingPlayRef.current = true
    }

    const playTrack = () => {
        if(!canPlay) return
        if(hasLocalAudio) {
            const audio = audioRef.current
            if(!audio) return
            if(audio.paused) startTrack()
            else audio.pause()
            return
        }
        if(playerRef.current) {
            if(isPlaying) playerRef.current.pause()
            else startTrack()
            return
        }
        pendingPlayRef.current = true
    }

    const beginReleaseScrub = (event) => {
        if(event.button !== 0 || !hasLocalAudio || !audioReady || audioError) return
        if(event.target.closest("button, a, input, .artist-spotlight-local-player")) return

        const audio = audioRef.current
        const bounds = event.currentTarget.getBoundingClientRect()
        if(!audio || !Number.isFinite(audio.duration) || audio.duration <= 0 || bounds.width <= 0) return

        startTrack()
        releaseDragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startTime: audio.currentTime,
            width: bounds.width,
            moved: false
        }
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    const moveReleaseScrub = (event) => {
        const drag = releaseDragRef.current
        const audio = audioRef.current
        if(!drag || drag.pointerId !== event.pointerId || !audio) return

        const deltaX = event.clientX - drag.startX
        if(!drag.moved && Math.abs(deltaX) < 4) return
        drag.moved = true
        event.currentTarget.classList.add("is-scrubbing")
        const nextTime = Math.max(0, Math.min(audio.duration, drag.startTime + (deltaX / drag.width) * audio.duration))
        audio.currentTime = nextTime
        localAudioPreparedRef.current = true
        setCurrentTime(nextTime)
    }

    const endReleaseScrub = (event) => {
        if(releaseDragRef.current?.pointerId !== event.pointerId) return
        releaseDragRef.current = null
        event.currentTarget.classList.remove("is-scrubbing")
    }

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 forceHideTitle
                 className="article-artist-spotlight">
            <div ref={spotlightShellRef}
                 className={`artist-spotlight-shell${isSpotlightPageActive ? " is-spotlight-pointer-active" : ""}${isSpotlightDeviceActive ? " is-spotlight-device-active" : ""}`}>
                <section className="artist-spotlight-hero" aria-label={text("artistSectionLabel", "Artist profile")}>
                    {hasBanner ? (
                        <img className="artist-spotlight-banner" src={data.bannerImage} alt={data.bannerAlt || ""}/>
                    ) : (
                        <AssetPlaceholder kind="banner" label={text("bannerPlaceholder", "Artist banner")}/>
                    )}
                    <div className="artist-spotlight-hero-shade" aria-hidden="true"/>
                    <div className="artist-spotlight-identity">
                        {hasArtistLink ? (
                            <a className="artist-spotlight-avatar-link" href={data.spotifyArtistUrl}
                               target="_blank" rel="noopener noreferrer"
                               data-preview-key="0:1:2:3:4"
                               ref={avatarRef}
                               onPointerLeave={(event) => {
                                   schedulePlatformPreviewStop(event)
                               }}
                               onPointerEnter={(event) => {
                                   if(event.pointerType === "mouse") playPlatformPreview(event.currentTarget, [0, 1, 2, 3, 4])
                               }}
                               aria-label={text("artistAvatarLink", `Open ${data.artistName || "artist"} on Spotify`)}>
                                {portrait}
                            </a>
                        ) : portrait}
                        <div className="artist-spotlight-identity-copy">
                            {genreStatement ? (
                                <p className="artist-spotlight-genre">
                                    {hasLocalAudio && (
                                        <label className="artist-spotlight-volume-control">
                                            <svg viewBox="0 0 20 20" aria-hidden="true">
                                                <path d="M3 8v4h3l4 3V5L6 8H3Z" fill="currentColor"/>
                                                {volume > 0 && <path d="M13 7a4 4 0 0 1 0 6m2-8a7 7 0 0 1 0 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>}
                                            </svg>
                                            <input type="range" min="0" max="1" step="0.01" value={volume}
                                                   onChange={(event) => setVolume(Number(event.target.value))}
                                                   aria-label={text("volume", "Playback volume")}
                                                   title={text("volume", "Playback volume")}
                                                   style={{"--artist-volume": `${volume * 100}%`}}/>
                                        </label>
                                    )}
                                    <span className="artist-spotlight-genre-label">{text("genreLabel", "Genre:")}</span>
                                    <span>{genreStatement}</span>
                                </p>
                            ) : (data.artistDescription || !data.artistName) && (
                                <p>{data.artistDescription || text("artistDescriptionPlaceholder", "A short introduction will appear here.")}</p>
                            )}
                        </div>
                    </div>
                    {platformLinks.length > 0 && (
                        <nav className="artist-spotlight-seam-cta" aria-label={text("moreLinks", "Artist platforms")}
                             style={{"--artist-platform-count": platformLinks.length}}>
                            {platformLinks.map((link, platformIndex) => {
                                const destination = link.target === "release" ? release.title : data.artistName
                                const description = `${link.label} — ${destination || text("artistNamePlaceholder", "Artist")}`
                                return (
                                    <a key={`${link.label}-${link.url}`}
                                       className="artist-spotlight-platform-link"
                                       data-platform={link.platform}
                                       data-preview-key={platformIndex}
                                       href={link.url} target="_blank" rel="noopener noreferrer"
                                       aria-label={description} title={description}
                                       onPointerEnter={(event) => schedulePlatformPreviewStart(event, [platformIndex])}
                                       onPointerLeave={schedulePlatformPreviewStop}>
                                        <i className={`artist-spotlight-platform-icon ${platformIcons[link.platform] || "fa-solid fa-music"}`}
                                           aria-hidden="true"/>
                                        <span className="artist-spotlight-platform-name">{link.shortLabel || link.label}</span>
                                        <svg className="artist-spotlight-platform-external" viewBox="0 0 16 16"
                                             aria-hidden="true" focusable="false">
                                            <path d="M4 12 12 4M5 4h7v7" fill="none" stroke="currentColor"
                                                  strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                )
                            })}
                        </nav>
                    )}
                </section>

                <section className="artist-spotlight-release" aria-labelledby={`${playerId}-release-title`}>
                    {!hasLocalAudio && (
                        <div className="artist-spotlight-release-heading">
                            <span className="artist-spotlight-eyebrow">{releaseEyebrow}</span>
                        </div>
                    )}
                    <div className="artist-spotlight-release-main"
                         onPointerDown={beginReleaseScrub}
                         onPointerMove={moveReleaseScrub}
                         onPointerUp={endReleaseScrub}
                         onPointerCancel={endReleaseScrub}
                         onClick={(event) => {
                             if(!event.target.closest("button, a")) startTrack()
                         }}>
                        <button className={`artist-spotlight-turntable${isPlaying ? " is-playing" : ""}`}
                                type="button" onClick={(event) => { event.stopPropagation(); playTrack() }} disabled={!canPlay}
                                aria-label={isPlaying ? text("pauseTrack", "Pause latest release") : text("playTrack", "Play latest release")}
                                aria-describedby={!canPlay && !hasLocalAudio ? `${playerId}-play-hint` : undefined}>
                            <span className="artist-spotlight-vinyl" aria-hidden="true">
                                <span className="artist-spotlight-record-label">
                                    {release.coverImage ? <img src={release.coverImage} alt=""/> : <span>♫</span>}
                                </span>
                            </span>
                            <span className="artist-spotlight-play" aria-hidden="true">
                                {isPlaying ? (
                                    <svg viewBox="0 0 16 16"><path d="M5.25 3.5v9M10.75 3.5v9"/></svg>
                                ) : (
                                    <svg viewBox="0 0 16 16"><path d="m5.5 3.75 6.5 4.25-6.5 4.25z"/></svg>
                                )}
                            </span>
                        </button>
                        <div className="artist-spotlight-release-copy">
                            <h3 id={`${playerId}-release-title`}>{release.title || text("trackTitlePlaceholder", "Newest song")}</h3>
                            <p>{release.artistCredit || data.artistName || text("trackArtistPlaceholder", "Artist name")}</p>
                            {release.releaseDate && (
                                <p className="artist-spotlight-release-meta">
                                    {release.releaseDate}
                                </p>
                            )}
                            {hasLocalAudio ? (
                                <div className="artist-spotlight-local-player" role="group"
                                     aria-label={text("audioPlayer", "Audio player")}>
                                    <audio ref={audioRef} src={audioSrc}
                                           preload="metadata"
                                           onLoadedMetadata={(event) => prepareLocalAudio(event.currentTarget)}
                                           onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                                           onPlay={() => setIsPlaying(true)}
                                           onPause={() => setIsPlaying(false)}
                                           onEnded={() => {
                                               setIsPlaying(false)
                                               audioRef.current.currentTime = startOffsetSeconds
                                               setCurrentTime(startOffsetSeconds)
                                           }}
                                           onError={() => setAudioError(true)}/>
                                    <input type="range" min="0" max={duration || 1} step="0.1"
                                           value={Math.min(currentTime, duration || 1)}
                                           onChange={seekLocalAudio}
                                           disabled={!audioReady || audioError}
                                           aria-label={text("seekTrack", "Seek song position")}
                                           style={{"--artist-progress": `${duration ? currentTime / duration * 100 : 0}%`}}/>
                                    <div className="artist-spotlight-time" aria-hidden="true">
                                        <span>{formatTrackTime(currentTime)}</span>
                                        <span className="artist-spotlight-eyebrow artist-spotlight-eyebrow-spread">
                                            {Array.from(releaseEyebrow).map((character, index) => (
                                                <span key={`${character}-${index}`} className={character === " " ? "is-space" : undefined}>
                                                    {character === " " ? "\u00a0" : character}
                                                </span>
                                            ))}
                                        </span>
                                        <span>{release.duration || formatTrackTime(Math.ceil(duration))}</span>
                                    </div>
                                    {audioError && <span className="artist-spotlight-audio-error">
                                        {text("audioUnavailable", "Audio could not be loaded")}
                                    </span>}
                                </div>
                            ) : hasSpotifyTrack ? (
                                <SpotifyTrackPlayer trackUri={trackUri} playerRef={playerRef}
                                                    setIsPlaying={setIsPlaying} pendingPlayRef={pendingPlayRef}/>
                            ) : (
                                <span id={`${playerId}-play-hint`} className="artist-spotlight-play-hint">
                                    {text("trackPlaceholderHint", "Add a Spotify track link to enable listening")}
                                </span>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </Article>
    )
}

export default ArticleArtistSpotlight
