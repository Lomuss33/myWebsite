import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'

const source = readFileSync('src/hooks/startupGuide.js', 'utf8')
    .replace(/^import .*\r?\n/gm, '').replace(/^export /gm, '')

function harness() {
    let now = 0, nextId = 0, shows = 0
    const timers = new Map(), listeners = new Map(), frames = new Map(), observers = []
    const addListener = (type, callback, options) => {
        if(!listeners.has(type)) listeners.set(type, [])
        listeners.get(type).push({callback, options})
    }
    const removeListener = (type, callback) => {
        listeners.set(type, (listeners.get(type) || []).filter(listener => listener.callback !== callback))
    }
    class Observer {
        constructor(callback) { this.callback = callback; observers.push(this) }
        observe(target, options) { this.target = target; this.options = options }
        disconnect() { this.disconnected = true }
    }
    const context = vm.createContext({
        AbortController,
        MutationObserver: Observer,
        getComputedStyle: element => ({display: element.hidden ? 'none' : 'block', visibility: 'visible'}),
        requestAnimationFrame(callback) { const id = ++nextId; frames.set(id, callback); return id },
        cancelAnimationFrame: id => frames.delete(id),
        performance: {now: () => now},
        window: {
            innerWidth: 1366, innerHeight: 768,
            setTimeout(callback, delay) {
                const id = ++nextId
                timers.set(id, {callback, at: now + delay})
                return id
            },
            clearTimeout: id => timers.delete(id),
            addEventListener: addListener,
            removeEventListener: removeListener,
            matchMedia: () => ({matches: true}),
        },
        document: {
            hidden: false, activeElement: null, body: {}, documentElement: { dataset: { layout: "normal" } },
            addEventListener: (type, callback, options) => addListener('document:' + type, callback, options),
            removeEventListener: (type, callback) => removeListener('document:' + type, callback),
            querySelector: () => null, querySelectorAll: () => [],
        },
        recordShow: () => shows++,
    })
    vm.runInContext(source + `
        showGuide = async state => { state.isVisible = true; recordShow() }
        globalThis.api = {createController, registerGlobalListeners, scheduleInitialShow,
            resolveDesktopClearEdge, applyGuideLighting, applyLabelPosition, applyNavigationCueGeometry,
            canShowGuide, scheduleGeometryUpdate, observeDomChanges, syncHomeState, syncTargetObservers,
            beginGuideRun, waitForDuration, waitForNextFrame, destroyController, completeGuideShow,
            recordGuideAppearance, scheduleInactivityReplay}
    `, context)
    const state = context.api.createController()
    state.isHomeActive = true
    state.hasAttemptedInitialShow = true
    context.api.registerGlobalListeners(state)
    return {
        state, api: context.api, listeners, context, observers, timers, frames,
        shows: () => shows,
        fire(type, event = {}) {
            for(const listener of listeners.get(type) || []) listener.callback(event)
        },
        frame() {
            for(const [id, callback] of [...frames]) {
                frames.delete(id)
                callback(now)
            }
        },
        async to(target) {
            for(;;) {
                const next = [...timers.entries()].filter(([, timer]) => timer.at <= target)
                    .sort((a, b) => a[1].at - b[1].at)[0]
                if(!next) break
                now = next[1].at
                timers.delete(next[0])
                next[1].callback()
                for(let i = 0; i < 5; i++) await Promise.resolve()
            }
            now = target
        },
    }
}

function check(name, run) {
    return test(name, () => run(harness()))
}

await check('continuous movement blocks replay; five quiet seconds restores it', async h => {
    h.fire('wheel')
    for(let time = 800; time <= 12000; time += 800) {
        await h.to(time)
        h.fire('pointermove', {pointerType: 'mouse', clientX: time / 100, clientY: 20})
        h.fire('mousemove', {clientX: time / 100, clientY: 20})
        assert.equal(h.shows(), 0)
    }
    await h.to(16999)
    assert.equal(h.shows(), 0)
    await h.to(17000)
    assert.equal(h.shows(), 1)
})

