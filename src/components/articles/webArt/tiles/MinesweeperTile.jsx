import React, { useEffect, useMemo, useState } from 'react'
import {
    createMinesweeperBoard,
    floodRevealMinesweeper,
    isMinesweeperVictory,
    MINESWEEPER_COLORS
} from "../minesweeper.js"

export default function MinesweeperTile({ readyId, locked, onReady }) {
    const [gameId, setGameId] = useState(0)
    const [mode, setMode] = useState("mine")
    const [revealed, setRevealed] = useState(() => new Set())
    const [flagged, setFlagged] = useState(() => new Set())
    const [status, setStatus] = useState("playing")
    const [startedAt, setStartedAt] = useState(null)
    const [elapsedSeconds, setElapsedSeconds] = useState(0)

    const board = useMemo(() => createMinesweeperBoard(), [gameId])

    useEffect(() => {
        onReady?.(readyId)
    }, [onReady, readyId])

    useEffect(() => {
        setMode("mine")
        setRevealed(new Set())
        setFlagged(new Set())
        setStatus("playing")
        setStartedAt(null)
        setElapsedSeconds(0)
    }, [gameId])

    useEffect(() => {
        if(startedAt == null || status !== "playing") return
        const tick = () => {
            setElapsedSeconds(Math.min(5999, Math.floor((Date.now() - startedAt) / 1000)))
        }
        tick()
        const intervalId = window.setInterval(tick, 1000)
        return () => {
            window.clearInterval(intervalId)
        }
    }, [startedAt, status])

    const reset = () => {
        setGameId((prev) => prev + 1)
    }

    const handleCellAction = (index) => {
        if(locked || status !== "playing") return

        if(startedAt == null) {
            setStartedAt(Date.now())
        }

        if(mode === "flag") {
            if(revealed.has(index)) return

            const nextFlagged = new Set(flagged)
            if(nextFlagged.has(index)) nextFlagged.delete(index)
            else nextFlagged.add(index)

            setFlagged(nextFlagged)
            if(isMinesweeperVictory(board, revealed, nextFlagged)) {
                setStatus("won")
            }
            return
        }

        if(flagged.has(index) || revealed.has(index)) return

        if(board.mines.has(index)) {
            const nextRevealed = new Set(revealed)
            for(const mineIndex of board.mines) nextRevealed.add(mineIndex)
            nextRevealed.add(index)
            setRevealed(nextRevealed)
            setStatus("lost")
            return
        }

        const nextRevealed = floodRevealMinesweeper(index, board, revealed, flagged)
        setRevealed(nextRevealed)
        if(isMinesweeperVictory(board, nextRevealed, flagged)) {
            setStatus("won")
        }
    }

    const minesLeft = board.mineCount - flagged.size
    const timerText = `${String(Math.floor(elapsedSeconds / 60)).padStart(2, "0")}:${String(elapsedSeconds % 60).padStart(2, "0")}`

    let mood = "🤔"
    if(status === "lost") mood = "😣"
    else if(status === "won") mood = "😎"
    else if(flagged.size >= board.mineCount) mood = "😕"
    else if(flagged.size >= board.mineCount - 1) mood = "🤓"
    else if(flagged.size >= Math.round(board.mineCount * 3 / 4)) mood = "😃"
    else if(flagged.size >= Math.round(board.mineCount * 2 / 3)) mood = "😊"
    else if(flagged.size >= Math.round(board.mineCount / 2)) mood = "🙂"
    else if(flagged.size >= Math.round(board.mineCount / 3)) mood = "😏"
    else if(flagged.size > 0) mood = "😐"

    return (
        <div className={`article-web-art-tile article-web-art-tile-minesweeper`}
             role={"group"}
             aria-label={`Minesweeper web art tile`}>
            <div className={`article-web-art-minesweeper`}>
                <div className={`article-web-art-minesweeper-action-selector`}>
                    <button type={"button"}
                            className={`article-web-art-minesweeper-mode ${mode === "mine" ? "article-web-art-minesweeper-mode-active" : ""}`}
                            onClick={() => setMode("mine")}
                            disabled={locked || status !== "playing"}
                            aria-label={"Pickaxe tool"}
                            title={"Reveal cells"}
                            aria-pressed={mode === "mine"}>
                        <span className="article-web-art-minesweeper-mode-icon" aria-hidden={true}>⛏</span>
                    </button>
                    <button type={"button"}
                            className={`article-web-art-minesweeper-mode ${mode === "flag" ? "article-web-art-minesweeper-mode-active" : ""}`}
                            onClick={() => setMode("flag")}
                            disabled={locked || status !== "playing"}
                            aria-label={"Flag tool"}
                            title={"Place flags"}
                            aria-pressed={mode === "flag"}>
                        <span className="article-web-art-minesweeper-mode-icon" aria-hidden={true}>🚩</span>
                    </button>
                </div>

                <div className={`article-web-art-minesweeper-grid`}>
                    {board.counts.map((cellValue, index) => {
                        const isRevealed = revealed.has(index)
                        const isFlagged = flagged.has(index)
                        const isMine = board.mines.has(index)
                        const showMine = status === "lost" && isMine
                        const cellColor = cellValue > 0 ? MINESWEEPER_COLORS[cellValue - 1] : undefined

                        return (
                            <button key={`mine-${gameId}-${index}`}
                                    type={"button"}
                                    className={`article-web-art-minesweeper-cell ${isRevealed ? "article-web-art-minesweeper-cell-revealed" : ""} ${showMine ? "article-web-art-minesweeper-cell-mine" : ""}`}
                                    onClick={() => handleCellAction(index)}
                                    disabled={locked || status !== "playing"}
                                    aria-label={`Minesweeper cell ${index + 1}`}>
                                {isFlagged && !isRevealed ? (
                                    <span className={`article-web-art-minesweeper-cell-flag`}>🚩</span>
                                ) : null}

                                {showMine ? (
                                    <span className={`article-web-art-minesweeper-cell-mine-icon`}>💣</span>
                                ) : null}

                                {isRevealed && !isMine && cellValue > 0 ? (
                                    <span className={`article-web-art-minesweeper-cell-count`}
                                          style={{ color: cellColor }}>
                                        {cellValue}
                                    </span>
                                ) : null}
                            </button>
                        )
                    })}

                    {status === "lost" ? (
                        <button type={"button"}
                                className={`article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost`}
                                onClick={reset}>
                            Ooohhh 🙁
                            <br/>
                            Click to try again
                        </button>
                    ) : null}

                    {status === "won" ? (
                        <button type={"button"}
                                className={`article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won`}
                                onClick={reset}>
                            👌👀✔💯💯💯
                            <br/>
                            Click to restart
                        </button>
                    ) : null}
                </div>

                <div className={`article-web-art-minesweeper-infos`}>
                    <div className={`article-web-art-minesweeper-counter`}>
                        <span className={`article-web-art-minesweeper-counter-face`}>{mood}</span>
                        <span>{minesLeft}</span>
                    </div>
                    <div className={`article-web-art-minesweeper-timer`}>
                        {timerText}
                    </div>
                </div>

                <span className={`article-web-art-tile-label`}>
                    Bomb
                </span>
            </div>
        </div>
    )
}
