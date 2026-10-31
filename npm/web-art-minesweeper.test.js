import test from 'node:test'
import assert from 'node:assert/strict'
import {createMinesweeperBoard, floodRevealMinesweeper, isMinesweeperVictory} from '../src/components/articles/webArt/minesweeper.js'
import {
    applyCarouselSlideSwaps,
    buildAllWebArtTileIds,
    DESIRED_WEB_ART_ITEM_ORDER,
    getItemTileLabel,
    orderWebArtItems
} from '../src/components/articles/webArt/registry/webArtRegistryData.js'
import {
    getOpenAllWebArtTileIds,
    limitWebArtTileSetForMobile,
    MOBILE_WEB_ART_OPEN_TILE_LIMIT,
    tileSetContainsAll
} from '../src/components/articles/webArt/hooks/webArtDomUtils.js'
import {
    getWebArtCarouselLabels,
    getWebArtIntroCopy,
    resolveWebArtActionLabels
} from '../src/components/articles/webArt/i18n/webArtCopy.js'

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

test('registry orders items in desired visual order and appends unknown ids last', () => {
    const raw = [
        { id: 1, uniqueId: 'u-1' },
        { id: 4, uniqueId: 'u-4' },
        { id: 99, uniqueId: 'u-99' },
        { id: 5, uniqueId: 'u-5' }
    ]
    const ordered = orderWebArtItems(raw)
    assert.deepEqual(ordered.map((item) => item.id), [4, 5, 1, 99])
    assert.equal(DESIRED_WEB_ART_ITEM_ORDER.length, 15)
    assert.equal(getItemTileLabel({ id: 4 }, 0), 'Poly')
    assert.equal(getItemTileLabel({ id: 5 }, 1), 'Click')
    assert.equal(getItemTileLabel({ id: 99 }, 3), '4')
})

test('carousel presentation swaps place Julia first and swap Plop with Click', () => {
    const baseSlides = [
        { id: 's-poly', label: 'Poly' },
        { id: 's-click', label: 'Click' },
        { id: 's-wave', label: 'Wave' },
        { id: 's-plop', label: 'Plop' },
        { id: 's-julia', label: 'Julia' }
    ]
    const swapped = applyCarouselSlideSwaps(baseSlides)
    assert.equal(swapped[0].label, 'Julia')
    assert.equal(swapped[1].label, 'Plop')
    assert.equal(swapped[2].label, 'Poly')
    assert.equal(swapped[3].label, 'Click')
    assert.equal(swapped[4].label, 'Wave')
})

test('mobile tile set helpers cap open tiles to MOBILE_WEB_ART_OPEN_TILE_LIMIT', () => {
    const allIds = buildAllWebArtTileIds('art-1', [{ uniqueId: 'item-1' }, { uniqueId: 'item-2' }])
    assert.equal(allIds.size, 14)

    const mobileOpenAll = getOpenAllWebArtTileIds(allIds, true)
    assert.equal(mobileOpenAll.size, MOBILE_WEB_ART_OPEN_TILE_LIMIT)
    assert.equal(tileSetContainsAll(mobileOpenAll, mobileOpenAll), true)

    const desktopOpenAll = getOpenAllWebArtTileIds(allIds, false)
    assert.equal(desktopOpenAll.size, allIds.size)

    const slidingWindow = limitWebArtTileSetForMobile(
        ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        true
    )
    assert.deepEqual([...slidingWindow], ['b', 'c', 'd', 'e', 'f', 'g'])
})

test('webArtCopy resolves localized intro copy, carousel labels and fallback action labels', () => {
    for(const lang of ['en', 'de', 'hr', 'tr']) {
        const intro = getWebArtIntroCopy(lang)
        const carousel = getWebArtCarouselLabels(lang)
        const actions = resolveWebArtActionLabels({ getString: (key) => `locale:${key}` }, lang)
        assert.ok(intro.button.length > 0)
        assert.equal(intro.guide.lines.length, 3)
        assert.ok(carousel.gallery.length > 0)
        assert.ok(actions.submitTileLabel.length > 0)
        assert.ok(actions.clickTileLabel.length > 0)
    }
})