await check('early movement preserves the ten-second click pause', async h => {
    h.fire('click')
    await h.to(1000)
    h.fire('mousemove', {clientX: 20, clientY: 20})
    await h.to(9999)
    assert.equal(h.shows(), 0)
    await h.to(10000)
    assert.equal(h.shows(), 1)
})

await check('late movement extends the click pause by five quiet seconds', async h => {
    h.fire('click')
    await h.to(9000)
    h.fire('mousemove', {clientX: 20, clientY: 20})
    await h.to(13999)
    assert.equal(h.shows(), 0)
    await h.to(14000)
    assert.equal(h.shows(), 1)
})

await check('duplicate coordinates do not extend inactivity', async h => {
    h.fire('mousemove', {clientX: 20, clientY: 20})
    await h.to(4000)
    h.fire('pointermove', {pointerType: 'mouse', clientX: 20, clientY: 20})
    h.fire('mousemove', {clientX: 20, clientY: 20})
    await h.to(5000)
    assert.equal(h.shows(), 1)
})

await check('touch swipe retains its five-second delay', async h => {
    h.fire('touchstart')
    await h.to(200)
    h.fire('touchmove')
    await h.to(5199)
    assert.equal(h.shows(), 0)
    await h.to(5200)
    assert.equal(h.shows(), 1)
})

await check('movement dismissal, capture and pen activity are retained', async h => {
    h.state.isVisible = true
    h.fire('pointermove', {pointerType: 'pen', clientX: 20, clientY: 20})
    assert.equal(h.state.isVisible, false)
    assert.equal(h.listeners.get('mousemove')[0].options.capture, true)
    assert.equal(h.listeners.get('pointermove')[0].options.capture, true)
    await h.to(5000)
    assert.equal(h.shows(), 1)
})

await check('initial movement threshold still skips the initial prompt', async h => {
    h.state.hasAttemptedInitialShow = false
    h.api.scheduleInitialShow(h.state)
    h.fire('mousemove', {clientX: 0, clientY: 0})
    await h.to(100)
    h.fire('mousemove', {clientX: 29, clientY: 0})
    await h.to(1100)
    assert.equal(h.state.hasAttemptedInitialShow, true)
    assert.equal(h.shows(), 0)
    await h.to(5100)
    assert.equal(h.shows(), 1)
})

await check('other pages and paused apps do not schedule reminders', async h => {
    h.state.isHomeActive = false
    h.fire('mousemove', {clientX: 20, clientY: 20})
    h.fire('click')
    await h.to(20000)
    assert.equal(h.shows(), 0)
    h.state.isHomeActive = true
    h.state.isPaused = true
    h.fire('mousemove', {clientX: 30, clientY: 20})
    await h.to(40000)
    assert.equal(h.shows(), 0)
})

function layoutHarness(h, headingHeight = 56, heights = [48, 45, 88], mobile = false) {
    const values = new Map()
    h.state.root = {style: {setProperty: (key, value) => values.set(key, value)}}
    h.state.heading = {hidden: false}
    h.state.label = {getBoundingClientRect: () => {
        const width = h.state.heading.hidden ? 0 : Math.min(416, parseFloat(values.get('--startup-guide-label-max-width')))
        const height = h.state.heading.hidden ? 0 : headingHeight
        const x = parseFloat(values.get('--startup-guide-label-x')) || 0
        const y = parseFloat(values.get('--startup-guide-label-y')) || 0
        return {left: x - (mobile ? width / 2 : width), top: y - height / 2,
            right: x + (mobile ? width / 2 : 0), bottom: y + height / 2, width, height}
    }}
    for(const [index, key] of ['topCaption', 'middleCaption', 'bottomCaption'].entries()) {
        h.state[key] = {hidden: false, style: {}, getBoundingClientRect: () => ({
            width: Math.min(400, parseFloat(values.get('--startup-guide-caption-max-width'))), height: heights[index],
        })}
    }
    return values
}

