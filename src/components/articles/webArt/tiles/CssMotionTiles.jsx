import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export function SpinBoxesTile({ itemWrapper, locked, onReady }) {
    const didReadyRef = useRef(false)

    useEffect(() => {
        if(didReadyRef.current) return
        didReadyRef.current = true
        onReady?.(itemWrapper.uniqueId)
    }, [itemWrapper.uniqueId, onReady])

    const boxes = useMemo(() => {
        return [
            { key: "stop", hoverMode: "stop", hoverDuration: "5s" },
            { key: "slow", hoverMode: "slow", hoverDuration: "18s" },
            { key: "super-fast", hoverMode: "super-fast", hoverDuration: "0.22s" },
            { key: "very-fast", hoverMode: "very-fast", hoverDuration: "0.55s" }
        ]
    }, [])

    return (
        <div className={`article-web-art-tile article-web-art-spin-boxes ${locked ? "article-web-art-spin-boxes-locked" : ""}`}>
            <div className={`article-web-art-spin-boxes-grid`}>
                {boxes.map(({ key, hoverDuration, hoverMode }) => (
                    <div key={key}
                         className={`article-web-art-spin-box`}
                         style={{
                             "--spin-duration": "5s",
                             "--spin-hover-duration": hoverDuration
                         }}>
                        <div className={`article-web-art-spin-box-core article-web-art-spin-box-core-${hoverMode}`}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function BarsTile({ itemWrapper, index, activate, locked, onReady }) {
    const didReadyRef = useRef(false)
    const panelCount = 50
    const levels = useMemo(() => ["level-1", "level-2", "level-3", "level-4", "level-5"], [])
    const [levelIndex, setLevelIndex] = useState(0)
    const level = levels[levelIndex]

    const panels = useMemo(() => {
        return Array.from({ length: panelCount }, (_, panelIndex) => {
            const animationDelay = `${(3 / (panelCount / 2)) * (panelIndex + 1)}s`
            return {
                key: panelIndex,
                style: {
                    animationDelay,
                    "--bar-index": panelIndex
                }
            }
        })
    }, [])

    const toggleLevel = useCallback((event) => {
        event?.preventDefault?.()
        event?.stopPropagation?.()
        setLevelIndex((current) => (current + 1) % levels.length)
    }, [levels.length])

    useEffect(() => {
        if(!activate) return
        if(didReadyRef.current) return
        didReadyRef.current = true
        onReady?.(itemWrapper.uniqueId)
    }, [activate, itemWrapper.uniqueId, onReady])

    return (
        <button type={"button"}
                className={`article-web-art-tile article-web-art-bars-tile article-web-art-tile-clickable`}
                aria-label={`Bars web art tile ${index + 1}, ${level.replace("level-", "mode ")}`}
                disabled={locked}
                onClick={locked ? undefined : toggleLevel}
                onKeyDown={locked ? undefined : (event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        toggleLevel(event)
                    }
                }}>
            <div className={`article-web-art-bars-stage article-web-art-bars-stage-${level}`}>
                <div className={`article-web-art-bars article-web-art-bars-${level}`}>
                    {panels.map((panel) => (
                        <div key={panel.key}
                             className={`article-web-art-bars-panel`}
                             style={panel.style}/>
                    ))}
                </div>
            </div>
        </button>
    )
}

const PULSE_BOX_SRC_DOC = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #212121;
}

@keyframes pulse {
  70% {
    background-color: #e6e6ff;
  }
}

.box {
  -webkit-filter: contrast(30);
  filter: contrast(30);
  box-shadow: 0 0 100px black;
  background-color: black;
  font-size: min(10em, 48vmin);
  padding: 0.5em;
  position: relative;
  z-index: 0;
  color: #808080;
  border: 2px solid #555;
  width: 1em;
  height: 1em;
  display: inline-block;
  vertical-align: middle;
  transition: background-color 2s linear;
}

.box:hover {
  background-color: #d580ff;
  animation: pulse 5s ease-in infinite;
}

.box:active {
  background-color: black;
  -webkit-filter: contrast(50) invert(1);
  filter: contrast(50) invert(1);
  animation: none;
}

@keyframes swayx {
  50% {
    left: 75%;
  }
}

@keyframes swayy {
  50% {
    top: 75%;
  }
}

@keyframes color {
  14.2857142857% { background-color: hsl(14.2857142857deg 100% 50%); }
  28.5714285714% { background-color: hsl(28.5714285714deg 100% 50%); }
  42.8571428571% { background-color: hsl(42.8571428571deg 100% 50%); }
  57.1428571429% { background-color: hsl(57.1428571429deg 100% 50%); }
  71.4285714286% { background-color: hsl(71.4285714286deg 100% 50%); }
  85.7142857143% { background-color: hsl(85.7142857143deg 100% 50%); }
  100% { background-color: hsl(100deg 100% 50%); }
}

.circle {
  border-radius: 50%;
  height: 1em;
  width: 1em;
  -webkit-filter: blur(25px);
  filter: blur(25px);
  position: absolute;
  background-color: white;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.one {
  animation: color 12s linear infinite alternate;
}

.two {
  font-size: 0.75em;
  left: -75%;
  top: -75%;
  animation:
    swayx 3s ease-in-out infinite,
    swayy 3.3s ease-in-out infinite,
    color 16s linear infinite alternate-reverse;
}
  </style>
</head>
<body>
  <div class="box">
    <div class="one circle"></div>
    <div class="two circle"></div>
  </div>
</body>
</html>`

export function PulseBoxTile({ itemWrapper, index, activate, onReady }) {
    const didReadyRef = useRef(false)
    const iframeRef = useRef(null)

    useEffect(() => {
        if(!activate) return
        if(didReadyRef.current) return
        didReadyRef.current = true
        onReady?.(itemWrapper.uniqueId)
    }, [activate, itemWrapper.uniqueId, onReady])

    return (
        <div className={`article-web-art-tile article-web-art-pulse-tile`}
             role={"img"}
             aria-label={`Pulse web art tile ${index + 1}`}>
            <iframe ref={iframeRef}
                    className={`article-web-art-pulse-frame`}
                    title={"Pulse web art"}
                    srcDoc={PULSE_BOX_SRC_DOC}
                    sandbox={""}
                    scrolling={"no"}/>
        </div>
    )
}
