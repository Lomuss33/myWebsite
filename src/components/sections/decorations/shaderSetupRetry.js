// Retry the original renderer after transient browser/GPU initialization failure.
// A failed getContext emits no restoration event, so event handlers alone cannot recover it.
export function createShaderSetupRetry(trySetup) {
    const delays = [600, 1600, 4000]
    let timer = null
    let attempt = 0
    let disposed = false

    const cancel = () => {
        if(timer !== null)
            window.clearTimeout(timer)
        timer = null
    }
    const run = () => {
        timer = null
        if(disposed || document.hidden || trySetup())
            return
        attempt++
        if(attempt < delays.length)
            timer = window.setTimeout(run, delays[attempt])
    }
    return {
        start() {
            if(disposed || document.hidden || timer !== null)
                return
            attempt = 0
            timer = window.setTimeout(run, delays[0])
        },
        cancel,
        dispose() {
            disposed = true
            cancel()
        }
    }
}