await check('desktop headline is right aligned with a bounded inset above the page hint', async h => {
    for(const [width, railWidth] of [[480, 96], [640, 160], [1366, 240], [3440, 384]]) {
        const values = layoutHarness(h)
        const targets = {layoutMode: 'desktop',
            viewport: {left: 0, top: 0, width, height: 400, right: width, bottom: 400},
            railRect: {right: railWidth}, lowerRailRect: {right: railWidth},
            resumeRect: {top: 20, bottom: 60}, pagesRect: {top: 90, bottom: 310}, toolsRect: {top: 310, bottom: 390},
        }
        h.api.applyGuideLighting(h.state, targets)
        h.api.applyLabelPosition(h.state, targets, {x: 50, y: 200, radius: 80})
        const x = parseFloat(values.get('--startup-guide-label-x'))
        const clearEdge = parseFloat(values.get('--startup-guide-rail-right'))
        assert.equal(clearEdge, railWidth + 16)
        assert.equal(values.get('--startup-guide-rail-fade'), '40px')
        assert.equal(x, width - Math.max(24, Math.min(96, width * .04)))
        assert.ok(parseFloat(values.get('--startup-guide-label-y')) < targets.viewport.height / 2)
        assert.ok(h.state.label.getBoundingClientRect().bottom <= parseFloat(h.state.middleCaption.style.top) - 9.99)
        for(const key of ['topCaption', 'middleCaption', 'bottomCaption']) {
            const caption = h.state[key]
            assert.ok(parseFloat(caption.style.left) >= clearEdge + 40)
            assert.ok(parseFloat(caption.style.left) + caption.getBoundingClientRect().width <= width - Math.min(20, width * 0.04))
            assert.ok(parseFloat(caption.style.top) >= 0)
            assert.ok(parseFloat(caption.style.top) + caption.getBoundingClientRect().height <= targets.viewport.bottom)
        }
    }
})

await check('navigation sweeps match the complete measured controls across screen sizes', async h => {
    const rect = (left, top, width, height) => ({left, top, width, height, right: left + width, bottom: top + height})
    const sizes = [[280, 653], [390, 844], [768, 1024], [1440, 2560], [2560, 4320],
        [480, 320], [640, 360], [1366, 768], [3440, 1440], [3840, 2160]]
    for(const [width, height] of sizes) {
        const mobile = width < height
        const targets = {layoutMode: mobile ? 'mobile' : 'desktop', viewport: rect(0, 0, width, height)}
        if(mobile) {
            targets.topRect = rect(0, 0, width, Math.min(320, height * 0.24))
            targets.bottomRect = rect(0, height - 64, width, 64)
        } else {
            targets.railRect = rect(0, 0, Math.min(384, width * 0.24), height)
            targets.lowerRailRect = rect(0, height - 64, targets.railRect.width, 64)
        }
        h.state.navigationCues = Object.fromEntries(['left', 'top', 'bottom'].map(edge => [edge, {
            hidden: false, style: {setProperty(key, value) {this[key] = value}},
        }]))
        h.api.applyNavigationCueGeometry(h.state, targets)
        for(const [edge, cue] of Object.entries(h.state.navigationCues)) {
            const target = mobile ? targets[edge + 'Rect'] : edge === 'left' ? targets.railRect : null
            assert.equal(cue.hidden, !target)
            if(!target) continue
            assert.equal(parseFloat(cue.style.width), Math.round(target.width * 100) / 100)
            assert.equal(parseFloat(cue.style.height), Math.round(target.height * 100) / 100)
            assert.equal(parseFloat(cue.style.left), target.left)
            assert.equal(parseFloat(cue.style.top), target.top)
            const length = mobile ? target.width : target.height
            const span = parseFloat(cue.style['--startup-guide-cue-span'])
            assert.ok(span > 0 && span <= length)
            const duration = parseFloat(cue.style['--startup-guide-cue-duration'])
            assert.ok(duration >= (mobile ? 7.2 : 6.4) && duration <= (mobile ? 11.2 : 10))
        }
    }
    const target = rect(20, 600, 390, 64)
    h.api.applyNavigationCueGeometry(h.state, {layoutMode: 'mobile', viewport: rect(20, 30, 390, 844), bottomRect: target})
    assert.equal(h.state.navigationCues.top.hidden, true)
    assert.equal(h.state.navigationCues.bottom.style.left, '20px')
    assert.equal(h.state.navigationCues.bottom.style.top, '600px')
})

