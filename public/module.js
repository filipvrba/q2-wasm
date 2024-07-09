var statusElement = document.getElementById("status")
, progressElement = document.getElementById("progress")
, spinnerElement = document.getElementById("spinner")
, canvasElement = document.getElementById("canvas")
, outputElement = document.getElementById("output")
, exportElement = document.getElementById("exportFile")
, Module = {
_canLockPointer: !0,
print: (outputElement.value = "",
function(e) {
    arguments.length > 1 && (e = Array.prototype.slice.call(arguments).join(" ")),
    console.log(e),
    outputElement.value += e + "\n",
    outputElement.scrollTop = outputElement.scrollHeight
}
),
canvas: (canvasElement.addEventListener("webglcontextlost", (e=>{
    alert("WebGL context lost. You will need to reload the page."),
    e.preventDefault()
}
), !1),
canvasElement),
setStatus: e=>{
    if (Module.setStatus.last || (Module.setStatus.last = {
        time: Date.now(),
        text: ""
    }),
    e !== Module.setStatus.last.text) {
        var t = e.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/)
            , n = Date.now();
        t && n - Module.setStatus.last.time < 30 || (Module.setStatus.last.time = n,
        Module.setStatus.last.text = e,
        t ? (e = t[1],
        progressElement.value = 100 * parseInt(t[2]),
        progressElement.max = 100 * parseInt(t[4]),
        progressElement.hidden = !1,
        spinnerElement.hidden = !1) : (progressElement.value = null,
        progressElement.max = null,
        progressElement.hidden = !0,
        e || (spinnerElement.hidden = !0)),
        statusElement.innerHTML = e)
    }
}
,
hideConsole: ()=>{
    outputElement.style.display = "none",
    canvasElement.style.display = "block",
    canvasElement.focus()
}
,
showConsole: ()=>{
    canvasElement.style.display = "none",
    outputElement.style.display = "block",
    outputElement.scrollTop = outputElement.scrollHeight,
    outputElement.focus()
}
,
exportFile: e=>{
    try {
        const t = e.split("/")
            , n = new Uint8Array(FS.readFile(e))
            , o = new Blob([n],{
            type: "application/octet-stream"
        })
            , l = URL.createObjectURL(o);
        exportElement.href = l,
        exportElement.download = t[t.length - 1],
        exportElement.click(),
        URL.revokeObjectURL(l)
    } catch (e) {
        console.error("Error exporting file:", e)
    }
}
,
winResized: ()=>{
    console.info("Detected window resize: " + canvasElement.width + "x" + canvasElement.height)
}
,
setGamma: e=>{
    e = Number(Number(e).toFixed(2)),
    console.info("Detected canvas gamma change: " + e),
    canvasElement.style.filter = e < 0 ? null : "brightness(" + 2 * e + ")"
}
,
captureMouse: ()=>{
    Module._canLockPointer && !Module._attemptPointerLock() && (Module._canLockPointer = !1,
    console.info("Delayed pointer lock requested."),
    document.addEventListener("keydown", Module._lockPointerOnKey))
}
,
_attemptPointerLock: ()=>(null === document.pointerLockElement && canvasElement.requestPointerLock(),
null !== document.pointerLockElement),
_lockPointerOnKey: e=>{
    ("Escape" === e.key || Module._attemptPointerLock()) && (document.removeEventListener("keydown", Module._lockPointerOnKey),
    console.info("Delayed pointer lock complete."),
    Module._canLockPointer = !0)
}
,
totalDependencies: 0,
monitorRunDependencies: e=>{
    this.totalDependencies = Math.max(this.totalDependencies, e),
    Module.setStatus(e ? "Preparing... (" + (this.totalDependencies - e) + "/" + this.totalDependencies + ")" : "All downloads complete.")
}
,
onRuntimeInitialized: ()=>{
    outputElement.style.display = "block"
}
};
Module.arguments = window.location.search.length > 1 ? window.location.search.substr(1).split("&") : [],
Module.setStatus("Downloading..."),
window.onerror = () => {
    Module.setStatus("Exception thrown, see JavaScript console"),
    spinnerElement.style.display = "none",
    Module.setStatus = e=>{
        e && console.error("[post-exception status] " + e)
    }
}
