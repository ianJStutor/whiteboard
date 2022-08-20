//DOM elements
const [drawingCanvas, uiCanvas] = document.querySelectorAll("canvas");
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const [color, penSize, eraserSize] = document.querySelectorAll("fieldset > input");

//canvases
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
    t.addEventListener("change", () => canvas.classList.toggle("eraser"));
});

//remove header
document.addEventListener("click", () => header.classList.add("hide"), {once: true});

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
    const el = document.querySelector(`[data-key="${k}"]`);
    if (!el) return;
    el.click();
}