await check('tight desktop layout keeps actionable hints and restores the headline when room returns', async h => {
    layoutHarness(h, 56, [48, 50, 110])
    const targets = {layoutMode: 'desktop', viewport: {left: 0, top: 0, right: 480, bottom: 300, width: 480, height: 300},
        railRect: {right: 192}, lowerRailRect: {right: 192},
        resumeRect: {top: 20, bottom: 70}, pagesRect: {top: 70, bottom: 200}, toolsRect: {top: 200, bottom: 300}}
    h.api.applyLabelPosition(h.state, targets, {x: 50, y: 200, radius: 80})
    assert.equal(h.state.heading.hidden, true)
    assert.equal(h.state.topCaption.hidden, false)
    assert.equal(h.state.middleCaption.hidden, false)
    assert.equal(h.state.bottomCaption.hidden, false)
    targets.viewport.height = targets.viewport.bottom = 600
    targets.pagesRect.bottom = 500
    targets.toolsRect = {top: 500, bottom: 600}
    h.api.applyLabelPosition(h.state, targets, {x: 50, y: 200, radius: 80})
    assert.equal(h.state.heading.hidden, false)
})

await check('mobile hints use available width and recover from a short content gap without overlap', async h => {
    const values = layoutHarness(h, 56, [144, 0, 88], true)
    const targets = {layoutMode: 'mobile', viewport: {left: 0, top: 0, right: 280, bottom: 653, width: 280, height: 653},
        topRect: {top: 0, bottom: 170}, bottomRect: {top: 589, bottom: 653}}
    const apply = () => h.api.applyLabelPosition(h.state, targets, {x: 140, y: 400, radius: 80})
    apply()
    assert.equal(parseFloat(values.get('--startup-guide-caption-max-width')), 280 * .92)
    assert.equal(h.state.middleCaption.hidden, true)
    assert.equal(h.state.topCaption.hidden, false)
    assert.equal(h.state.bottomCaption.hidden, false)
    const labelTop = parseFloat(values.get('--startup-guide-label-y'))
    assert.ok(parseFloat(h.state.topCaption.style.top) + 144 < labelTop)
    assert.ok(labelTop + 56 < parseFloat(h.state.bottomCaption.style.top))
    targets.topRect.bottom = 410
    apply()
    assert.equal(h.state.topCaption.hidden, true)
    assert.equal(h.state.bottomCaption.hidden, false)
    targets.topRect.bottom = 489
    apply()
    assert.equal(h.state.topCaption.hidden, true)
    assert.equal(h.state.bottomCaption.hidden, true)
    targets.topRect.bottom = 170
    apply()
    assert.equal(h.state.topCaption.hidden, false)
    assert.equal(h.state.bottomCaption.hidden, false)
})

await check('editable descendants and plaintext editors suppress reminders', h => {
    h.context.document.activeElement = {isContentEditable: true, matches: () => false}
    assert.equal(h.api.canShowGuide(h.state), false)
})

