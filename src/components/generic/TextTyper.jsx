import "./TextTyper.scss"
import React, {useEffect, useState} from 'react'
import Animable from "../capabilities/Animable.jsx"
import {useUtils} from "../../hooks/utils.js"
import {useNavigation} from "../../providers/NavigationProvider.jsx"

function TextTyper({ strings, id, typingSpeed = 0.11, deletingSpeed = 0.015, displayTime = 1, className = "", fixedPrefix = "", randomOrder = false }) {
    const utils = useUtils()
    const navigation = useNavigation()

    const [parsedStrings, setParsedStrings] = useState(null)
    const [currentText, setCurrentText] = useState("")
    const [targetWord, setTargetWord] = useState("")
    const [randomQueue, setRandomQueue] = useState([])
    const [completedCycles, setCompletedCycles] = useState(0)
    const [status, setStatus] = useState(TextTyper.Status.INITIALIZING)
    const [statusElapsed, setStatusElapsed] = useState(0)
    const [cursorVisible, setCursorVisible] = useState(false)
    const [cursorElapsed, setCursorElapsed] = useState(0)

    const animationId = `text-typer-` + (id || "default")

    useEffect(() => {
        if(!strings || !strings.length)
            return

        _reset()
        setParsedStrings(strings.map(string => { return utils.string.stripHTMLTags(string) }))
    }, [strings])

    const _reset = () => {
        setStatus(TextTyper.Status.INITIALIZING)
        setCurrentText("")
        setTargetWord(null)
        setRandomQueue([])
        setCompletedCycles(0)
        setStatusElapsed(0)
        setCursorVisible(false)
        setCursorElapsed(0)
    }

    const _shuffleStrings = (items) => {
        const shuffled = [...items]

        for(let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = shuffled[i]
            shuffled[i] = shuffled[j]
            shuffled[j] = temp
        }

        return shuffled
    }

    const _buildRandomQueue = (currentWord) => {
        const candidates = parsedStrings.filter(string => string !== currentWord)
        return _shuffleStrings(candidates)
    }

    const _buildEasterEggString = () => {
        const emojiPool = [
            "🐣", "🥚", "🌷", "✨", "🎉", "🛠️", "💡", "🔌", "🖥️", "⌨️",
            "🧠", "⚙️", "🔧", "📡", "💾", "🌍", "🚀", "🔥", "🎛️", "📟"
        ]

        const emojiCount = Math.floor(Math.random() * 8) + 3
        const randomEmojis = Array.from({ length: emojiCount }, () => {
            const randomIndex = Math.floor(Math.random() * emojiPool.length)
            return emojiPool[randomIndex]
        })

        return ["🐰", ...randomEmojis].join(" ")
    }

    const _maybeCreateEasterEgg = (nextWord, nextCycleCount) => {
        const isEligibleCycle = nextCycleCount >= 6 && (nextCycleCount - 6) % 20 === 0

        if(isEligibleCycle && Math.random() < 0.05)
            return _buildEasterEggString()
        return nextWord
    }

    const _getTypingDelay = () => {
        if(!targetWord)
            return typingSpeed

        const totalLength = Math.max(targetWord.length - 1, 1)
        const progress = Math.min(currentText.length / totalLength, 1)
        const fastDelay = Math.max(typingSpeed * 0.18, 0.02)
        const slowDelay = Math.max(typingSpeed, 0.09)
        const curvedProgress = Math.pow(progress, 2.2)

        return fastDelay + ((slowDelay - fastDelay) * curvedProgress)
    }

    const _getDeletingDelay = () => {
        if(!targetWord)
            return deletingSpeed

        const deletedCount = targetWord.length - currentText.length
        const totalLength = Math.max(targetWord.length - 1, 1)
        const progress = Math.min(deletedCount / totalLength, 1)
        const slowDelay = Math.max(deletingSpeed, 0.011)
        const fastDelay = Math.max(deletingSpeed * 0.015, 0.00075)
        const curvedProgress = Math.pow(progress, 6)

        return slowDelay - ((slowDelay - fastDelay) * curvedProgress)
    }

    const _update = (event) => {
        if(!parsedStrings || !parsedStrings.length) {
            _reset()
            return
        }

        setStatusElapsed(prevState => prevState + event.currentTickElapsed)
        setCursorElapsed(prevState => prevState + event.currentTickElapsed)

        const statusHandlers = {
            [TextTyper.Status.INITIALIZING]:        { hook: _onStatusInitializing },
            [TextTyper.Status.TYPING]:              { hook: _onStatusTyping },
            [TextTyper.Status.SHOWING]:             { hook: _onStatusShowing },
            [TextTyper.Status.DELETING]:            { hook: _onStatusDeleting },
        }

        if(navigation.isTransitioning()) {
            if(targetWord?.length > 0) _toggleCursor(0.2)
            else setCursorVisible(false)
            return
        }

        const handler = statusHandlers[status]
        const handlerHook = handler?.hook
        if(handlerHook) handlerHook(event.ticks)
    }

    const _onStatusInitializing = (ticks) => {
        setTargetWord(parsedStrings[0])
        if(randomOrder)
            setRandomQueue(_buildRandomQueue(parsedStrings[0]))
        setCursorVisible(true)
        _nextStatus()
    }

    const _onStatusTyping = (ticks) => {
        setCursorVisible(true)

        const currentDelay = _getTypingDelay()
        if(statusElapsed <= currentDelay)
            return

        const nextChar = targetWord.charAt(currentText.length)
        setCurrentText(currentText + nextChar)
        setStatusElapsed(0)
        if((currentText.length + 1) >= targetWord.length)
            _nextStatus()
    }

    const _onStatusShowing = () => {
        _toggleCursor(0.2)

        if(statusElapsed > displayTime) {
            _nextStatus()
        }
    }

    const _onStatusDeleting = () => {
        setCursorVisible(true)

        const currentDelay = _getDeletingDelay()
        if(statusElapsed <= currentDelay)
            return

        const currentTextSliced = currentText.slice(0, currentText.length - 1)
        setCurrentText(currentTextSliced)
        setStatusElapsed(0)
        if(currentTextSliced.length <= 0) {
            const nextCycleCount = completedCycles + 1
            setCompletedCycles(nextCycleCount)

            if(randomOrder) {
                let nextQueue = [...randomQueue]

                if(nextQueue.length === 0)
                    nextQueue = _buildRandomQueue(targetWord)

                const nextWord = nextQueue[0] || parsedStrings[0]
                setRandomQueue(nextQueue.slice(1))
                setTargetWord(_maybeCreateEasterEgg(nextWord, nextCycleCount))
            }
            else {
                const targetWordIndex = parsedStrings.indexOf(targetWord)
                const nextWordIndex = (targetWordIndex + 1) % parsedStrings.length
                setTargetWord(_maybeCreateEasterEgg(parsedStrings[nextWordIndex], nextCycleCount))
            }
            _nextStatus()
        }
    }

    const _nextStatus = () => {
        const order = {
            [TextTyper.Status.INITIALIZING]:        TextTyper.Status.TYPING,
            [TextTyper.Status.TYPING]:              TextTyper.Status.SHOWING,
            [TextTyper.Status.SHOWING]:             TextTyper.Status.DELETING,
            [TextTyper.Status.DELETING]:            TextTyper.Status.TYPING,
        }

        setStatusElapsed(0)

        const nextStatus = order[status]
        if(nextStatus) setStatus(nextStatus)
    }

    const _toggleCursor = (frequency) => {
        if(cursorElapsed > frequency) {
            setCursorVisible(!cursorVisible)
            setCursorElapsed(0)
        }
    }

    return (
        <Animable animationId={animationId}
                  className={`text-typer ${className}`}
                  onEnterFrame={_update}>
            <TextTyperSpan currentText={currentText}
                           cursorVisible={cursorVisible}
                           fixedPrefix={fixedPrefix}/>
        </Animable>
    )
}

function TextTyperSpan({ currentText, cursorVisible, fixedPrefix }) {
    const visibleClass = cursorVisible ?
        `text-typer-span-cursor-visible` :
        ``

    const transitionClass = currentText.length === 0 ?
        `text-typer-span-cursor-no-transition` :
        ``

    return (
        <span className={`text-typer-span`}>
            {fixedPrefix && (
                <span className={`text-typer-span-prefix`}>
                    {fixedPrefix}
                </span>
            )}

            <span className={`text-typer-span-dynamic`}>
                {currentText}
                <span className={`text-typer-span-cursor ${visibleClass} ${transitionClass}`}>_</span>
            </span>
        </span>
    );
}

TextTyper.Status = {
    INITIALIZING: "initializing",
    TYPING: "typing",
    SHOWING: "showing",
    DELETING: "deleting"
}

export default TextTyper
