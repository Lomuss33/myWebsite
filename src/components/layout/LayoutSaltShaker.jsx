import "./LayoutSaltShaker.scss"
import React, {useEffect, useRef, useState} from "react"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useNavigation} from "../../providers/NavigationProvider.jsx"
import {useFeedbacks} from "../../providers/FeedbacksProvider.jsx"
import HoverStaticTooltip from "../widgets/HoverStaticTooltip.jsx"

function LayoutSaltShaker() {
    const language = useLanguage()
    const navigation = useNavigation()
    const feedbacks = useFeedbacks()

    const [isPaused, setIsPaused] = useState(false)
    const pauseTimeoutRef = useRef(null)
    const didInitTargetSectionRef = useRef(false)

    const tooltipLabel = language?.getStringOrFallback?.(
        "salt_shaker_grain_of_salt",
        "Take it with a grain of salt."
    )
    const isInteractiveDesktop = Boolean(feedbacks?.animatedCursorEnabled)
    const isCursorActive = feedbacks?.animatedCursorActive ?? true
    const cursorActionLabel = language?.getStringOrFallback?.(
        isCursorActive ? "deactivate_magic_cursor" : "activate_magic_cursor",
        isCursorActive ? "Deactivate Magic Cursor" : "Activate Magic Cursor"
    )

    const pauseFor = (ms) => {
        setIsPaused(true)
        if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current)
        }
        pauseTimeoutRef.current = setTimeout(() => {
            setIsPaused(false)
            pauseTimeoutRef.current = null
        }, ms)
    }

    useEffect(() => {
        return () => {
            if (pauseTimeoutRef.current) {
                clearTimeout(pauseTimeoutRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (!navigation) return
        if (navigation.transitionStatus === "transition_status_running") {
            pauseFor(1000)
        }
    }, [navigation?.transitionStatus])

    useEffect(() => {
        if (!navigation) return

        if (!didInitTargetSectionRef.current) {
            didInitTargetSectionRef.current = true
            return
        }

        pauseFor(1000)
    }, [navigation?.targetSection?.id])

    const handleDesktopClick = () => {
        if (!isInteractiveDesktop) {
            return
        }

        feedbacks.toggleAnimatedCursorActive(true)
    }

    const handleKeyDown = (event) => {
        if (!isInteractiveDesktop) {
            return
        }

        if (event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar") {
            return
        }

        event.preventDefault()
        feedbacks.toggleAnimatedCursorActive(true)
    }

    const stateClass = !isInteractiveDesktop || isCursorActive
        ? "layout-salt-shaker-cursor-on"
        : "layout-salt-shaker-cursor-off"
    const interactiveClass = isInteractiveDesktop ? "layout-salt-shaker-interactive" : ""
    const pausedClass = isPaused ? "layout-salt-shaker-paused" : ""

    return (
        <div id="layout-salt-shaker"
             className={`layout-salt-shaker ${stateClass} ${interactiveClass} ${pausedClass}`.trim()}
             role={isInteractiveDesktop ? "button" : undefined}
             tabIndex={isInteractiveDesktop ? 0 : undefined}
             aria-label={isInteractiveDesktop ? cursorActionLabel : tooltipLabel}
             aria-pressed={isInteractiveDesktop ? isCursorActive : undefined}
             onKeyDown={handleKeyDown}>
            <HoverStaticTooltip label={tooltipLabel}
                               className={`layout-salt-shaker-tooltip text-center`}
                               id={`layout-salt-shaker-tooltip`}
                               targetId={`layout-salt-shaker`}
                               onDesktopClick={isInteractiveDesktop ? handleDesktopClick : null}
                               forceResetFlag={`${navigation?.targetSection?.id || "none"}-${isPaused ? "paused" : "active"}`}
                               toggleBehaviorOnTouchScreens={true}/>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 331 379"
                preserveAspectRatio="xMaxYMax meet"
                width="331"
                height="379"
                focusable="false">
                <style>{`
                    .st0{opacity:0.5;fill:var(--layout-salt-shaker-glass-base, #F5F5F5);transition:fill 0.22s ease, stroke 0.22s ease, opacity 0.22s ease;}
                    .st1{clip-path:url(#layout-salt-shaker-svgid-2);fill:var(--layout-salt-shaker-top-fill, #EAEAEA);stroke:var(--layout-salt-shaker-top-fill, #EAEAEA);stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;stroke-dasharray:1,6;transition:fill 0.22s ease, stroke 0.22s ease, opacity 0.22s ease;}
                    .st2{clip-path:url(#layout-salt-shaker-svgid-2);fill:var(--layout-salt-shaker-surface-fill, #FFFFFF);transition:fill 0.22s ease, stroke 0.22s ease, opacity 0.22s ease;}
                    .st3{clip-path:url(#layout-salt-shaker-svgid-2);}
                    .st4{fill:none;stroke:var(--layout-salt-shaker-surface-stroke, #FFFFFF);stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;transition:fill 0.22s ease, stroke 0.22s ease, opacity 0.22s ease;}
                    .st5{fill:none;stroke:var(--layout-salt-shaker-surface-stroke, #FFFFFF);stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;stroke-dasharray:1.003,6.0182;transition:fill 0.22s ease, stroke 0.22s ease, opacity 0.22s ease;}
                    .st6{fill:var(--layout-salt-shaker-surface-stroke, #FFFFFF);transition:fill 0.22s ease, stroke 0.22s ease, opacity 0.22s ease;}
                    .st7{opacity:0.4;fill:var(--layout-salt-shaker-top-fill, #EAEAEA);transition:fill 0.22s ease, stroke 0.22s ease, opacity 0.22s ease;}
                    .st8{fill:none;stroke:var(--layout-salt-shaker-outline, #C9C9C9);stroke-width:6;stroke-linejoin:round;stroke-miterlimit:10;transition:fill 0.22s ease, stroke 0.22s ease, opacity 0.22s ease;}
                    .st9{fill:none;stroke:var(--layout-salt-shaker-outline, #C9C9C9);stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;transition:fill 0.22s ease, stroke 0.22s ease, opacity 0.22s ease;}
                    .st10{fill:var(--layout-salt-shaker-outline, #C9C9C9);transition:fill 0.22s ease, stroke 0.22s ease, opacity 0.22s ease;}
                    .st11{fill:var(--layout-salt-shaker-shadow, #B5B5B5);transition:fill 0.22s ease, stroke 0.22s ease, opacity 0.22s ease;}
                    .st12{fill:var(--layout-salt-shaker-shadow-deep, #939393);transition:fill 0.22s ease, stroke 0.22s ease, opacity 0.22s ease;}
                    .st13{clip-path:url(#layout-salt-shaker-svgid-4);fill:none;stroke:var(--layout-salt-shaker-shadow, #B5B5B5);stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;transition:fill 0.22s ease, stroke 0.22s ease, opacity 0.22s ease;}
                    .st14{fill:var(--layout-salt-shaker-grain-fill, #FFFFFF);stroke:var(--layout-salt-shaker-grain-stroke, #D3D3D3);stroke-miterlimit:10;transition:fill 0.22s ease, stroke 0.22s ease, opacity 0.22s ease;}

                    @keyframes layout-salt-shaker-upanddown{
                        0%{transform:rotate(0deg);}
                        100%{transform:rotate(10deg);}
                    }
                    @keyframes layout-salt-shaker-sel{
                        0%{opacity:0;transform:translate(10px, -10px);}
                        20%{opacity:1;}
                        50%{opacity:1;}
                        100%{opacity:0;transform:translate(-10px, 10px);}
                    }

                    #layout-salt-shaker-saliere{
                        transform-origin: 339px 226px;
                        animation: layout-salt-shaker-upanddown 0.9375s steps(2, end) infinite alternate;
                    }
                    #layout-salt-shaker-salt{
                        animation: layout-salt-shaker-sel 1s linear -0.18s infinite;
                    }

                    @media (prefers-reduced-motion: reduce){
                        #layout-salt-shaker-saliere, #layout-salt-shaker-salt{
                            animation: none !important;
                        }
                    }
                `}</style>

                <g id="layout-salt-shaker-saliere">
                    <path
                        className="st0"
                        d="M209.6,46c0,0-96.9,45.2-96.1,133.9c0,0,11.3,42.2,65.4,45.3c0,0,79.5-21.7,96.1-121.9c0,0-3.9-3.9-4.9-20.5
		c0,0-21.8-21-27.5-26.2C233.3,54.1,209.6,46,209.6,46z"
                    />
                    <g>
                        <defs>
                            <path
                                id="layout-salt-shaker-svgid-1"
                                d="M209.6,46c0,0-96.9,45.2-96.1,133.9c0,0,11.3,42.2,65.4,45.3c0,0,79.5-21.7,96.1-121.9
				c0,0-3.9-3.9-4.9-20.5c0,0-21.8-21-27.5-26.2C233.3,54.1,209.6,46,209.6,46z"
                            />
                        </defs>
                        <clipPath id="layout-salt-shaker-svgid-2">
                            <use href="#layout-salt-shaker-svgid-1" style={{ overflow: "visible" }} />
                        </clipPath>
                        <path
                            className="st1"
                            d="M119.6,122.3c7.9-7,142.6-16,159.9,13.4l-12.8,19.9l-158.7-12.3C108.1,143.3,111.7,129.3,119.6,122.3z"
                        />
                        <path
                            className="st2"
                            d="M118.8,116.3c0,0,111.3,30.1,180.6,13.2L181.3,240.4l-79.1-57.1L118.8,116.3z"
                        />
                        <g className="st3">
                            <g>
                                <path className="st4" d="M118.8,116.3c0,0,0.2,0,0.5,0.1" />
                                <path className="st5" d="M125.1,117.9c24,5.9,111.4,25.3,170.8,12.4" />
                                <path className="st4" d="M298.9,129.7c0.2,0,0.3-0.1,0.5-0.1" />
                            </g>
                        </g>
                    </g>
                    <g>
                        <circle className="st6" cx="169.8" cy="119.4" r="2" />
                        <circle className="st6" cx="194.8" cy="116.9" r="2.4" />
                        <circle className="st6" cx="187.2" cy="124" r="1.9" />
                        <circle className="st6" cx="210.8" cy="122.4" r="1.9" />
                        <circle className="st6" cx="219.6" cy="128.3" r="2.3" />
                        <circle className="st6" cx="235.3" cy="122.1" r="2.3" />
                        <circle className="st6" cx="233.1" cy="132.4" r="2.3" />
                        <circle className="st6" cx="191" cy="130.1" r="2" />
                        <circle className="st6" cx="204.8" cy="129.3" r="2.1" />
                        <circle className="st6" cx="257.8" cy="127.4" r="1.9" />
                    </g>
                    <path
                        className="st7"
                        d="M202.6,65.9c0,0,32.7-6.9,58.4,31.9c0,0-32.3,77.9-94.6,115.2l8.6,12.3c0,0,74.7-10.3,100-119.7
		c0,0-6-9.2-4.9-22.7l-27.5-26.2l-33-10.6c0,0-100.8,52.2-96.1,133.9l13.8,5.8C127.3,185.7,145.8,94.7,202.6,65.9z"
                    />
                    <path
                        className="st8"
                        d="M209.6,46c0,0-96.9,45.2-96.1,133.9c0,0,11.3,42.2,65.4,45.3c0,0,79.5-21.7,96.1-121.9c0,0-3.9-3.9-4.9-20.5
		c0,0-21.8-21-27.5-26.2C233.3,54.1,209.6,46,209.6,46z"
                    />
                    <path className="st9" d="M130.2,175.6c20.6-88.4,72.4-109.8,72.4-109.8" />
                    <path className="st9" d="M261,97.8c0,0-25.7,69.7-82.9,105.1" />
                    <path
                        className="st10"
                        d="M111.2,183.2l-8.6,12.7c0,0-2.3,2.3-2.5,5.6c0,0-3.7,2.5-5.4,5.3c-1.8,2.7-6.9,8.2-5.4,15.1
		c1.6,7.2,26.7,38.1,62.7,41.9c0,0,6.9-1.4,9.3-6.5c2.5-5.1,0.6-6.1,0.6-6.1s6.9-1.6,4.8-7.1c0,0,1.9,0.3,5.7-5.1
		c3.8-5.3,5.7-10.1,5.7-10.1s5.4-10.1-26.6-32.2S111.2,183.2,111.2,183.2z"
                    />
                    <ellipse
                        transform="matrix(0.8192 0.5735 -0.5735 0.8192 159.7644 -26.0332)"
                        className="st11"
                        cx="121.2"
                        cy="240.4"
                        rx="38.7"
                        ry="11.1"
                    />
                    <g>
                        <ellipse
                            transform="matrix(0.8192 0.5735 -0.5735 0.8192 160.3758 -24.8587)"
                            className="st12"
                            cx="119.6"
                            cy="241.9"
                            rx="4.8"
                            ry="1.4"
                        />
                        <ellipse
                            transform="matrix(0.8192 0.5735 -0.5735 0.8192 155.3239 -25.9605)"
                            className="st12"
                            cx="118.8"
                            cy="233.4"
                            rx="4.8"
                            ry="1.4"
                        />
                        <ellipse
                            transform="matrix(0.8192 0.5735 -0.5735 0.8192 150.8639 -18.0406)"
                            className="st12"
                            cx="104"
                            cy="230.3"
                            rx="4.8"
                            ry="1.4"
                        />
                        <ellipse
                            transform="matrix(0.8192 0.5735 -0.5735 0.8192 158.5219 -20.5348)"
                            className="st12"
                            cx="111.8"
                            cy="241.2"
                            rx="4.8"
                            ry="1.4"
                        />
                        <ellipse
                            transform="matrix(0.8192 0.5735 -0.5735 0.8192 167.0439 -33.555)"
                            className="st12"
                            cx="136.7"
                            cy="248.2"
                            rx="4.8"
                            ry="1.4"
                        />
                        <ellipse
                            transform="matrix(0.8192 0.5735 -0.5735 0.8192 168.7375 -29.5853)"
                            className="st12"
                            cx="131.3"
                            cy="252.8"
                            rx="4.8"
                            ry="1.4"
                        />
                    </g>
                    <g>
                        <defs>
                            <path
                                id="layout-salt-shaker-svgid-3"
                                d="M111.2,183.2l-8.6,12.7c0,0-2.3,2.3-2.5,5.6c0,0-3.7,2.5-5.4,5.3c-1.8,2.7-7.4,8.4-4.7,15.2
				c2.7,6.8,24.3,40.4,62,41.8c0,0,6.9-1.4,9.3-6.5c2.5-5.1,0.6-6.1,0.6-6.1s6.9-1.6,4.8-7.1c0,0,1.9,0.3,5.7-5.1
				c3.8-5.3,5.7-10.1,5.7-10.1s5.4-10.1-26.6-32.2S111.2,183.2,111.2,183.2z"
                            />
                        </defs>
                        <clipPath id="layout-salt-shaker-svgid-4">
                            <use href="#layout-salt-shaker-svgid-3" style={{ overflow: "visible" }} />
                        </clipPath>
                        <path className="st13" d="M161.9,251.1c0,0-5.2-17.9-32.4-31.3" />
                        <path
                            className="st13"
                            d="M166.7,243.4c0,0-0.8-10.8-27-29.3c-29.8-19.9-39.6-12.7-39.6-12.7"
                        />
                    </g>
                </g>

                <g id="layout-salt-shaker-salt">
                    <g>
                        <circle className="st14" cx="73.5" cy="276.5" r="3.2" />
                        <circle className="st14" cx="88" cy="255.8" r="2.8" />
                        <circle className="st14" cx="57.8" cy="315.3" r="3" />
                        <circle className="st14" cx="41.2" cy="349.9" r="3" />
                        <circle className="st14" cx="117.8" cy="277.5" r="2.6" />
                        <circle className="st14" cx="82.2" cy="343.5" r="2.6" />
                        <circle className="st14" cx="116.3" cy="313" r="2.8" />
                        <circle className="st14" cx="46.7" cy="284.1" r="3" />
                        <circle className="st14" cx="90.5" cy="303.6" r="2.7" />
                    </g>
                </g>
            </svg>
        </div>
    )
}

export default LayoutSaltShaker