await check('each appearance adds five seconds, without counting geometry updates', async h => {
    h.api.completeGuideShow(h.state)
    h.api.completeGuideShow(h.state)
    assert.equal(h.state.showCount, 1)
    h.fire('wheel')
    await h.to(9999)
    assert.equal(h.shows(), 0)
    await h.to(10000)
    assert.equal(h.shows(), 1)
    // A new overlay gets a new recording latch; reflow of that overlay does not.
    h.state.currentShowRecorded = false
    h.api.completeGuideShow(h.state)
    h.api.completeGuideShow(h.state)
    assert.equal(h.state.showCount, 2)
    h.fire('click')
    await h.to(29999)
    assert.equal(h.shows(), 1)
    await h.to(30000)
    assert.equal(h.shows(), 2)
})

await check('four appearances exhaust the page budget without expiring the fourth guide', async h => {
    let time = 0
    for(let appearance = 1; appearance <= 4; appearance++) {
        h.state.currentShowRecorded = false
        h.api.recordGuideAppearance(h.state)
        h.api.completeGuideShow(h.state)
        h.api.completeGuideShow(h.state)
        assert.equal(h.state.showCount, appearance)
        if(appearance < 4) {
            h.fire('wheel')
            time += 5000 + appearance * 5000
            await h.to(time - 1)
            assert.equal(h.shows(), appearance - 1)
            await h.to(time)
            assert.equal(h.shows(), appearance)
        }
    }
    await h.to(time + 3600000)
    assert.equal(h.state.isVisible, true)
    h.fire('click')
    assert.equal(h.state.isVisible, false)
    assert.equal(h.timers.size, 0)
    h.api.scheduleInactivityReplay(h.state, {restart: true})
    h.state.hasAttemptedInitialShow = false
    h.api.scheduleInitialShow(h.state)
    assert.equal(h.timers.size, 0)
    await h.to(time + 7200000)
    assert.equal(h.shows(), 3)
})

await check('the cap survives leaving Home and controller recreation; a new page resets it', async h => {
    for(let appearance = 0; appearance < 4; appearance++) {
        h.state.currentShowRecorded = false
        h.api.recordGuideAppearance(h.state)
    }
    h.api.syncHomeState(h.state)
    assert.equal(h.state.isHomeActive, false)
    vm.runInContext('resolveGuideTargets = () => ({elements: []})', h.context)
    h.context.document.querySelector = selector => selector.startsWith('section#section-about') ? {} : null
    h.api.syncHomeState(h.state)
    assert.equal(h.state.isHomeActive, true)
    assert.equal(h.api.canShowGuide(h.state), false)
    assert.equal(h.timers.size, 0)
    h.api.destroyController(h.state)
    const recreated = h.api.createController()
    recreated.isHomeActive = true
    assert.equal(recreated.showCount, 4)
    assert.equal(h.api.canShowGuide(recreated), false)
    h.api.scheduleInactivityReplay(recreated)
    assert.equal(h.timers.size, 0)
    const refreshed = harness()
    assert.equal(refreshed.state.showCount, 0)
    assert.equal(refreshed.api.canShowGuide(refreshed.state), true)
    refreshed.state.hasAttemptedInitialShow = false
    refreshed.api.scheduleInitialShow(refreshed.state)
    await refreshed.to(1099)
    assert.equal(refreshed.shows(), 0)
    await refreshed.to(1100)
    assert.equal(refreshed.shows(), 1)
})

await check('dismissal during entrance still consumes one appearance', h => {
    for(let appearance = 1; appearance <= 4; appearance++) {
        h.state.currentShowRecorded = false
        h.state.isAnimating = true
        h.api.recordGuideAppearance(h.state)
        h.fire('click')
        assert.equal(h.state.showCount, appearance)
        assert.equal(h.state.isVisible, false)
    }
    assert.equal(h.api.canShowGuide(h.state), false)
    assert.equal(h.timers.size, 0)
})

await check('continuous movement extends the progressive pause without shortening a click', async h => {
    h.api.completeGuideShow(h.state)
    h.fire('click')
    await h.to(1000)
    h.fire('mousemove', {clientX: 20, clientY: 20})
    await h.to(14999)
    assert.equal(h.shows(), 0)
    h.fire('mousemove', {clientX: 21, clientY: 20})
    await h.to(24998)
    assert.equal(h.shows(), 0)
    await h.to(24999)
    assert.equal(h.shows(), 1)
})

