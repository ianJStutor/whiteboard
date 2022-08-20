//DOM elements
const [drawingCanvas, uiCanvas] = document.querySelectorAll("canvas");
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const [color, penSize, eraserSize] = document.querySelectorAll("fieldset > input");

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

//color changing
document.querySelectorAll("[id|='color']").forEach(b => {
    b.addEventListener("click", () => color.value=b.dataset.color);
});

//keyboard shortcuts
window.addEventListener("keyup", handleKeyup);

function handleKeyup({ key }) {
    const k = key.toLowerCase();
    if (k === "x") { //swap tools
        return document.querySelector("[type='radio']:not(:checked)").click();
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
}
