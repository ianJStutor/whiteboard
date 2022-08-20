//settings
const uiColor = "rgba(255, 255, 0, 0.25)";

//DOM elements
const [drawingCanvas, uiCanvas] = document.querySelectorAll("canvas");
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const [color, penSize, eraserSize] = document.querySelectorAll("fieldset > input");
const [eraseButton, downloadButton] = document.querySelectorAll("nav > button");

//state
var drawing = false;
var prevPoint = null;

//canvases & resizing
const drawingCtx = drawingCanvas.getContext("2d");
const uiCtx = uiCanvas.getContext("2d");
setCanvasSize();
function setCanvasSize() {
    drawingCanvas.width = uiCanvas.width = window.innerWidth;
    drawingCanvas.height = uiCanvas.height = window.innerHeight - nav.clientHeight;
}
window.addEventListener("resize", setCanvasSize);

//cursor
document.querySelectorAll("[name='tool']").forEach(t => {
    t.addEventListener("change", () => uiCanvas.classList.toggle("eraser"));
});

//remove header
document.addEventListener("mousedown", removeHeader);
document.addEventListener("touchstart", removeHeader);
document.addEventListener("pointerdown", removeHeader);

function removeHeader() {
    header.classList.add("hide");
    document.removeEventListener("mousedown", removeHeader);
    document.removeEventListener("touchstart", removeHeader);
    document.removeEventListener("pointerdown", removeHeader);
}

//ui canvas
uiCanvas.addEventListener("mousemove", moveUiCursor);
uiCanvas.addEventListener("touchmove", moveUiCursor);
uiCanvas.addEventListener("pointermove", moveUiCursor);

function moveUiCursor(e) {
    if (!e) {
        if (!prevPoint) return;
        e = prevPoint;
    }
    const x = e.clientX ?? e.touches?.[0].clientX ?? e.x;
    const y = e.clientY ?? e.touches?.[0].clientY ?? e.y;
    const radius = uiCanvas.classList.contains("eraser") ? Number(eraserSize.value) : Number(penSize.value);
    const { width, height } = uiCanvas;
    uiCtx.clearRect(0, 0, width, height);
    uiCtx.fillStyle = uiColor;
    uiCtx.beginPath();
    uiCtx.arc(x, y, radius, 0, Math.PI*2);
    uiCtx.fill();
    if (drawing) draw(x, y);
    prevPoint = {x, y};
}

//nav buttons
eraseButton.addEventListener("click", () => {
    const { width, height } = drawingCanvas;
    drawingCtx.clearRect(0, 0, width, height);
});
downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = drawingCanvas.toDataURL();
    link.click();
});

//color changing
document.querySelectorAll("[id|='color']").forEach(b => {
    b.addEventListener("click", () => color.value=b.dataset.color);
});

//keyboard shortcuts
window.addEventListener("keyup", handleKeyup);

function handleKeyup({ key }) {
    const k = key.toLowerCase();
    if (k === "x") { //swap tools
        document.querySelector("[type='radio']:not(:checked)").click();
        return moveUiCursor();
    }
    if (["=", "+"].includes(k)) {
        const eraserActive = uiCanvas.classList.contains("eraser");
        if (eraserActive) return changeToolSize(eraserSize, 1);
        return changeToolSize(penSize, 1);
    }
    if (["-", "_"].includes(k)) {
        const eraserActive = uiCanvas.classList.contains("eraser");
        if (eraserActive) return changeToolSize(eraserSize, -1);
        return changeToolSize(penSize, -1);
    }
    const el = document.querySelector(`[data-key="${k}"]`);
    if (!el) return;
    el.click();
}

function changeToolSize(tool, deltaValue) {
    tool.value = Math.max(1, Number(tool.value) + deltaValue);
    moveUiCursor();
}