function dialogNode({hidden = false} = {}) {
    return {
        nodeType: 1, hidden,
        matches: selector => selector.includes('dialog') || selector.includes('.modal'),
        closest: () => null,
        querySelector: () => null,
        getAttribute: name => name === 'aria-hidden' && hidden ? 'true' : null,
        getBoundingClientRect: () => ({left: 100, top: 100, right: 600, bottom: 500, width: 500, height: 400}),
    }
}

await check('a programmatically opened dialog dismisses an already visible guide', h => {
    h.state.root = {toggleAttribute() {}}
    h.state.isVisible = true
    const dialog = dialogNode()
    h.context.document.querySelector = selector => selector.startsWith('section#section-about') ? {} :
        selector.includes('aria-modal') ? dialog : null
    h.context.document.querySelectorAll = () => [dialog]
    h.api.scheduleGeometryUpdate(h.state)
    h.frame()
    assert.equal(h.state.root, null)
    assert.equal(h.state.isVisible, false)
})

await check('hidden dialogs do not indefinitely suppress the guide', h => {
    const dialog = dialogNode({hidden: true})
    h.context.document.querySelector = selector => selector.includes('aria-modal') ? dialog : null
    h.context.document.querySelectorAll = () => [dialog]
    assert.equal(h.api.canShowGuide(h.state), true)
})

await check('dialog portals outside the React root trigger reconciliation', h => {
    const reactRoot = {}
    h.context.document.querySelector = selector => selector === '#root' ? reactRoot : null
    h.api.observeDomChanges(h.state)
    const observer = h.observers[0]
    assert.equal(observer.target, h.context.document.body)
    observer.callback([{type: 'childList', target: h.context.document.body,
        addedNodes: [dialogNode()], removedNodes: []}])
    assert.equal(h.frames.size, 1)
})

await check('leaving Home releases navigation size observations', h => {
    const target = {}, observed = new Set([target])
    h.state.targets = {elements: [target]}
    h.state.observedTargets = [target]
    h.state.resizeObserver = {observe: item => observed.add(item), unobserve: item => observed.delete(item)}
    h.api.syncHomeState(h.state)
    assert.equal(h.state.targets, null)
    assert.equal(observed.size, 0)
})

await check('a short mobile gap keeps navigation before the generic headline', h => {
    layoutHarness(h, 56, [144, 0, 88], true)
    const targets = {layoutMode: 'mobile', viewport: {left: 0, top: 0, right: 280, bottom: 653, width: 280, height: 653},
        topRect: {top: 0, bottom: 459}, bottomRect: {top: 589, bottom: 653}}
    h.api.applyLabelPosition(h.state, targets, {x: 140, y: 520, radius: 80})
    assert.equal(h.state.label.hidden, true)
    assert.equal(h.state.bottomCaption.hidden, false)
    const top = parseFloat(h.state.bottomCaption.style.top)
    assert.ok(top >= targets.topRect.bottom)
    assert.ok(top + 88 <= targets.bottomRect.top)
})

await check('destroying the controller cancels real animation waits and all tracked work', async h => {
    h.state.root = {toggleAttribute() {}}
    const run = h.api.beginGuideRun(h.state)
    const wait = h.api.waitForDuration(h.state, 160, run)
    const frame = h.api.waitForNextFrame(h.state, run)
    h.api.scheduleGeometryUpdate(h.state)
    h.fire('click')
    h.api.destroyController(h.state)
    assert.equal(await wait, false)
    assert.equal(await frame, false)
    assert.equal(h.timers.size, 0)
    assert.equal(h.frames.size, 0)
    assert.equal(h.state.root, null)
    assert.ok([...h.listeners.values()].every(list => list.length === 0))
    await h.to(20000)
    assert.equal(h.shows(), 0)
})
