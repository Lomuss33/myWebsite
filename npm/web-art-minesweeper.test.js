import test from 'node:test'
import assert from 'node:assert/strict'
import {createMinesweeperBoard, floodRevealMinesweeper, isMinesweeperVictory} from '../src/components/articles/webArt/minesweeper.js'

const boardWithMineAtBottomRight = {
    rows: 3,
    cols: 3,
    mineCount: 1,
    mines: new Set([8]),
    counts: [0,0,0,0,1,1,0,1,-1]
}

test('generated boards keep mine counts and neighbour clues consistent', () => {
    const board = createMinesweeperBoard()
    assert.equal(board.rows, 9)
    assert.equal(board.cols, 9)
    assert.equal(board.mineCount, 10)
    assert.equal(board.mines.size, 10)

    for(let index = 0; index < board.counts.length; index++) {
        if(board.mines.has(index)) {
            assert.equal(board.counts[index], -1)
            continue
        }

        const x = index % board.cols
        const y = Math.floor(index / board.cols)
        let expected = 0
        for(let dy = -1; dy <= 1; dy++) {
            for(let dx = -1; dx <= 1; dx++) {
                if(dx === 0 && dy === 0) continue
                const nx = x + dx
                const ny = y + dy
                if(nx >= 0 && ny >= 0 && nx < board.cols && ny < board.rows && board.mines.has(ny * board.cols + nx))
                    expected += 1
            }
        }
        assert.equal(board.counts[index], expected, `cell ${index} clue`)
    }
})

test('generated boards clamp mine counts to preserve at least one safe cell', () => {
    const board = createMinesweeperBoard(3,3,20)
    assert.equal(board.mineCount, 8)
    assert.equal(board.mines.size, 8)
    assert.equal(board.counts.filter(value => value !== -1).length, 1)
})

test('flood reveal expands through empty cells and stops at flags and mines', () => {
    const allSafeCells = floodRevealMinesweeper(0, boardWithMineAtBottomRight, new Set(), new Set())
    assert.deepEqual([...allSafeCells].sort((a,b)=>a-b), [0,1,2,3,4,5,6,7])

    const flaggedCells = floodRevealMinesweeper(0, boardWithMineAtBottomRight, new Set(), new Set([1]))
    assert.deepEqual([...flaggedCells].sort((a,b)=>a-b), [0,3,4,6,7])
    assert.equal(flaggedCells.has(1), false)
    assert.equal(flaggedCells.has(8), false)
})

test('victory accepts all safe cells or the exact mine flags only', () => {
    const board = {rows:2, cols:2, mineCount:1, mines:new Set([3])}
    assert.equal(isMinesweeperVictory(board, new Set([0,1,2]), new Set()), true)
    assert.equal(isMinesweeperVictory(board, new Set(), new Set([3])), true)
    assert.equal(isMinesweeperVictory(board, new Set(), new Set([2])), false)
    assert.equal(isMinesweeperVictory(board, new Set([0,1]), new Set()), false)
})
