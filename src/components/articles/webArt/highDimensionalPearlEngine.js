const VERTEX_SOURCE = `#version 300 es
in vec4 position;
void main() {
    gl_Position = position;
}`

const FRAGMENT_SOURCE = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform float zoom;
uniform vec2 resolution;
uniform vec2 move;
uniform int pointerCount;
#define P pointerCount
#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define MN min(R.x,R.y)
#define S smoothstep
#define SE(v,a) S(a+10./MN,a-10./MN,v)
#define rot(a) mat2(cos((a)-vec4(0,11,33,0)))
#define hue(a) (.5+.5*sin(3.14*(a)+vec3(1,2,3)))
float rnd(vec2 p) {
    p=fract(p*vec2(12.9898,78.233));
    p+=dot(p,p+34.56);
    return fract(p.x*p.y);
}
float noise(vec2 p) {
    vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f), k=vec2(1,0);
    float a=rnd(i), b=rnd(i+k), c=rnd(i+k.yx), d=rnd(i+1.);
    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
vec3 background(vec2 uv) {
    uv-=.2;
    float d=noise(uv+noise(uv*rot(.78)*4.-noise(uv*rot(.39)*133.)));
    vec3 deep=vec3(.015,.012,.026);
    vec3 fluid=hue(dot(sin(d*8.-T*.42)/7.2,d)-.9)*mix(.10,.22,rnd(uv));
    vec3 col=deep+fluid;
    vec2 vignetteUv=2.*FC/R-1.;
    vignetteUv*=.92;
    float v=dot(vignetteUv,vignetteUv);
    return mix(col,vec3(.02,.018,.034),S(.18,1.2,v));
}
void main() {
    vec2 uv=(FC-.5*R)/MN;
    float z=1.7+S(-10.,10.,zoom*10.);
    uv*=z*S(-2.,2.,pow(tanh(-cos(P>0?.0:T*.1)+z*length(uv)),5.));
    vec2 p=uv-z*move/MN;
    p.y-=P>0?.0:pow(sin(T*.125),7.);
    p*=rot(.78);
    p.x-=P>0?.0:pow(sin(T*.25),9.);
    p=mod(p*3.,.75)-.375;
    float d=pow(length(p),9.),
        a=clamp((1.-d*1e4)*8.,.0,1.),
        b=clamp((.95-d*95e2)*16.,.0,1.)-clamp(pow(.9-d*95e2,1.)*16.,.0,1.),
        c=clamp((1.5-d*105e2)*2.,.0,1.)-clamp(pow(1.-d*105e2,1.)*2.,.0,1.);
    vec3 col=vec3(0);
    if ((a+b)>.0) {
        vec2 lens=(uv+.01)*(1.-d*5e3);
        col+=background(lens);
        float g=.08+clamp(clamp(p.y,.0,.2)/2.,.0,1.)+clamp(clamp(-p.y,-.2,.2)*c/2.,.0,1.);
        vec3 light=clamp(col+a*g+b*.3,.0,1.);
        col=mix(background(uv),light,S(.0,1.,a+b));
    } else {
        col=background(uv);
    }
    col=mix(col,vec3(dot(col,vec3(.21,.71,.07))),S(.0,2.,clamp(length(uv),.0,1.)));
    uv=2.*FC/R-1.;
    uv*=.84;
    uv*=uv*uv*uv;
    float v=dot(uv,uv);
    col=mix(col,vec3(1),v);
    col=mix(vec3(0),col,min(time*.3,1.));
    O=vec4(col,1);
}`

const compileShader = (gl, type, source) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const message = gl.getShaderInfoLog(shader)
        gl.deleteShader(shader)
        throw new Error(message || "Shader compilation failed")
    }

    return shader
}

export function createHighDimensionalPearlEngine(canvas, options = {}) {
    const config = {
        maxPixelRatio: 1.25,
        reduceMotion: false,
        ...options
    }
    const gl = canvas.getContext("webgl2", {
        alpha: false,
        antialias: false,
        powerPreference: "high-performance"
    })

    if(!gl) throw new Error("WebGL2 unavailable")

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SOURCE)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SOURCE)
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "Shader link failed")
    }

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, "position")
    const uniforms = {
        time: gl.getUniformLocation(program, "time"),
        zoom: gl.getUniformLocation(program, "zoom"),
        resolution: gl.getUniformLocation(program, "resolution"),
        move: gl.getUniformLocation(program, "move"),
        pointerCount: gl.getUniformLocation(program, "pointerCount")
    }

    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    let width = 1
    let height = 1
    let animationFrame = 0
    let isRunning = false
    let destroyed = false
    let startTime = performance.now()
    let pointerInside = false
    let pointerDown = false
    let moveX = 0
    let moveY = 0
    let zoom = 0
    let lastX = 0
    let lastY = 0

    const renderFrame = (now = performance.now()) => {
        if(destroyed) return

        gl.viewport(0, 0, width, height)
        gl.useProgram(program)
        gl.uniform2f(uniforms.resolution, width, height)
        gl.uniform1f(uniforms.time, (now - startTime) * 0.001)
        gl.uniform1f(uniforms.zoom, zoom)
        gl.uniform2f(uniforms.move, moveX, moveY)
        gl.uniform1i(uniforms.pointerCount, pointerDown || pointerInside ? 1 : 0)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const loop = (now) => {
        if(!isRunning || destroyed) return
        renderFrame(now)
        animationFrame = window.requestAnimationFrame(loop)
    }

    const updatePointer = (event) => {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        if(pointerDown) {
            moveX += (x - lastX) * 0.5
            moveY += (lastY - y) * 0.5
        }

        lastX = x
        lastY = y
    }

    const onPointerEnter = (event) => {
        pointerInside = true
        updatePointer(event)
    }
    const onPointerMove = (event) => {
        pointerInside = true
        updatePointer(event)
    }
    const onPointerLeave = () => {
        pointerInside = false
        pointerDown = false
    }
    const onPointerDown = (event) => {
        pointerDown = true
        updatePointer(event)
    }
    const onPointerUp = () => {
        pointerDown = false
    }
    const onWheel = (event) => {
        zoom = Math.max(-1, Math.min(1, zoom + event.deltaY * 0.0015))
    }

    canvas.addEventListener("pointerenter", onPointerEnter, {passive: true})
    canvas.addEventListener("pointermove", onPointerMove, {passive: true})
    canvas.addEventListener("pointerleave", onPointerLeave, {passive: true})
    canvas.addEventListener("pointerdown", onPointerDown)
    canvas.addEventListener("pointerup", onPointerUp)
    canvas.addEventListener("pointercancel", onPointerUp)
    canvas.addEventListener("wheel", onWheel, {passive: true})

    return {
        start() {
            if(destroyed || isRunning) return

            if(config.reduceMotion) {
                renderFrame()
                return
            }

            isRunning = true
            animationFrame = window.requestAnimationFrame(loop)
        },

        stop() {
            if(destroyed || !isRunning) return
            isRunning = false
            if(animationFrame) window.cancelAnimationFrame(animationFrame)
            animationFrame = 0
        },

        reset() {
            if(destroyed) return
            moveX = 0
            moveY = 0
            zoom = 0
            startTime = performance.now()
            renderFrame()
        },

        destroy() {
            if(destroyed) return
            this.stop()
            destroyed = true
            canvas.removeEventListener("pointerenter", onPointerEnter)
            canvas.removeEventListener("pointermove", onPointerMove)
            canvas.removeEventListener("pointerleave", onPointerLeave)
            canvas.removeEventListener("pointerdown", onPointerDown)
            canvas.removeEventListener("pointerup", onPointerUp)
            canvas.removeEventListener("pointercancel", onPointerUp)
            canvas.removeEventListener("wheel", onWheel)
            gl.deleteBuffer(buffer)
            gl.deleteProgram(program)
            gl.deleteShader(vertexShader)
            gl.deleteShader(fragmentShader)
        },

        setSize(nextWidth, nextHeight, pixelRatio = 1) {
            if(destroyed) return
            const ratio = Math.min(config.maxPixelRatio, Math.max(1, pixelRatio || 1))
            width = Math.max(1, Math.round(nextWidth * ratio))
            height = Math.max(1, Math.round(nextHeight * ratio))
            canvas.width = width
            canvas.height = height
            canvas.style.width = "100%"
            canvas.style.height = "100%"
            renderFrame()
        },

        setInteractionEnabled(enabled) {
            if(destroyed) return
            canvas.style.pointerEvents = enabled ? "auto" : "none"
        }
    }
}
