import test from 'node:test'
import assert from 'node:assert/strict'
import {resolveLayout} from '../src/config/responsiveLayout.js'

test('portrait displays and small landscape windows use mobile composition', () => {
    for(const [w,h] of [[240,320],[320,568],[568,320],[768,1024],[1080,1920],[1920,3840],[959,768],[1200,479]])
        assert.equal(resolveLayout(w,h), 'mobile', `${w}x${h}`)
})
test('normal windows do not become ultrawide just by exceeding 1680px', () => {
    for(const [w,h] of [[960,768],[1024,1024],[1366,768],[1679,1050],[1680,1050],[1920,1080],[3840,2160]])
        assert.equal(resolveLayout(w,h), 'normal', `${w}x${h}`)
})
test('ultrawide requires both space and proportion', () => {
    assert.equal(resolveLayout(1440, 600), 'ultrawide')
    assert.equal(resolveLayout(1439, 600), 'normal')
    assert.equal(resolveLayout(2100, 1000), 'ultrawide')
    assert.equal(resolveLayout(2099.5, 1000), 'normal')
    assert.equal(resolveLayout(5120, 1440), 'ultrawide')
})
test('larger preferred text increases the space required for desktop', () => {
    assert.equal(resolveLayout(1366,768,24), 'mobile')
    assert.equal(resolveLayout(1920,1080,24), 'normal')
})
