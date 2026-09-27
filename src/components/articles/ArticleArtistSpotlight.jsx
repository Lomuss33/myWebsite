import "./ArticleArtistSpotlight.scss"
import React, {useEffect, useId, useRef, useState} from "react"
import Article from "./base/Article.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"

let spotifyApiPromise

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
    const data = dataWrapper.settings.artistSpotlight || {}
    const release = data.latestRelease || {}
    const text = (key, fallback) => language.getTranslation(data.labels || {}, key, fallback)
    const trackUri = release.spotifyTrackUri || release.spotifyTrackUrl || ""
    const audioSrc = release.audioSrc || ""
    const startOffsetSeconds = Math.max(0, Number(release.startOffsetSeconds) || 0)
    const knownDuration = Math.max(0, Number(release.durationSeconds) || 0)
    const playerRef = useRef(null)
    const pendingPlayRef = useRef(false)
    const audioRef = useRef(null)
    const localAudioPreparedRef = useRef(false)
    const playerId = useId()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(startOffsetSeconds)
    const [duration, setDuration] = useState(knownDuration)
    const [audioReady, setAudioReady] = useState(false)
    const [audioError, setAudioError] = useState(false)
    const hasProfile = Boolean(data.profileImage)
    const hasBanner = Boolean(data.bannerImage)
    const hasLocalAudio = Boolean(audioSrc)
    const hasSpotifyTrack = Boolean(trackUri)
    const canPlay = (hasLocalAudio || hasSpotifyTrack) && !audioError
    const hasArtistLink = Boolean(data.spotifyArtistUrl)
    const showArtistCta = hasArtistLink || !data.artistName
    const artistLinks = Array.isArray(data.links) ? data.links.filter(link => link?.url && link?.label) : []
    const portrait = hasProfile ? (
        <img className="artist-spotlight-portrait" src={data.profileImage}
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

    const playTrack = () => {
        if(!canPlay) return
        if(hasLocalAudio) {
            const audio = audioRef.current
            if(!audio) return
            if(audio.paused) {
                if(audio.readyState >= 1 && !localAudioPreparedRef.current)
                    prepareLocalAudio(audio)
                audio.play().catch(() => setAudioError(true))
            } else {
                audio.pause()
            }
            return
        }
        if(playerRef.current) {
            if(isPlaying) playerRef.current.pause()
            else playerRef.current.resume()
            return
        }
        pendingPlayRef.current = true
    }

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className="article-artist-spotlight">
            <div className="artist-spotlight-shell">
                <section className="artist-spotlight-hero" aria-label={text("artistSectionLabel", "Artist profile")}>
                    {hasBanner ? (
                        <img className="artist-spotlight-banner" src={data.bannerImage} alt={data.bannerAlt || ""}/>
                    ) : (
                        <AssetPlaceholder kind="banner" label={text("bannerPlaceholder", "Artist banner")}/>
                    )}
                    <div className="artist-spotlight-hero-shade" aria-hidden="true"/>
                    <div className={`artist-spotlight-identity${showArtistCta ? " has-artist-cta" : ""}`}>
                        {hasArtistLink ? (
                            <a className="artist-spotlight-avatar-link" href={data.spotifyArtistUrl}
                               target="_blank" rel="noopener noreferrer"
                               aria-label={text("artistAvatarLink", `Open ${data.artistName || "artist"} on Spotify`)}>
                                {portrait}
                            </a>
                        ) : portrait}
                        {showArtistCta && (
                            <div className="artist-spotlight-cta-column">
                                {hasArtistLink ? (
                                    <a className="artist-spotlight-spotify-link" href={data.spotifyArtistUrl}
                                       target="_blank" rel="noopener noreferrer">
                                        <span>{text("artistButton", "Explore on Spotify")}</span>
                                        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                                            <path d="M4 12 12 4M5 4h7v7" fill="none" stroke="currentColor"
                                                  strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                ) : (
                                    <span className="artist-spotlight-spotify-link is-placeholder" aria-disabled="true">
                                        <span>{text("artistButton", "Explore on Spotify")}</span>
                                        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                                            <path d="M4 12 12 4M5 4h7v7" fill="none" stroke="currentColor"
                                                  strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                )}
                            </div>
                        )}
                        <div className="artist-spotlight-identity-copy">
                            <h2>{data.artistName || text("artistNamePlaceholder", "Artist name")}</h2>
                            {(data.artistDescription || !data.artistName) && (
                                <p>{data.artistDescription || text("artistDescriptionPlaceholder", "A short introduction will appear here.")}</p>
                            )}
                        </div>
                    </div>
                </section>

                <section className="artist-spotlight-release" aria-labelledby={`${playerId}-release-title`}>
                    <div className="artist-spotlight-release-heading">
                        <span className="artist-spotlight-eyebrow">{text("releaseEyebrow", "THE LATEST RELEASE")}</span>
                    </div>
                    <div className="artist-spotlight-release-main">
                        <button className={`artist-spotlight-turntable${isPlaying ? " is-playing" : ""}`}
                                type="button" onClick={playTrack} disabled={!canPlay}
                                aria-label={isPlaying ? text("pauseTrack", "Pause latest release") : text("playTrack", "Play latest release")}
                                aria-describedby={!canPlay && !hasLocalAudio ? `${playerId}-play-hint` : undefined}>
                            <span className="artist-spotlight-vinyl" aria-hidden="true">
                                <span className="artist-spotlight-record-label">
                                    {release.coverImage ? <img src={release.coverImage} alt=""/> : <span>♫</span>}
                                </span>
                            </span>
                            <span className="artist-spotlight-play" aria-hidden="true">
                                {isPlaying ? (
                                    <svg viewBox="0 0 16 16"><rect x="4" y="3" width="2.5" height="10" rx="0.5"/>
                                        <rect x="9.5" y="3" width="2.5" height="10" rx="0.5"/></svg>
                                ) : (
                                    <svg viewBox="0 0 16 16"><path d="M5 3.5 12 8 5 12.5Z"/></svg>
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
                    {artistLinks.length > 0 && (
                        <nav className="artist-spotlight-links" aria-label={text("moreLinks", "More artist links")}>
                            {artistLinks.map((link) => (
                                <a key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.label}<span aria-hidden="true"> ↗</span>
                                </a>
                            ))}
                        </nav>
                    )}
                </section>
            </div>
        </Article>
    )
}

export default ArticleArtistSpotlight
