export const MINESWEEPER_ROWS = 9
export const MINESWEEPER_COLS = 9
export const MINESWEEPER_MINES = 10
export const MINESWEEPER_COLORS = [
    "#0000ff",
    "#008100",
    "#ff1300",
    "#000083",
    "#810500",
    "#2a9494",
    "#000000",
    "#808080"
]

export function createMinesweeperBoard(rows = MINESWEEPER_ROWS, cols = MINESWEEPER_COLS, mineCount = MINESWEEPER_MINES) {
    const total = rows * cols
    const safeMineCount = Math.max(1, Math.min(mineCount, total - 1))
    const mines = new Set()

    while(mines.size < safeMineCount) {
        mines.add(Math.floor(Math.random() * total))
    }

    const counts = new Array(total).fill(0)
    for(let index = 0; index < total; index++) {
        if(mines.has(index)) {
            counts[index] = -1
            continue
        }

        const x = index % cols
        const y = Math.floor(index / cols)
        let neighbours = 0

        for(let dy = -1; dy <= 1; dy++) {
            for(let dx = -1; dx <= 1; dx++) {
                if(dx === 0 && dy === 0) continue
                const nx = x + dx
                const ny = y + dy
                if(nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
                if(mines.has(ny * cols + nx)) neighbours += 1
            }
        }

        counts[index] = neighbours
    }

    return {rows, cols, mineCount: safeMineCount, mines, counts}
}

export function floodRevealMinesweeper(index, board, revealed, flagged) {
    const next = new Set(revealed)
    const pending = [index]

    while(pending.length > 0) {
        const current = pending.pop()
        if(current == null) continue
        if(next.has(current) || flagged.has(current) || board.mines.has(current)) continue

        next.add(current)
        if(board.counts[current] !== 0) continue

        const x = current % board.cols
        const y = Math.floor(current / board.cols)

        for(let dy = -1; dy <= 1; dy++) {
            for(let dx = -1; dx <= 1; dx++) {
                if(dx === 0 && dy === 0) continue
                const nx = x + dx
                const ny = y + dy
                if(nx < 0 || ny < 0 || nx >= board.cols || ny >= board.rows) continue
                pending.push(ny * board.cols + nx)
            }
        }
    }

    return next
}

export function isMinesweeperVictory(board, revealed, flagged) {
    const safeCells = board.rows * board.cols - board.mineCount
    if(revealed.size >= safeCells) return true
    if(flagged.size !== board.mineCount) return false
    for(const mineIndex of board.mines) {
        if(!flagged.has(mineIndex)) return false
    }
    return true
}
